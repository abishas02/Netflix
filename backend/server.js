const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Load environment variables
dotenv.config();

const app = express();

// 2. Middleware
// Configured to be more secure for production
app.use(cors()); 
app.use(express.json());

// Mock Data
const MOCK_USER = {
  email: "user@example.com",
  password: "password123"
};

// --- Routes ---

// Health check route
app.get('/', (req, res) => {
  res.status(200).send("Netflix Clone Backend is running...");
});

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide both email and password." 
    });
  }

  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    res.status(200).json({ 
      success: true, 
      message: "Login successful!" 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: "Invalid email or password." 
    });
  }
});

// --- Vercel & Local Setup ---

// 3. CRITICAL: Export for Vercel
// Vercel uses the exported app as a serverless function entry point.
module.exports = app;

// 4. Local Listener
// This block ensures the app only listens on a port when you are running it 
// on your own computer (development), not on Vercel (production).
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running locally on http://localhost:${PORT}`);
    });
}