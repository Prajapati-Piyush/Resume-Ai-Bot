import { ArrowRight, CalendarDays, MessagesSquare, Trash2, TriangleAlert } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { cn, formatRelativeTime, scoreTone } from '../../lib/utils'

/** Summary tile for one interview report — used on the dashboard and history page. */
export default function ReportCard({ report, onDelete, className }) {
  const score = Math.round(report?.matchScore ?? 0)
  const tone = scoreTone(score)

  const questionCount =
    (report?.technicalQuestions?.length || 0) + (report?.behavioralQuestions?.length || 0)
  const gapCount = report?.skillGaps?.length || 0

  return (
    <Card hover className={cn('flex h-full flex-col p-5', className)}>
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'grid h-14 w-14 shrink-0 place-items-center rounded-xl border',
            tone.bg,
            tone.border,
          )}
        >
          <span className={cn('text-lg font-bold tabular-nums', tone.text)}>{score}</span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-ink-50">
            {report?.title || 'Untitled role'}
          </h3>
          <p className={cn('mt-0.5 text-xs font-medium', tone.text)}>{tone.label}</p>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-500">
            {report?.jobDescription || 'No job description recorded.'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <MessagesSquare className="h-3.5 w-3.5" aria-hidden="true" />
          {questionCount} question{questionCount === 1 ? '' : 's'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
          {gapCount} gap{gapCount === 1 ? '' : 's'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {formatRelativeTime(report?.createdAt)}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
        <Button to={`/app/reports/${report?._id}`} size="sm" variant="secondary" className="flex-1">
          View report
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>

        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(report)}
            aria-label={`Delete report for ${report?.title || 'this role'}`}
            className="text-ink-400 hover:text-rose-400"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </Card>
  )
}
