import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export default function Logo({ to = '/', showWordmark = true, className }) {
  const mark = (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden="true">
        <path
          d="M12 2.5 14.4 9l6.6 2.4-6.6 2.4L12 20.5 9.6 13.8 3 11.4 9.6 9 12 2.5Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )

  const content = (
    <>
      {mark}
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-white">
          Prep<span className="text-brand-400">Pilot</span>
        </span>
      )}
    </>
  )

  const classes = cn('inline-flex items-center gap-2.5', className)

  if (!to) return <div className={classes}>{content}</div>

  return (
    <Link to={to} className={cn(classes, 'transition-opacity hover:opacity-85')} aria-label="PrepPilot home">
      {content}
    </Link>
  )
}
