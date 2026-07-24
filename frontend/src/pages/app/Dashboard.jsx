import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  FileText,
  History,
  Sparkles,
  Target,
  TrendingUp,
  TriangleAlert,
  Upload,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { SkeletonCard } from '../../components/ui/Skeleton'
import ReportCard from '../../components/report/ReportCard'
import { listReports } from '../../api/interview.api'
import { useAuth } from '../../hooks/useAuth'
import { useResume } from '../../hooks/useResume'
import { useToast } from '../../hooks/useToast'
import { cn } from '../../lib/utils'

const QUICK_ACTIONS = [
  {
    to: '/app/resume',
    icon: Upload,
    title: 'Upload resume',
    body: 'Add or replace the PDF used for your analyses.',
  },
  {
    to: '/app/analyze',
    icon: Sparkles,
    title: 'New analysis',
    body: 'Paste a job description and generate a prep report.',
  },
  {
    to: '/app/reports',
    icon: History,
    title: 'Report history',
    body: 'Revisit every report you have generated.',
  },
]

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { user } = useAuth()
  const { hasResume, resume } = useResume()
  const toast = useToast()

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setReports(await listReports())
    } catch (err) {
      setError(err.message)
      toast.error(err.message, { title: 'Could not load reports' })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stats = useMemo(() => {
    if (!reports.length) {
      return { total: 0, avgScore: 0, best: 0, gaps: 0 }
    }

    const scores = reports.map((r) => Math.round(r.matchScore ?? 0))
    const gaps = reports.reduce((sum, r) => sum + (r.skillGaps?.length || 0), 0)

    return {
      total: reports.length,
      avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      best: Math.max(...scores),
      gaps,
    }
  }, [reports])

  const recent = reports.slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow={greeting()}
        title={user?.name ? `Welcome back, ${user.name}` : 'Welcome back'}
        description="Here's where your interview preparation stands."
        actions={
          <Button to="/app/analyze">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            New analysis
          </Button>
        }
      />

      {/* ---------- stats ---------- */}
      <section aria-label="Your statistics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[7.5rem] rounded-2xl glass p-5">
              <div className="skeleton h-3 w-1/2" />
              <div className="skeleton mt-3 h-7 w-1/3" />
            </div>
          ))
        ) : (
          <>
            <StatCard icon={FileText} label="Reports" value={stats.total} sublabel="Generated so far" />
            <StatCard
              icon={TrendingUp}
              label="Average match"
              value={stats.total ? `${stats.avgScore}%` : '—'}
              sublabel="Across all reports"
              tone={stats.avgScore >= 70 ? 'success' : 'warning'}
            />
            <StatCard
              icon={Target}
              label="Best match"
              value={stats.total ? `${stats.best}%` : '—'}
              sublabel="Your strongest role"
              tone="success"
            />
            <StatCard
              icon={TriangleAlert}
              label="Skill gaps"
              value={stats.gaps}
              sublabel="Identified across roles"
              tone="warning"
            />
          </>
        )}
      </section>

      {/* ---------- resume status ---------- */}
      <Card
        className={cn(
          'mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between',
          hasResume ? 'border-emerald-400/20 bg-emerald-500/[0.04]' : 'border-amber-400/20 bg-amber-500/[0.04]',
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'grid h-10 w-10 shrink-0 place-items-center rounded-xl border',
              hasResume
                ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-400'
                : 'border-amber-400/25 bg-amber-500/10 text-amber-400',
            )}
          >
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>

          <div className="min-w-0">
            <p className="text-sm font-medium text-white">
              {hasResume ? `Resume ready — ${resume.name}` : 'No resume loaded'}
            </p>
            <p className="mt-0.5 text-xs text-ink-400">
              {hasResume
                ? 'You can start a new analysis right away.'
                : 'Upload a PDF resume to start generating reports.'}
            </p>
          </div>
        </div>

        <Button to="/app/resume" variant={hasResume ? 'ghost' : 'primary'} size="sm">
          {hasResume ? 'Replace resume' : 'Upload resume'}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </Card>

      {/* ---------- quick actions ---------- */}
      <section aria-label="Quick actions" className="mt-6 grid gap-4 sm:grid-cols-3">
        {QUICK_ACTIONS.map(({ to, icon: Icon, title, body }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-2xl glass p-5 shadow-card transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-lift"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-brand-300 transition-transform group-hover:scale-105">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-white">
              {title}
              <ArrowRight
                className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-ink-400">{body}</span>
          </Link>
        ))}
      </section>

      {/* ---------- recent reports ---------- */}
      <Card className="mt-6">
        <CardHeader
          icon={History}
          title="Recent reports"
          description="Your three most recent analyses."
          action={
            reports.length > 0 && (
              <Button to="/app/reports" variant="ghost" size="sm">
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            )
          }
        />

        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <EmptyState
              icon={TriangleAlert}
              title="Could not load your reports"
              description={error}
              action={<Button onClick={load}>Try again</Button>}
            />
          ) : recent.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((report) => (
                <ReportCard key={report._id} report={report} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Sparkles}
              title="No reports yet"
              description="Upload your resume and paste a job description to generate your first interview prep report."
              action={
                <Button to={hasResume ? '/app/analyze' : '/app/resume'}>
                  {hasResume ? 'Start an analysis' : 'Upload your resume'}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              }
            />
          )}
        </div>
      </Card>
    </>
  )
}
