**Setup & Development**

Prerequisites
- Node.js (v18+ recommended)
- A running backend at `VITE_API_URL` or the default `http://localhost:3000/api`.

Install & run

```bash
cd genai-chatbot/frontend
npm install
npm run dev
```

Environment
- The app reads `VITE_API_URL` to override the API base. Example `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

Build

```bash
npm run build
```

Testing the flow locally
- Start the backend (`genai-chatbot/server`) and ensure `MONGO_URI` and `JWT_SECRET` are set.
- Open the app at the Vite dev URL (usually `http://localhost:5173`).

Notes
- Tailwind CSS is used for styling; edit `src/index.css` and `tailwind.config.js` for theme changes.
- The resume File is kept in memory by `ResumeContext` and will be lost on refresh — re-upload if necessary.
