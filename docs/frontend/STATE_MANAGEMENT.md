**State Management**

Contexts
- `AuthContext` (`src/context/AuthContext.jsx`)
  - Holds `user`, `initializing` and exposes actions: `login`, `register`, `logout`, `refresh`, `forgotPassword`, `resetPassword`.
  - On mount performs a session probe (`getMe`) to set initial state.
  - Listens for `SESSION_EXPIRED_EVENT` from `src/api/client.js` to clear the user when a 401 occurs elsewhere.

- `ResumeContext` (`src/context/ResumeContext.jsx`)
  - Stores a single in-memory resume File (not persisted) and helpers `selectResume` and `clearResume`.
  - Exposes `validateResumeFile` for client-side validation. Resumes are stored only for the browser session.

- `ToastContext` (`src/context/ToastContext.jsx`)
  - Lightweight queue for ephemeral notifications. Exposes `success`, `error`, `info`, `warning` and `dismiss`.

Hooks
- `useAuth`, `useResume`, `useToast` are tiny wrappers that assert presence of their respective Providers and return the context value.

Local component state
- Pages use local `useState` for form fields, submitting flags, progress indicators (upload progress), and transient UI (confirm dialogs, sorting, filtering).

Data lifecycle
- Authentication state is global via `AuthContext`.
- Resume File is intentionally ephemeral — uploaded on demand and cleared on refresh.
