import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Printer, Trash2, TriangleAlert } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import Skeleton, { SkeletonText } from '../../components/ui/Skeleton'
import { ConfirmDialog } from '../../components/ui/Modal'
import ReportView from '../../components/report/ReportView'
import { deleteReport, getReport } from '../../api/interview.api'
import { useToast } from '../../hooks/useToast'
import { formatDate } from '../../lib/utils'

function ReportSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <Skeleton className="h-[152px] w-[152px] shrink-0 rounded-full" />
          <div className="w-full flex-1 space-y-3">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <div className="grid grid-cols-3 gap-3 pt-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-5 w-40" />
          <SkeletonText lines={4} className="mt-4" />
        </Card>
      ))}
    </div>
  )
}

export default function InterviewPrep() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setReport(await getReport(id))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteReport(id)
      toast.success('Report deleted')
      navigate('/app/reports', { replace: true })
    } catch (err) {
      toast.error(err.message, { title: 'Delete failed' })
      setDeleting(false)
      setConfirmOpen(false)
    }
  }

  if (loading) {
    return (
      <>
        <PageHeader eyebrow="Report" title="Loading report…" />
        <ReportSkeleton />
      </>
    )
  }

  if (error || !report) {
    return (
      <>
        <PageHeader
          eyebrow="Report"
          title="Report unavailable"
          actions={
            <Button to="/app/reports" variant="secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to reports
            </Button>
          }
        />
        <Card>
          <EmptyState
            icon={TriangleAlert}
            title={error === 'Not found' ? 'This report no longer exists' : 'Could not load report'}
            description={error || 'The report may have been deleted.'}
            action={
              <div className="flex gap-2">
                <Button onClick={load} variant="secondary">Try again</Button>
                <Button to="/app/reports">All reports</Button>
              </div>
            }
          />
        </Card>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Interview prep"
        title={report.title || 'Interview report'}
        description={
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            Generated {formatDate(report.createdAt, { hour: 'numeric', minute: '2-digit' })}
          </span>
        }
        actions={
          <>
            <Button to="/app/reports" variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All reports
            </Button>
            <Button variant="secondary" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmOpen(true)}
              className="text-ink-400 hover:text-rose-400"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </Button>
          </>
        }
      />

      <ReportView report={report} />

      {/* the job description this was generated against, for reference */}
      {report.jobDescription && (
        <Card className="mt-6 p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-white">Job description used</h3>
          <p className="mt-3 max-h-64 overflow-y-auto whitespace-pre-line text-sm leading-relaxed text-ink-400">
            {report.jobDescription}
          </p>
        </Card>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this report?"
        description="This permanently removes the report and its questions, gaps and roadmap. This cannot be undone."
        confirmLabel="Delete report"
      />
    </>
  )
}
