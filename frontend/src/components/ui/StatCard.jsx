import Card from './Card'
import { cn } from '../../lib/utils'

export default function StatCard({ icon: Icon, label, value, sublabel, tone = 'brand', className }) {
  const tones = {
    brand: 'border-brand-400/25 bg-brand-500/12 text-brand-300',
    success: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-300',
    warning: 'border-amber-400/25 bg-amber-500/10 text-amber-300',
    neutral: 'border-white/12 bg-white/[0.05] text-ink-300',
  }

  return (
    <Card hover className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-ink-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-white">{value}</p>
          {sublabel && <p className="mt-1 truncate text-xs text-ink-500">{sublabel}</p>}
        </div>
        {Icon && (
          <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl border', tones[tone])}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>
    </Card>
  )
}
