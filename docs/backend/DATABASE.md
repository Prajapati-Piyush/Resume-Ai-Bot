**Database**

This project uses MongoDB (via Mongoose). The following key models exist:

- `users` (collection)
  - Fields:
    - `userName` (string, unique, required)
    - `email` (string, unique, required)
    - `password` (string, hashed, required)
    - `resetPasswordToken` (string|null)
    - `resetPasswordExpires` (Date|null)

- `InterviewReport` (collection)
  - Fields (high level):
    - `jobDescription` (string, required)
    - `resume` (string) — extracted plain text from uploaded PDF
    - `selfDescription` (string)
    - `matchScore` (number 0-100)
    - `technicalQuestions` (array of objects: `question`, `intention`, `answer`)
    - `behavioralQuestions` (array of objects)
    - `skillGaps` (array of `{ skill, severity }`)
    - `preparationPlan` (array of `{ day, focus, tasks[] }`)
    - `user` (ObjectId ref to `users`)
    - `title` (string, required)
    - `createdAt`, `updatedAt` (timestamps)

- `blacklistTokens` (collection)
  - Fields:
    - `token` (string, required)
    - timestamps

Notes & recommendations
- The `resume` field stores raw extracted text and can be large — the list endpoint excludes it by default.
- Blacklisting tokens is used as a simple logout mechanism. Tokens remain in the collection until manually pruned; consider adding a TTL index to remove expired tokens automatically.
- Indexes: unique indexes exist on `users.userName` and `users.email` because of the Mongoose schema `unique: true`.
