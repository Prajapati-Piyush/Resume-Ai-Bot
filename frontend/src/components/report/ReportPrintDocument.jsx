import { computeReadiness } from '../../lib/readiness'
import { formatDate } from '../../lib/utils'

/*
  Print-only, theme-independent document used for "Export as PDF" (via the
  browser's Save-as-PDF). Rendered off-screen and revealed only by @media print
  (see index.css .print-root). Styling is inline with fixed light colours so the
  PDF looks professional regardless of the app's current light/dark theme.

  `scope`: 'full' | 'questions' | 'roadmap' controls which sections print.
*/

const C = {
  ink: '#0f172a',
  sub: '#475569',
  faint: '#64748b',
  line: '#e2e8f0',
  brand: '#4f46e5',
  bgSoft: '#f8fafc',
}

const SEV = {
  high: { label: 'High', color: '#dc2626', bg: '#fef2f2' },
  medium: { label: 'Medium', color: '#d97706', bg: '#fffbeb' },
  low: { label: 'Low', color: '#059669', bg: '#ecfdf5' },
}

function Section({ title, children }) {
  return (
    <section style={{ marginTop: 28, breakInside: 'avoid' }}>
      <h2
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: C.ink,
          margin: '0 0 12px',
          paddingBottom: 8,
          borderBottom: `2px solid ${C.brand}`,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function QuestionBlock({ q, index }) {
  return (
    <div style={{ marginBottom: 14, breakInside: 'avoid' }}>
      <p style={{ fontSize: 12.5, fontWeight: 600, color: C.ink, margin: '0 0 4px' }}>
        {index}. {q.question}
      </p>
      <p style={{ fontSize: 11, color: C.faint, margin: '0 0 4px', fontStyle: 'italic' }}>
        Intent: {q.intention}
      </p>
      <p style={{ fontSize: 11.5, color: C.sub, margin: 0, whiteSpace: 'pre-line', lineHeight: 1.55 }}>
        {q.answer}
      </p>
    </div>
  )
}

export default function ReportPrintDocument({ report, scope = 'full' }) {
  if (!report) return null

  const readiness = computeReadiness(report)
  const showQuestions = scope === 'full' || scope === 'questions'
  const showRoadmap = scope === 'full' || scope === 'roadmap'
  const showOverview = scope === 'full'

  const scopeLabel =
    scope === 'questions' ? 'Interview Questions' : scope === 'roadmap' ? 'Preparation Roadmap' : 'Full Report'

  return (
    <div
      className="print-root"
      aria-hidden="true"
      style={{
        background: '#fff',
        color: C.ink,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: '32px 36px',
        maxWidth: 820,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingBottom: 16,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.brand, letterSpacing: '-0.01em' }}>
            PrepPilot
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 10, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {scopeLabel}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.ink }}>
            {report.title || 'Interview Report'}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 10.5, color: C.faint }}>
            Generated {formatDate(report.createdAt)}
          </p>
        </div>
      </div>

      {/* Overview (full only) */}
      {showOverview && (
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <div style={{ flex: 1, padding: '14px 16px', background: C.bgSoft, borderRadius: 10, border: `1px solid ${C.line}` }}>
            <p style={{ margin: 0, fontSize: 10, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Match score</p>
            <p style={{ margin: '4px 0 0', fontSize: 26, fontWeight: 800, color: C.brand }}>{report.matchScore ?? 0}%</p>
          </div>
          <div style={{ flex: 1, padding: '14px 16px', background: C.bgSoft, borderRadius: 10, border: `1px solid ${C.line}` }}>
            <p style={{ margin: 0, fontSize: 10, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Readiness (est.)
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 26, fontWeight: 800, color: C.ink }}>{readiness?.overall ?? 0}%</p>
          </div>
          <div style={{ flex: 1, padding: '14px 16px', background: C.bgSoft, borderRadius: 10, border: `1px solid ${C.line}` }}>
            <p style={{ margin: 0, fontSize: 10, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Skill gaps</p>
            <p style={{ margin: '4px 0 0', fontSize: 26, fontWeight: 800, color: C.ink }}>{report.skillGaps?.length ?? 0}</p>
          </div>
        </div>
      )}

      {/* Skill gaps (full only) */}
      {showOverview && report.skillGaps?.length > 0 && (
        <Section title="Skill Gaps">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {report.skillGaps.map((g, i) => {
              const sev = SEV[g.severity] || SEV.low
              return (
                <span
                  key={i}
                  style={{
                    fontSize: 11,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: sev.bg,
                    color: sev.color,
                    border: `1px solid ${sev.color}33`,
                    fontWeight: 600,
                  }}
                >
                  {g.skill} · {sev.label}
                </span>
              )
            })}
          </div>
        </Section>
      )}

      {/* Questions */}
      {showQuestions && report.technicalQuestions?.length > 0 && (
        <Section title="Technical Questions">
          {report.technicalQuestions.map((q, i) => (
            <QuestionBlock key={i} q={q} index={i + 1} />
          ))}
        </Section>
      )}

      {showQuestions && report.behavioralQuestions?.length > 0 && (
        <Section title="Behavioural Questions">
          {report.behavioralQuestions.map((q, i) => (
            <QuestionBlock key={i} q={q} index={i + 1} />
          ))}
        </Section>
      )}

      {/* Roadmap */}
      {showRoadmap && report.preparationPlan?.length > 0 && (
        <Section title="Preparation Roadmap">
          {report.preparationPlan.map((day, i) => (
            <div key={i} style={{ marginBottom: 14, breakInside: 'avoid' }}>
              <p style={{ fontSize: 12.5, fontWeight: 700, color: C.brand, margin: '0 0 4px' }}>
                Day {day.day ?? i + 1} — {day.focus}
              </p>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {day.tasks?.map((task, t) => (
                  <li key={t} style={{ fontSize: 11.5, color: C.sub, marginBottom: 3, lineHeight: 1.5 }}>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* Footer */}
      <div style={{ marginTop: 32, paddingTop: 12, borderTop: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ margin: 0, fontSize: 9.5, color: C.faint }}>
          Generated by PrepPilot · Readiness scores are estimated from report data.
        </p>
        <p style={{ margin: 0, fontSize: 9.5, color: C.faint }}>preppilot.app</p>
      </div>
    </div>
  )
}
