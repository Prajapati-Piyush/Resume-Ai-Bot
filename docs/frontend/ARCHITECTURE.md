**Frontend Architecture**

Overview
- The frontend is a Vite React application. Routing is handled with `react-router-dom` using a single `router` exported from `src/app.route.jsx` and mounted in `src/App.jsx`.
- UI state is split into three contexts: `AuthContext`, `ResumeContext`, and `ToastContext` (see `src/context`). Reusable hooks wrap these contexts: `useAuth`, `useResume`, `useToast`.
- API integration uses `src/api/client.js` (axios) with credentials enabled and error normalization; higher-level clients live in `src/api/auth.api.js` and `src/api/interview.api.js`.
- Styling is Tailwind CSS configured in the project; components use utility classes in `src/index.css`.

High-level diagram

```mermaid
flowchart LR
  Browser --> UI[React Components]
  UI --> Contexts[Auth / Resume / Toast]
  UI --> API[Axios client]
  API -->|HTTP (with credentials)| Backend[(Express API)]
  Backend --> DB[(MongoDB)]
  API -->|file upload multipart| Backend
```

Routing snapshot
- Public marketing: `/` (Landing) — `MarketingLayout`
- Auth routes: `/login`, `/register`, `/forgot-password`, `/reset-password` — `PublicOnlyRoute` to redirect signed-in users
- App routes (protected): `/app` — `DashboardLayout` with nested pages: dashboard, resume, analyze, reports, profile

Files of interest
- `src/app.route.jsx` — route tree and layout assignment
- `src/App.jsx` — root providers and `RouterProvider`
- `src/api` — HTTP client and endpoints
- `src/context` — auth, resume, toast providers
- `src/hooks` — small hook wrappers for contexts
- `src/components` — layouts, UI primitives, report renderers
- `src/pages` — page-level containers
