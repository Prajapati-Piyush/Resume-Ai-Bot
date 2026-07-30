import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import Card from './Card'
import { cn } from '../../lib/utils'

const TONES = {
  brand: 'border-brand-400/25 bg-brand-500/12 text-brand-300',
  success: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-300',
  warning: 'border-amber-400/25 bg-amber-500/10 text-amber-300',
  neutral: 'border-line bg-fill-strong text-ink-300',
}

/** Optional trend chip: positive = up/green, negative = down/rose, 0 = flat. */
function Trend({ value }) {
  if (value === null || value === undefined) return null

  const up = value > 0
  const flat = value === 0
  const Icon = flat ? Minus : up ? ArrowUpRight : ArrowDownRight

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums',
        flat && 'bg-fill-strong text-ink-400',
        up && 'bg-emerald-500/12 text-emerald-400',
        !up && !flat && 'bg-rose-500/12 text-rose-400',
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {flat ? '0' : `${up ? '+' : ''}${value}`}
    </span>
  )
}

export default function StatCard({ icon: Icon, label, value, sublabel, tone = 'brand', trend, className }) {
  return (
    <Card hover className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-ink-500">{label}</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-2xl font-bold tabular-nums text-ink-50">{value}</p>
            <Trend value={trend} />
          </div>
          {sublabel && <p className="mt-1 truncate text-xs text-ink-500">{sublabel}</p>}
        </div>
        {Icon && (
          <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl border', TONES[tone])}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>
    </Card>
  )
}
