import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-feedback')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.log('💡 Make sure MongoDB is running on your system');
  });

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Validation Schema
const feedbackValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  eventName: z.string().min(1, 'Event name is required'),
  eventType: z.string().min(1, 'Event type is required'),
  rating: z.number().min(1).max(5),
  comments: z.string().min(1, 'Comments are required')
});

// API Routes
app.post('/api/feedback', async (req, res) => {
  try {
    const validatedData = feedbackValidationSchema.parse(req.body);
    const feedback = new Feedback(validatedData);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const { timeRange } = req.query;
    let dateFilter = {};

    switch (timeRange) {
      case 'last7days':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
        break;
      case 'last30days':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
        break;
      case 'last90days':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } };
        break;
      case 'thisYear':
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        dateFilter = { createdAt: { $gte: startOfYear } };
        break;
    }

    const feedback = await Feedback.find(dateFilter).sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/feedback/stats', async (req, res) => {
  try {
    const { timeRange } = req.query;
    let dateFilter = {};

    switch (timeRange) {
      case 'last7days':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
        break;
      case 'last30days':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
        break;
      case 'last90days':
        dateFilter = { createdAt: { $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } };
        break;
      case 'thisYear':
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        dateFilter = { createdAt: { $gte: startOfYear } };
        break;
    }

    const total = await Feedback.countDocuments(dateFilter);
    const positive = await Feedback.countDocuments({ ...dateFilter, rating: { $gte: 4 } });
    const neutral = await Feedback.countDocuments({ ...dateFilter, rating: 3 });
    const negative = await Feedback.countDocuments({ ...dateFilter, rating: { $lte: 2 } });

    res.json({
      total,
      positive,
      neutral,
      negative,
      positivePercentage: Math.round((positive / total) * 100) || 0,
      neutralPercentage: Math.round((neutral / total) * 100) || 0,
      negativePercentage: Math.round((negative / total) * 100) || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export for Vercel
export default app; 