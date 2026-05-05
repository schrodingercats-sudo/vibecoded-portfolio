const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDatabase } = require('./lib/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// --- API Routes ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const projects = await db
      .collection('projects')
      .find({})
      .sort({ displayOrder: 1 })
      .toArray();
    res.json({ projects });
  } catch (err) {
    console.error('Projects error:', err.message);
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

// Get all skills
app.get('/api/skills', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const skills = await db
      .collection('skills')
      .find({})
      .sort({ displayOrder: 1 })
      .toArray();
    res.json({ skills });
  } catch (err) {
    console.error('Skills error:', err.message);
    res.status(500).json({ error: 'Failed to fetch skills.' });
  }
});

// Gemini AI chat proxy
app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured.' });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-preview-05-20';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return res.status(apiResponse.status).json({ error: errorText });
    }

    const result = await apiResponse.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || null;
    res.json({ text, raw: result });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Fallback: serve index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
