require('dotenv/config');
const { MongoClient } = require('mongodb');

const projects = [
  {
    name: 'UPI Guard',
    slug: 'upi-guard',
    category: 'Security',
    description: 'Detects fake UPI links and SMS to prevent financial scams.',
    url: 'https://upi-checker.vercel.app/',
    command: 'npm run analyze',
    imageUrl: 'https://placehold.co/800x600/064e3b/fff?text=UPI+Guard+Interface',
    imageBg: 'bg-emerald-900',
    colSpan: 2,
    rowSpan: 2,
    displayOrder: 1
  },
  {
    name: 'CampsHub',
    slug: 'camps-hub',
    category: 'EduTech',
    description: 'Student project collaboration platform.',
    url: 'https://campushub-two.vercel.app/',
    command: 'npm start',
    imageUrl: 'https://placehold.co/400x800/1e3a8a/fff?text=Mobile+App',
    imageBg: 'bg-blue-900',
    colSpan: 1,
    rowSpan: 2,
    displayOrder: 2
  },
  {
    name: 'Promptizer',
    slug: 'promptizer',
    category: 'AI Tool',
    description: 'Optimizer for AI coding models.',
    url: 'https://promptimzer.vercel.app/',
    command: 'node optimize.js',
    imageUrl: 'https://placehold.co/400x400/7f1d1d/fff?text=AI+Prompt',
    imageBg: 'bg-red-900',
    colSpan: 1,
    rowSpan: 1,
    displayOrder: 3
  },
  {
    name: 'GitHub',
    slug: 'github',
    category: 'Link',
    description: 'Check out my code',
    url: 'https://github.com/schrodingercats-sudo',
    command: null,
    imageUrl: null,
    imageBg: null,
    colSpan: 1,
    rowSpan: 1,
    displayOrder: 4
  }
];

const skills = [
  { category: 'Frontend', items: 'React, Next.js, Tailwind', displayOrder: 1 },
  { category: 'Backend', items: 'Node.js, Python, Firebase', displayOrder: 2 },
  { category: 'AI & Tools', items: 'Prompt Engineering, Vercel', displayOrder: 3 }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI environment variable is not set.');
    console.error('Create a .env file based on .env.example and set your MongoDB Atlas connection string.');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas.');

    const db = client.db('portfolio');

    // Seed projects
    const projectsCol = db.collection('projects');
    await projectsCol.deleteMany({});
    const projectResult = await projectsCol.insertMany(projects);
    console.log(`Seeded ${projectResult.insertedCount} projects.`);

    // Seed skills
    const skillsCol = db.collection('skills');
    await skillsCol.deleteMany({});
    const skillResult = await skillsCol.insertMany(skills);
    console.log(`Seeded ${skillResult.insertedCount} skills.`);

    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
