import { useState } from 'react'
import {
  Brain,
  CalendarCheck,
  CircleCheck,
  Lightbulb,
  MessagesSquare,
  Target,
  TriangleAlert,
  Users,
} from 'lucide-react'
import Card, { CardHeader } from '../ui/Card'
import Badge from '../ui/Badge'
import Accordion from '../ui/Accordion'
import ScoreRing from '../ui/ScoreRing'
import EmptyState from '../ui/EmptyState'
import { cn, SEVERITY_TONE, scoreTone } from '../../lib/utils'

function QuestionList({ questions, emptyLabel }) {
  if (!questions?.length) {
    return <p className="px-1 py-6 text-center text-sm text-ink-500">{emptyLabel}</p>
  }

  return (
    <div className="space-y-2.5">
      {questions.map((q, i) => (
        <Accordion
          key={`${q.question}-${i}`}
          title={q.question}
          badge={
            <span className="shrink-0 rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium tabular-nums text-ink-400">
              {i + 1}
            </span>
          }
        >
          <div className="space-y-4">
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
                <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
                Why they ask this
              </p>
              <p className="text-sm leading-relaxed text-ink-300">{q.intention}</p>
            </div>

            <div className="rule" />

            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400">
                <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" />
                How to answer
              </p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-200">{q.answer}</p>
            </div>
          </div>
        </Accordion>
      ))}
    </div>
  )
}

/**
 * Full interview report renderer. Every section degrades to an empty state
 * rather than crashing when the AI omits a field.
 */
export default function ReportView({ report }) {
  const [tab, setTab] = useState('technical')

  const score = Math.round(report?.matchScore ?? 0)
  const tone = scoreTone(score)

  const technical = report?.technicalQuestions || []
  const behavioral = report?.behavioralQuestions || []
  const skillGaps = report?.skillGaps || []
  const plan = report?.preparationPlan || []

  const tabs = [
    { id: 'technical', label: 'Technical', count: technical.length, icon: Brain },
    { id: 'behavioral', label: 'Behavioural', count: behavioral.length, icon: Users },
  ]

  return (
    <div className="space-y-6">
      {/* ---------- score + summary ---------- */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <ScoreRing score={score} size={152} />
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {report?.title || 'Interview report'}
            </h2>

            <p className={cn('mt-1.5 text-sm font-medium', tone.text)}>
              {tone.label} — your resume covers roughly {score}% of what this role asks for.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: 'Questions', value: technical.length + behavioral.length, icon: MessagesSquare },
                { label: 'Skill gaps', value: skillGaps.length, icon: TriangleAlert },
                { label: 'Prep days', value: plan.length, icon: CalendarCheck },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center"
                >
                  <Icon className="mx-auto h-4 w-4 text-ink-500" aria-hidden="true" />
                  <p className="mt-1.5 text-lg font-bold tabular-nums text-white">{value}</p>
                  <p className="text-[11px] text-ink-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* ---------- skill gaps ---------- */}
      <Card>
        <CardHeader
          icon={Target}
          title="Skill gaps"
          description="Ranked by how critical each one is for this role."
        />

        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          {skillGaps.length ? (
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {[...skillGaps]
                .sort((a, b) => {
                  const order = { high: 0, medium: 1, low: 2 }
                  return (order[a.severity] ?? 3) - (order[b.severity] ?? 3)
                })
                .map((gap, i) => {
                  const sev = SEVERITY_TONE[gap.severity] || SEVERITY_TONE.low
                  return (
                    <li
                      key={`${gap.skill}-${i}`}
                      className={cn(
                        'flex items-center justify-between gap-3 rounded-xl border px-4 py-3',
                        sev.bg,
                        sev.border,
                      )}
                    >
                      <span className="min-w-0 truncate text-sm font-medium text-white">
                        {gap.skill}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
                          sev.text,
                        )}
                      >
                        {sev.label}
                      </span>
                    </li>
                  )
                })}
            </ul>
          ) : (
            <EmptyState
              icon={CircleCheck}
              title="No skill gaps found"
              description="Your resume covers the requirements listed in this job description."
            />
          )}
        </div>
      </Card>

      {/* ---------- questions ---------- */}
      <Card>
        <CardHeader
          icon={MessagesSquare}
          title="Predicted interview questions"
          description="Each question includes the interviewer's intent and a suggested approach."
        />

        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div
            className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1"
            role="tablist"
            aria-label="Question categories"
          >
            {tabs.map(({ id, label, count, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition',
                  tab === id
                    ? 'bg-brand-500/15 text-white'
                    : 'text-ink-400 hover:text-white',
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
                <span className="rounded-md bg-white/8 px-1.5 py-0.5 text-[11px] tabular-nums">
                  {count}
                </span>
              </button>
            ))}
          </div>

          {tab === 'technical' ? (
            <QuestionList
              questions={technical}
              emptyLabel="No technical questions were generated for this role."
            />
          ) : (
            <QuestionList
              questions={behavioral}
              emptyLabel="No behavioural questions were generated for this role."
            />
          )}
        </div>
      </Card>

      {/* ---------- preparation roadmap ---------- */}
      <Card>
        <CardHeader
          icon={CalendarCheck}
          title="Preparation roadmap"
          description="A day-by-day plan to close the gaps before your interview."
        />

        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          {plan.length ? (
            <ol className="relative space-y-4 border-l border-white/10 pl-6">
              {plan.map((day, i) => (
                <li key={`${day.day}-${i}`} className="relative">
                  <span
                    className="absolute -left-[1.9rem] grid h-7 w-7 place-items-center rounded-full border border-brand-400/30 bg-ink-900 text-[11px] font-semibold text-brand-300"
                    aria-hidden="true"
                  >
                    {day.day ?? i + 1}
                  </span>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="brand">Day {day.day ?? i + 1}</Badge>
                      <h4 className="text-sm font-semibold text-white">{day.focus}</h4>
                    </div>

                    {day.tasks?.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {day.tasks.map((task, t) => (
                          <li key={t} className="flex items-start gap-2.5 text-sm text-ink-300">
                            <CircleCheck
                              className="mt-0.5 h-4 w-4 shrink-0 text-accent-400/70"
                              aria-hidden="true"
                            />
                            <span className="leading-relaxed">{task}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState
              icon={CalendarCheck}
              title="No roadmap generated"
              description="The AI did not return a preparation plan for this report."
            />
          )}
        </div>
      </Card>
    </div>
  )
}
