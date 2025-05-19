# Campus Feedback Radar

A full-stack web application for collecting and analyzing feedback on campus events and activities. Built with React, TypeScript, and Node.js.

## 🚀 Tech Stack

### Frontend
- React 18+ with Vite
- TypeScript
- Tailwind CSS for styling
- Shadcn UI Components
- Chart.js for data visualization

### Backend
- Node.js with Express
- MongoDB for database
- TypeScript
- RESTful API architecture

## 📋 Prerequisites

### Common Requirements
- Git
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)

### For Frontend Development
- npm or yarn package manager
- Modern web browser

### For Backend Development
- MongoDB running locally or MongoDB Atlas account
- Node.js environment

## 🛠️ Getting Started

### Environment Variables

Both frontend and backend use environment variables for configuration. Create the following `.env` files:

#### Backend (.env)
Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-feedback
```

#### Frontend (.env)
Create `campus-feedback-radar-main/.env`:
```
VITE_API_URL=http://localhost:5000
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/campus-feedback-radar.git
cd campus-feedback-radar
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../campus-feedback-radar-main
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd ../campus-feedback-radar-main
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🏗️ Project Structure

```
campus-feedback-radar/
├── server/                 # Backend code
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Entry point
│   ├── .env
│   └── package.json
│
└── campus-feedback-radar-main/  # Frontend code
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/        # Page components
    │   ├── lib/          # Utility functions
    │   └── App.tsx       # Main app component
    ├── .env
    └── package.json
```

## 🔑 Key Features

- **Feedback Submission**: Easy-to-use form for submitting feedback on campus events
- **Sentiment Analysis**: Automatic analysis of feedback sentiment
- **Analytics Dashboard**: Visual representation of feedback data
- **Trend Analysis**: Track feedback trends over time
- **Category-wise Analysis**: Break down feedback by different categories

## 📊 Analytics Features

- **By Trend**: View feedback trends grouped by time periods
- **Trend**: View continuous feedback trends over time
- **Category Analysis**: Analyze feedback by different categories
- **Sentiment Analysis**: Track positive and negative feedback

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- ## Team Members

| Name           | Role                  | GitHub Profile |
|--------------|----------------------|---------------|
| Vikas Gupta    | Frontend & Backend Developer    | [Vikas Gupta](https://github.com/Mr-inception) |
| Shivam Maurya  | Database Administrator      | [Shivam Maurya](https://github.com/CharlieLee) |
| Sachin Yadav   | Project Administrator       | [Sachin Yadav](https://github.com/DanaWhite) |

### Contributions
- **Vikas Gupta** - Developed the React frontend and styled components.
- **Shivam Maurya** - Set the database in backend and API integrations.
- **Sachin Yadav** - Managed project timelines and coordinated tasks.


## 🙏 Acknowledgments

- GUVI for the project template
- All contributors who have helped shape this project 