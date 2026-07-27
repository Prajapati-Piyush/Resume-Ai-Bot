**Routing**

Routes are defined in `src/app.route.jsx` using `createBrowserRouter`. Key routes:

- `/` — Landing page (`MarketingLayout`)

- Auth pages (wrapped by `PublicOnlyRoute` which redirects authenticated users):
  - `/login` — `Login` page
  - `/register` — `Register` page
  - `/forgot-password` — `ForgotPassword` page
  - `/reset-password` — `ResetPassword` page

- Protected app pages (all wrapped by `ProtectedRoute` which redirects unauthenticated users): base path `/app` with `DashboardLayout` and nested children:
  - `/app` (index) — `Dashboard` page
  - `/app/resume` — `ResumeUpload` page
  - `/app/analyze` — `JobAnalysis` page
  - `/app/reports` — `ReportHistory` page
  - `/app/reports/:id` — `InterviewPrep` page (report detail)
  - `/app/profile` — `Profile` page

Unknown routes render `NotFound`.

Routing guards
- `ProtectedRoute` waits for `AuthContext` initialization; shows a loading state while probing session and redirects if unauthenticated.
- `PublicOnlyRoute` prevents signed-in users from accessing auth pages.

Navigation
- The primary navigation is implemented in `DashboardLayout` via `NavLink` items (active link styling) and responsive drawer handling.
