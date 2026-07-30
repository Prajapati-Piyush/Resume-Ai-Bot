import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  FileText,
  Gauge,
  History,
  Info,
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
import Badge from '../../components/ui/Badge'
import ScoreRing from '../../components/ui/ScoreRing'
import EmptyState from '../../components/ui/EmptyState'
import { SkeletonCard } from '../../components/ui/Skeleton'
import { Stagger, StaggerItem } from '../../components/ui/Motion'
import ReportCard from '../../components/report/ReportCard'
import { listReports } from '../../api/interview.api'
import { aggregateReadiness, readinessBand } from '../../lib/readiness'
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

  // Derived readiness (see lib/readiness.js) — labelled "Estimated" in the UI.
  const readiness = useMemo(() => aggregateReadiness(reports), [reports])
  const band = readinessBand(readiness.avg)

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

      {/* ---------- readiness hero + stats ---------- */}
      {loading ? (
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="h-56 rounded-2xl glass p-5 lg:col-span-1">
            <div className="skeleton h-3 w-1/3" />
            <div className="skeleton mx-auto mt-6 h-28 w-28 rounded-full" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[7.5rem] rounded-2xl glass p-5">
                <div className="skeleton h-3 w-1/2" />
                <div className="skeleton mt-3 h-7 w-1/3" />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section aria-label="Readiness and statistics" className="grid gap-4 lg:grid-cols-3">
          {/* readiness gauge */}
          <Card className="relative overflow-hidden p-5 lg:col-span-1">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 blur-3xl" aria-hidden="true" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-ink-200">
                <Gauge className="h-4 w-4 text-brand-400" aria-hidden="true" />
                Avg. readiness
              </div>
              <Badge variant="neutral" icon={Info} title="Estimated from match score, question coverage and skill gaps">
                Est.
              </Badge>
            </div>

            <div className="mt-4 flex flex-col items-center">
              <ScoreRing score={readiness.avg} size={132} showLabel={false} />
              <p className={cn('mt-3 text-sm font-semibold',
                band.tone === 'success' ? 'text-emerald-400' : band.tone === 'brand' ? 'text-brand-400' : band.tone === 'warning' ? 'text-amber-400' : 'text-rose-400',
              )}>
                {stats.total ? band.label : 'No data yet'}
              </p>
              {stats.total > 1 && (
                <p className="mt-1 text-xs text-ink-500">
                  {readiness.trend > 0 ? `Up ${readiness.trend} pts` : readiness.trend < 0 ? `Down ${Math.abs(readiness.trend)} pts` : 'Flat'} vs previous
                </p>
              )}
            </div>
          </Card>

          {/* stat cards */}
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            <StaggerItem>
              <StatCard icon={FileText} label="Reports" value={stats.total} sublabel="Generated so far" />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={TrendingUp}
                label="Average match"
                value={stats.total ? `${stats.avgScore}%` : '—'}
                sublabel="Across all reports"
                tone={stats.avgScore >= 70 ? 'success' : 'warning'}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={Target}
                label="Best match"
                value={stats.total ? `${stats.best}%` : '—'}
                sublabel="Your strongest role"
                tone="success"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={TriangleAlert}
                label="Skill gaps"
                value={stats.gaps}
                sublabel="Identified across roles"
                tone="warning"
              />
            </StaggerItem>
          </Stagger>
        </section>
      )}

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
            <p className="text-sm font-medium text-ink-50">
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
      <Stagger aria-label="Quick actions" className="mt-6 grid gap-4 sm:grid-cols-3">
        {QUICK_ACTIONS.map(({ to, icon: Icon, title, body }) => (
          <StaggerItem key={to}>
            <Link
              to={to}
              className="group block h-full rounded-2xl glass p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-fill-strong hover:shadow-lift"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-brand-300 transition-transform group-hover:scale-105">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ink-50">
                {title}
                <ArrowRight
                  className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-ink-400">{body}</span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

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
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((report) => (
                <StaggerItem key={report._id} className="h-full">
                  <ReportCard report={report} />
                </StaggerItem>
              ))}
            </Stagger>
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
