import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  FileText,
  KeyRound,
  LogOut,
  Mail,
  Shield,
  TrendingUp,
  User as UserIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import Skeleton from '../../components/ui/Skeleton'
import { ConfirmDialog } from '../../components/ui/Modal'
import { listReports } from '../../api/interview.api'
import { useAuth } from '../../hooks/useAuth'
import { useResume } from '../../hooks/useResume'
import { useToast } from '../../hooks/useToast'
import { formatBytes, formatRelativeTime, initialsOf } from '../../lib/utils'

export default function Profile() {
  const { user, logout } = useAuth()
  const { resume, hasResume } = useResume()
  const toast = useToast()
  const navigate = useNavigate()

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setReports(await listReports())
    } catch {
      // stats are supplementary — a failure here shouldn't block the page
      setReports([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const stats = useMemo(() => {
    if (!reports.length) return { total: 0, avg: 0, latest: null }
    const scores = reports.map((r) => Math.round(r.matchScore ?? 0))
    return {
      total: reports.length,
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      latest: reports[0],
    }
  }, [reports])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      toast.success('Signed out')
      navigate('/login', { replace: true })
    } catch {
      toast.error('Could not sign out. Please try again.')
      setLoggingOut(false)
      setConfirmLogout(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Your account details and activity."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* ---- identity ---- */}
        <div className="space-y-6">
          <Card className="p-6 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl font-bold text-white shadow-glow">
              {initialsOf(user?.name, user?.email)}
            </span>

            <h2 className="mt-4 text-lg font-semibold text-ink-50">{user?.name || 'Your account'}</h2>
            <p className="mt-0.5 text-sm text-ink-400">{user?.email}</p>

            <div className="mt-4 flex justify-center">
              <Badge variant="brand" icon={Shield}>
                Free plan
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader icon={UserIcon} title="Account details" />
            <dl className="space-y-3 px-5 pb-5 sm:px-6 sm:pb-6">
              {[
                { label: 'Name', value: user?.name || '—', icon: UserIcon },
                { label: 'Email', value: user?.email || '—', icon: Mail },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-line bg-fill px-4 py-3"
                >
                  <Icon className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs text-ink-500">{label}</dt>
                    <dd className="truncate text-sm text-ink-50">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Card>
        </div>

        {/* ---- activity + settings ---- */}
        <div className="space-y-6">
          <Card>
            <CardHeader icon={TrendingUp} title="Activity" description="Your usage at a glance." />

            <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-3 sm:px-6 sm:pb-6">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))
              ) : (
                <>
                  <div className="rounded-xl border border-line bg-fill p-4 text-center">
                    <p className="text-2xl font-bold tabular-nums text-ink-50">{stats.total}</p>
                    <p className="mt-1 text-xs text-ink-500">Reports</p>
                  </div>
                  <div className="rounded-xl border border-line bg-fill p-4 text-center">
                    <p className="text-2xl font-bold tabular-nums text-ink-50">
                      {stats.total ? `${stats.avg}%` : '—'}
                    </p>
                    <p className="mt-1 text-xs text-ink-500">Avg. match</p>
                  </div>
                  <div className="col-span-2 rounded-xl border border-line bg-fill p-4 text-center sm:col-span-1">
                    <p className="truncate text-sm font-medium text-ink-50">
                      {stats.latest ? formatRelativeTime(stats.latest.createdAt) : '—'}
                    </p>
                    <p className="mt-1 text-xs text-ink-500">Last analysis</p>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader
              icon={FileText}
              title="Resume"
              description="The resume loaded in this session."
            />

            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              {hasResume ? (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] px-4 py-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-50">{resume.name}</p>
                    <p className="text-xs text-ink-400">
                      {formatBytes(resume.size)} · added {formatRelativeTime(resume.addedAt)}
                    </p>
                  </div>
                  <Button to="/app/resume" variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              ) : (
                <EmptyState
                  icon={FileText}
                  title="No resume loaded"
                  description="Resumes are held for the current session only and are not stored on the server."
                  action={<Button to="/app/resume">Upload resume</Button>}
                  className="py-8"
                />
              )}
            </div>
          </Card>

          <Card>
            <CardHeader icon={Shield} title="Settings" description="Manage access to your account." />

            <div className="space-y-3 px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="flex flex-col gap-3 rounded-xl border border-line bg-fill p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink-50">Password</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      Reset it via the emailed link flow.
                    </p>
                  </div>
                </div>
                <Button to="/forgot-password" variant="secondary" size="sm">
                  Reset password
                </Button>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-line bg-fill p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <LogOut className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink-50">Sign out</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      End this session on this device.
                    </p>
                  </div>
                </div>
                <Button variant="danger" size="sm" onClick={() => setConfirmLogout(true)}>
                  Sign out
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
        title="Sign out?"
        description="You'll need to sign in again to access your reports."
        confirmLabel="Sign out"
      />
    </>
  )
}
