# Server

This folder contains the backend for the GenAI interview-report prototype. It is a small Express.js + MongoDB service that:

- Accepts user registration, login, and password resets
- Stores user accounts and interview reports in MongoDB
- Accepts a PDF resume upload and calls a remote AI service to generate an interview report
- Protects routes with JWT authentication and supports logout via token blacklist

See the `docs/backend` folder for full architecture, API reference, database, authentication and setup details.

Key files:

- `src/app.js` — Express application, middleware and error handler
- `src/config/db.js` — MongoDB connection
- `src/routes` — API route definitions
- `src/controllers` — Request handlers
- `src/services/ai.service.js` — AI integration and validation
- `src/models` — Mongoose schemas
- `src/middleware` — Auth and file upload middleware

Run locally:

```bash
cd genai-chatbot/server
npm install
npm run start
```
