import { cn, scoreTone } from '../../lib/utils'

/** Circular match-score gauge. Uses stroke-dashoffset so it animates on mount. */
export default function ScoreRing({ score = 0, size = 132, strokeWidth = 10, className, showLabel = true }) {
  const safe = Math.max(0, Math.min(100, Math.round(score || 0)))
  const tone = scoreTone(safe)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className={cn('relative inline-grid place-items-center', className)}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`Match score ${safe} out of 100`}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="currentColor" strokeWidth={strokeWidth}
          className="text-white/8"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={tone.stroke} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (safe / 100) * circumference}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className={cn('text-3xl font-bold tabular-nums', tone.text)}>{safe}</div>
          {showLabel && <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">{tone.label}</div>}
        </div>
      </div>
    </div>
  )
}
