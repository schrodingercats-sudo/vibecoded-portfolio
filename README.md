# Personal Portfolio Website

A full-stack portfolio website built with **Node.js/Express** backend, **MongoDB** database, and a brutalist-inspired frontend design.

## Tech Stack

- **Frontend:** HTML5, CSS (Tailwind), JavaScript, GSAP
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Vercel

## Features

- Responsive brutalist UI with terminal-style boot animation
- Project showcase with bento grid layout (data from MongoDB)
- Skills section fetched from database
- Music player with real audio playback and swipe interactions
- AI chat assistant powered by Llama 3.1
- Contact form via EmailJS
- Anime favourites section with video backgrounds

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account

### Setup

```bash
# Install dependencies
npm install

# Copy environment template and fill in your keys
cp .env.example .env

# Seed the database
npm run seed

# Start the dev server
npm start
```

The app runs at `http://localhost:3000`.

### Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NVIDIA_API_KEY` | API key for chat feature |

## Project Structure

```
├── server.js          # Express backend
├── api/index.js       # Vercel serverless entry
├── lib/db.js          # MongoDB connection
├── scripts/seed.js    # Database seeder
├── public/            # Frontend assets
│   ├── index.html     # Main page
│   ├── *.mp3          # Audio tracks
│   ├── *.mp4          # Video assets
│   └── *.png, *.jpg   # Images
├── .env.example       # Environment template
├── vercel.json        # Deploy config
└── package.json
```

## Deployment

Deployed on Vercel with automatic GitHub integration. Environment variables are configured in the Vercel dashboard.
