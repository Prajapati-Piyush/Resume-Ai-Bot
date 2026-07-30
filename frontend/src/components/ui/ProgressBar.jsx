import { cn } from '../../lib/utils'

export default function ProgressBar({ value = 0, className, barClassName, label }) {
  const safe = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-ink-400">{label}</span>
          <span className="tabular-nums font-medium text-ink-300">{safe}%</span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-fill-strong"
        role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100}
      >
        <div
          className={cn('h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400 transition-[width] duration-500 ease-out', barClassName)}
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  )
}
