**API Reference**

Base path: `/api`

Auth routes: `/api/auth`

1) Register
- Method: POST
- Route: `/api/auth/register`
- Description: Create a new user account and set an HTTP-only JWT cookie.
- Authentication: none
- Request body (application/json):
  - `username` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- Successful response (201):
  ```json
  { "message": "User registered successfulyy", "user": { "id": "<id>", "username": "<username>", "email": "<email>" } }
  ```
- Error responses:
  - 400: missing fields or account already exists
  - 500: server misconfiguration (e.g. missing JWT_SECRET)

2) Login
- Method: POST
- Route: `/api/auth/login`
- Description: Authenticate and set an HTTP-only cookie. Supports `rememberMe` to prolong token expiry.
- Authentication: none
- Request body (application/json):
  - `email` (string, required)
  - `password` (string, required)
  - `rememberMe` (boolean, optional)
- Successful response (200):
  ```json
  { "message": "User loggedIn successfully", "user": { "id":"<id>", "username":"<username>", "email":"<email>" } }
  ```
- Error responses:
  - 400: missing fields or invalid credentials
  - 500: unexpected server error

3) Logout
- Method: GET
- Route: `/api/auth/logout`
- Description: Clears the cookie and blacklists the token so it cannot be reused.
- Authentication: cookie/Authorization header optional — the server will blacklist any token provided in `Cookie`.
- Request body: none
- Successful response (200):
  ```json
  { "message": "User logged out successfully" }
  ```
- Error responses: none specific — clears cookie even if none present

4) Forgot password
- Method: POST
- Route: `/api/auth/forgot-password`
- Description: Generate a password reset token (hashed and stored) and return the reset token for testing (production should email it instead).
- Authentication: none
- Request body (application/json):
  - `email` (string, required)
- Successful response (200):
  ```json
  { "message": "Password reset link sent to your email", "resetToken": "<token>", "expiresIn": "1 hour" }
  ```
- Error responses:
  - 400: missing email
  - 404: no account with that email
  - 500: server error

5) Reset password
- Method: POST
- Route: `/api/auth/reset-password`
- Description: Exchange a reset token for a new password.
- Authentication: none
- Request body (application/json):
  - `token` (string, required)
  - `password` (string, required, min 6 chars)
- Successful response (200):
  ```json
  { "message": "Password reset successful. You can now log in with your new password." }
  ```
- Error responses:
  - 400: missing fields, short password, or invalid/expired token
  - 500: server error

6) Get current user
- Method: GET
- Route: `/api/auth/get-me`
- Description: Return the signed-in user's basic information.
- Authentication: Required (JWT cookie or `Authorization: Bearer <token>`)
- Request body: none
- Successful response (200):
  ```json
  { "message": "User details fetched successfully", "user": { "id":"<id>", "name":"<username>", "email":"<email>" } }
  ```
- Error responses:
  - 401: missing/invalid/blacklisted token
  - 500: server error

Interview routes: `/api/interview` (all endpoints require authentication)

1) Generate interview report
- Method: POST
- Route: `/api/interview`
- Description: Upload a PDF resume and job description to generate a structured interview report. The server extracts text from the PDF and calls the AI service.
- Authentication: Required
- Content: multipart/form-data
- Fields:
  - `resume` (file, required) — PDF file
  - `jobDescription` (string, required)
  - `selfDescription` (string, optional)
  - `title` (string, optional) — client-specified title; otherwise AI-generated
- Successful response (201):
  ```json
  { "message":"Interview report generated successfully", "report": { /* full InterviewReport document */ } }
  ```
- Error responses:
  - 400: missing resume, missing jobDescription, invalid PDF, validation errors
  - 401: missing/invalid token
  - 503: AI service overloaded (retryable) — `AiServiceError` maps to upstream status
  - 500: server error

2) List interview reports
- Method: GET
- Route: `/api/interview`
- Description: Return a list of the signed-in user's interview reports. The large `resume` text is excluded.
- Authentication: Required
- Request body: none
- Successful response (200):
  ```json
  { "count": <number>, "reports": [ { /* report without resume */ } ] }
  ```
- Error responses:
  - 401: missing/invalid token
  - 500: server error

3) Get interview report
- Method: GET
- Route: `/api/interview/:id`
- Description: Return a single report (including stored resume text) — scoped to the signed-in user.
- Authentication: Required
- Parameters:
  - `id` (string, required) — report ObjectId
- Successful response (200):
  ```json
  { "report": { /* full report document including resume */ } }
  ```
- Error responses:
  - 400: invalid id
  - 401: missing/invalid token
  - 404: not found or not owned by user
  - 500: server error

4) Delete interview report
- Method: DELETE
- Route: `/api/interview/:id`
- Description: Delete a report owned by the signed-in user.
- Authentication: Required
- Successful response (200):
  ```json
  { "message": "Report deleted successfully", "id": "<deletedId>" }
  ```
- Error responses:
  - 400: invalid id
  - 401: missing/invalid token
  - 404: not found
  - 500: server error
