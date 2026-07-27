**Business Logic**

Major responsibilities

- Accept a PDF resume, extract its text, and combine it with a job description and optional self-description.
- Send a single prompt to Google GenAI (Gemini) via `src/services/ai.service.js` and request a structured JSON response validated by `zod`.
- Store the validated report as an `InterviewReport` document associated with the user.

AI integration
- `ai.service.js` builds a prompt and uses the `@google/genai` client.
- The service uses a `zod` schema to define the expected response shape and converts it into an OpenAPI-like schema for Gemini's `responseSchema` feature.
- The service implements retry/backoff for transient Gemini errors and throws `AiServiceError` for mapping controller responses (including `retryable` and `status`).

Validation & errors
- The AI response is parsed as JSON and validated against the `interViewSchema`. If validation fails an `AiServiceError` with status 502 is thrown.
- Controllers map `AiServiceError` status to HTTP responses so the client can decide whether to retry (e.g. 503) or surface an error.

Important implementation details
- Resume parsing in `interview.controller.js` uses `pdf-parse` and multer's memory storage. Large or corrupted PDFs return 400 responses.
- The `list` endpoint intentionally excludes `resume` to reduce payload size and leakage of raw resume content.
