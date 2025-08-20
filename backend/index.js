const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // A modern replacement for body-parser

let feedbacks = [];
const users = [
  { id: 1, username: 'faculty1', role: 'faculty', password: 'pass' },
  { id: 2, username: 'admin1', role: 'admin', password: 'pass' },
];

// --- AI Sentiment Analysis Function ---
async function analyzeSentiment(text) {
  if (!text || text.length < 5) return 'neutral';
  try {
    const response = await axios.post('https://sentim-api.herokuapp.com/api/v1/', {
      text
    });
    const polarity = response.data.result.polarity;
    if (polarity > 0.1) return 'positive';
    if (polarity < -0.1) return 'negative';
    return 'neutral';
  } catch (error) {
    console.error('Error analyzing sentiment:', error.message);
    return 'neutral';
  }
}

// --- Auth Middleware ---
function authMiddleware(req, res, next) {
  const {
    username,
    password
  } = req.headers;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({
      error: 'Authentication failed. Please check username and password.'
    });
  }
  req.user = user;
  next();
}

// --- API Endpoints ---
app.get('/api/feedbacks', authMiddleware, (req, res) => {
  res.json(feedbacks.reverse()); // Show most recent first
});

app.post('/api/feedbacks', authMiddleware, async (req, res) => {
  const {
    course,
    message
  } = req.body;
  if (!course || !message) {
    return res.status(400).json({
      error: 'Course and message are required.'
    });
  }
  try {
    const sentiment = await analyzeSentiment(message);
    const newFb = {
      id: feedbacks.length + 1,
      course,
      message,
      sentiment,
      timestamp: new Date().toISOString(),
      user: req.user.username,
    };
    feedbacks.push(newFb);
    io.emit('new-feedback', newFb); // Emit to all connected clients
    res.status(201).json(newFb);
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      error: 'Failed to submit feedback. Please try again.'
    });
  }
});

app.get('/api/reports/summary', authMiddleware, (req, res) => {
  const total = feedbacks.length;
  const positive = feedbacks.filter((fb) => fb.sentiment === 'positive').length;
  const negative = feedbacks.filter((fb) => fb.sentiment === 'negative').length;
  const neutral = total - positive - negative;
  res.json({
    totalFeedback: total,
    sentimentCounts: {
      positive,
      negative,
      neutral
    },
    // Add breakdown by course for more depth
    courseBreakdown: feedbacks.reduce((acc, fb) => {
      acc[fb.course] = (acc[fb.course] || 0) + 1;
      return acc;
    }, {}),
  });
});

// --- Server Start ---
server.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));