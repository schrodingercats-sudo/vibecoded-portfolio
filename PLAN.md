# Pratham's Full-Stack Portfolio Plan

## Summary
- Rebuild the current single-file portfolio into a React frontend with a Node.js/Express-style backend and PostgreSQL data storage.
- Preserve the existing visual identity, sections, projects, Gemini assistant, and contact experience from `index.html`.
- Create a new GitHub repo: `schrodingercats-sudo/prathams-portfolio`.
- Deploy to Vercel as project `prathams-portfolio`, linked to the GitHub repo.

## Key Changes
- Frontend:
  - Convert `index.html` into a Vite React app with structured components for hero, about, projects, skills, contact, mobile nav, terminal intro, and AI chat.
  - Replace CDN Tailwind usage with project-managed Tailwind config and build pipeline.
  - Fetch projects and skills from backend APIs instead of hardcoding them in the page.

- Backend/API:
  - Add an Express-style API under Vercel-compatible serverless routes.
  - Public endpoints:
    - `GET /api/health`
    - `GET /api/projects`
    - `GET /api/skills`
    - `POST /api/chat`
  - Migrate the existing Netlify Gemini function to `/api/chat`.
  - Remove the `netlify/` function after the Vercel route is working.

- Database:
  - Use Vercel/Neon PostgreSQL with `DATABASE_URL`.
  - Use Drizzle ORM for lightweight serverless-friendly access.
  - Add tables for `projects` and `skills`.
  - Seed existing content: UPI Guard, CampsHub, Promptizer, current skill categories, links, images, tags, and display order.

- GitHub/Vercel:
  - Switch GitHub CLI context to `schrodingercats-sudo` before repo creation.
  - Create `schrodingercats-sudo/prathams-portfolio` as a new public repo.
  - Move the existing `origin` remote to `old-origin`, add the new repo as `origin`, then push `main`.
  - Link the new GitHub repo to Vercel project `prathams-portfolio`.
  - Configure Vercel env vars: `DATABASE_URL`, `GEMINI_API_KEY`, and optional `GEMINI_MODEL`.

## Test Plan
- Run `npm install`, `npm run lint`, and `npm run build`.
- Run database migration and seed locally against the configured Postgres URL.
- Verify API routes locally:
  - `/api/projects` returns seeded project data.
  - `/api/skills` returns grouped skills.
  - `/api/chat` returns a clear setup error if `GEMINI_API_KEY` is missing.
- Run the app locally and verify the homepage, projects section, mobile menu, contact form, and AI chat UI.
- After Vercel deploy, verify production URL loads and API routes work.

## Assumptions
- Use React.js for the frontend, Node.js/Express-style routes for the backend, and PostgreSQL as requested.
- Keep the existing portfolio design and content unless it blocks the full-stack migration.
- Use Vercel/Neon Postgres as the database provider.
- Keep and migrate the Gemini AI assistant to Vercel.
- Use `prathams-portfolio` as the GitHub repo slug and Vercel project slug because apostrophes/spaces are not suitable project slugs.

## user response on this prd 
no the frontend is Frontend: HTML, CSS, JavaScript (or React.js) no other languages are allowed no vite or other language just use html css and js or react no other langugaes and the gemini api will be stored in the vercel backend ill store it manually no hardcode needed and yes remove netlify and maintain the ui/ux of the current html file i want the same ui/ux styling.