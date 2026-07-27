**Setup**

Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (URI ready)
- Google GenAI API key (Gemini) — optional for development (see testing)

Environment variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWTs
- `GOOGLE_GENAI_API_KEY` — API key for the Google GenAI client
- `NODE_ENV` — `production` enables secure cookies

Local run

```bash
cd genai-chatbot/server
npm install
# create a .env file with the variables above
npm run start
```

Testing the AI service locally
- The repository includes `src/services/test-report.js` which exercises the AI integration. Running it requires `GOOGLE_GENAI_API_KEY`.

Notes on secrets
- The repository `.env` in this workspace contains example values; do not commit real secrets. Use a secrets manager for production.
