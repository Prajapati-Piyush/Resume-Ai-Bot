import { Info, Sparkles } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ScoreRing from '../ui/ScoreRing'
import { computeReadiness, readinessBand } from '../../lib/readiness'
import { cn } from '../../lib/utils'

const TONE_TEXT = {
  success: 'text-emerald-400',
  brand: 'text-brand-400',
  warning: 'text-amber-400',
  danger: 'text-rose-400',
}
const TONE_BAR = {
  success: 'from-emerald-500 to-emerald-400',
  brand: 'from-brand-500 to-accent-400',
  warning: 'from-amber-500 to-amber-400',
  danger: 'from-rose-500 to-rose-400',
}

function CategoryBar({ label, score, delay = 0 }) {
  const band = readinessBand(score)
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-ink-300">{label}</span>
        <span className={cn('font-semibold tabular-nums', TONE_TEXT[band.tone])}>{score}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-fill-strong">
        <div
          className={cn('h-full rounded-full bg-gradient-to-r transition-[width] duration-700 ease-out', TONE_BAR[band.tone])}
          style={{ width: `${score}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  )
}

/**
 * Interview Readiness analytics. All values are DERIVED heuristics (see
 * lib/readiness.js) — hence the explicit "Estimated" marker.
 */
export default function ReadinessPanel({ report, className }) {
  const readiness = computeReadiness(report)
  if (!readiness) return null

  const band = readinessBand(readiness.overall)

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-brand-300">
            <Sparkles className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-ink-50">Interview readiness</h3>
            <p className="text-xs text-ink-500">Across five dimensions</p>
          </div>
        </div>

        {/* honesty marker — these are computed, not from the AI */}
        <Badge variant="neutral" icon={Info} title="Estimated from your match score, question coverage and skill gaps">
          Estimated
        </Badge>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[auto_1fr] lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <ScoreRing score={readiness.overall} size={148} showLabel={false} />
          <div className="text-center">
            <p className={cn('text-sm font-semibold', TONE_TEXT[band.tone])}>{band.label}</p>
            <p className="mt-0.5 text-xs text-ink-500">Overall readiness</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3.5">
          {readiness.categories.map((c, i) => (
            <CategoryBar key={c.key} label={c.label} score={c.score} delay={i * 80} />
          ))}
        </div>
      </div>
    </Card>
  )
}
