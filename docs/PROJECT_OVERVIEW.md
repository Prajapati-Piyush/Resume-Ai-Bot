**Project Overview**

Purpose
- PrepPilot helps job-seekers prepare by producing interview questions, suggested answers, skill-gap analysis, and a day-by-day preparation plan derived from a resume and job description using an LLM (Gemini).

Key flows
- User signs up / signs in (cookie-based JWT session).
- User uploads a PDF resume (kept in browser memory) and pastes a job description.
- Frontend sends a single multipart request containing the resume file and job description to the backend.
- Backend extracts resume text (pdf-parse), calls the AI service for a structured response, validates the response with `zod`, and persists an `InterviewReport` document.

Who should read this
- New developers onboarding to implement features, fix bugs, or extend the AI schema.
- Security reviewers verifying data handling and credential management.

Where to start reading code
- Routing and app wiring (frontend): [frontend/src/app.route.jsx](frontend/src/app.route.jsx)
- API client (frontend): [frontend/src/api/client.js](frontend/src/api/client.js)
- Auth/state (frontend): [frontend/src/context/AuthContext.jsx](frontend/src/context/AuthContext.jsx)
- Server entry: [server/server.js](server/server.js)
- API wiring (server): [server/src/app.js](server/src/app.js)
- AI integration: [server/src/services/ai.service.js](server/src/services/ai.service.js)
- Interview controllers: [server/src/controllers/interview.controller.js](server/src/controllers/interview.controller.js)

Next steps for a contributor
1. Read `docs/backend/API_REFERENCE.md` to understand endpoints.
2. Run the app locally following [README.md](../README.md#running-locally).
3. Make small changes and verify end-to-end by generating a report with the sample resume in `server/src/services/test-report.js` (requires `GOOGLE_GENAI_API_KEY`).
