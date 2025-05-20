const express = require('express');
const cors = require('cors');
const { z } = require('zod');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let feedbacks = [];

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
    const feedback = {
      ...validatedData,
      createdAt: new Date()
    };
    feedbacks.push(feedback);
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
    let filteredFeedbacks = [...feedbacks];
    
    if (timeRange === 'last30days') {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      filteredFeedbacks = feedbacks.filter(f => f.createdAt >= thirtyDaysAgo);
    }
    
    res.json(filteredFeedbacks.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

app.get('/api/feedback/stats', async (req, res) => {
  try {
    const { timeRange } = req.query;
    let filteredFeedbacks = [...feedbacks];
    
    if (timeRange === 'last30days') {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      filteredFeedbacks = feedbacks.filter(f => f.createdAt >= thirtyDaysAgo);
    }
    
    const total = filteredFeedbacks.length;
    const positive = filteredFeedbacks.filter(f => f.rating >= 4).length;
    const neutral = filteredFeedbacks.filter(f => f.rating === 3).length;
    const negative = filteredFeedbacks.filter(f => f.rating <= 2).length;
    
    res.json({
      total,
      positive,
      neutral,
      negative,
      positivePercentage: total ? Math.round((positive / total) * 100) : 0,
      neutralPercentage: total ? Math.round((neutral / total) * 100) : 0,
      negativePercentage: total ? Math.round((negative / total) * 100) : 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback stats' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 