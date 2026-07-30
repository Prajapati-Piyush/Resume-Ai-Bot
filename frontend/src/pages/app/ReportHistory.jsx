import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowUpDown, Search, Sparkles, TriangleAlert } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import EmptyState from '../../components/ui/EmptyState'
import { SkeletonCard } from '../../components/ui/Skeleton'
import { ConfirmDialog } from '../../components/ui/Modal'
import ReportCard from '../../components/report/ReportCard'
import { Stagger, StaggerItem } from '../../components/ui/Motion'
import { deleteReport, listReports } from '../../api/interview.api'
import { useToast } from '../../hooks/useToast'

const SORTS = {
  newest: { label: 'Newest first', fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  oldest: { label: 'Oldest first', fn: (a, b) => new Date(a.createdAt) - new Date(b.createdAt) },
  score: { label: 'Highest score', fn: (a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0) },
}

export default function ReportHistory() {
  const toast = useToast()

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setReports(await listReports())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()

    const filtered = needle
      ? reports.filter(
          (r) =>
            r.title?.toLowerCase().includes(needle) ||
            r.jobDescription?.toLowerCase().includes(needle),
        )
      : reports

    return [...filtered].sort(SORTS[sort].fn)
  }, [reports, query, sort])

  const handleDelete = async () => {
    if (!pendingDelete) return

    setDeleting(true)
    const id = pendingDelete._id

    try {
      await deleteReport(id)
      // optimistic local removal — avoids a full refetch
      setReports((prev) => prev.filter((r) => r._id !== id))
      toast.success('Report deleted')
      setPendingDelete(null)
    } catch (err) {
      toast.error(err.message, { title: 'Delete failed' })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="History"
        title="Your reports"
        description={
          reports.length
            ? `${reports.length} report${reports.length === 1 ? '' : 's'} generated.`
            : 'Every analysis you generate is saved here.'
        }
        actions={
          <Button to="/app/analyze">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            New analysis
          </Button>
        }
      />

      {/* ---- controls ---- */}
      {(reports.length > 0 || loading) && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            icon={Search}
            placeholder="Search by role or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            containerClassName="flex-1"
            aria-label="Search reports"
          />

          <div className="relative">
            <ArrowUpDown
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
              aria-hidden="true"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort reports"
              className="h-11 w-full appearance-none rounded-xl border border-line bg-fill pl-10 pr-9 text-sm text-ink-50 transition focus:border-brand-400/60 sm:w-48"
            >
              {Object.entries(SORTS).map(([key, { label }]) => (
                <option key={key} value={key} className="bg-ink-900">
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ---- list ---- */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <Card>
          <EmptyState
            icon={TriangleAlert}
            title="Could not load your reports"
            description={error}
            action={<Button onClick={load}>Try again</Button>}
          />
        </Card>
      ) : visible.length ? (
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((report) => (
            <StaggerItem key={report._id} className="h-full">
              <ReportCard report={report} onDelete={setPendingDelete} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : reports.length ? (
        <Card>
          <EmptyState
            icon={Search}
            title="No matches"
            description={`Nothing matched “${query}”. Try a different search.`}
            action={<Button variant="secondary" onClick={() => setQuery('')}>Clear search</Button>}
          />
        </Card>
      ) : (
        <Card>
          <EmptyState
            icon={Sparkles}
            title="No reports yet"
            description="Generate your first interview prep report and it will appear here."
            action={<Button to="/app/analyze">Start an analysis</Button>}
          />
        </Card>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this report?"
        description={`“${pendingDelete?.title || 'Untitled role'}” will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete report"
      />
    </>
  )
}
