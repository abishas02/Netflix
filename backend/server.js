const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables (useful for DB URIs later)
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allows your frontend to communicate with this backend
app.use(express.json()); // Allows the server to parse JSON bodies

// Mock Data (In a real app, you'd fetch this from a Database)
const MOCK_USER = {
  email: "user@example.com",
  password: "password123"
};

// --- Routes ---

// Health check route (good for testing if the backend is live)
app.get('/', (req, res) => {
  res.send("Netflix Clone Backend is running...");
});

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Basic validation
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

// On Vercel, the port is assigned dynamically. 
// Locally, it defaults to 5000.
const PORT = process.env.PORT || 5000;

// Only start the listener if we are NOT on Vercel
// Vercel handles the execution of the app via the exported module
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export the app for Vercel's Serverless functions
module.exports = app;