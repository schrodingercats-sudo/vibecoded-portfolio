require('dotenv').config();
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

// API Routes

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'NVIDIA_API_KEY not configured.' });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required.' });
    }

    const apiResponse = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-8b-instruct',
        messages: messages,
        temperature: 0.5,
        top_p: 0.7,
        max_tokens: 512,
        stream: false
      })
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return res.status(apiResponse.status).json({ error: errorText });
    }

    const result = await apiResponse.json();
    const text = result.choices?.[0]?.message?.content || null;
    res.json({ text });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
