**Components**

Organization
- `src/components/layout` — page skeletons and route guards (e.g. `DashboardLayout`, `MarketingLayout`, `ProtectedRoute`, `PublicOnlyRoute`, `AuthShell`, `Logo`, `ErrorBoundary`).
- `src/components/ui` — reusable UI primitives (e.g. `Button`, `Input`, `Card`, `Badge`, `Modal`, `Accordion`, `Spinner`, `Skeleton`, `ProgressBar`, `ScoreRing`, `PageHeader`).
- `src/components/report` — report-specific UI: `ResumeDropzone`, `ReportCard`, `ReportView`.

Notable components
- `AuthShell` — shared layout for auth pages, handles footer and secondary actions.
- `ResumeDropzone` — drag-and-drop + file picker for PDF resumes; client-side validation via `validateResumeFile`.
- `ReportView` — full viewer that renders score, skill gaps, questions and preparation plan; tolerant of missing fields.
- `DashboardLayout` — sidebar navigation, responsive drawer, sign-out flow wired to `AuthContext` and `ToastContext`.

Design patterns
- Small presentational components use props for content and composition; pages compose Cards and headers.
- UI primitives are accessible and include ARIA attributes (roles, labels, live regions).
