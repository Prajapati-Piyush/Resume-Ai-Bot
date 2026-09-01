import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export default function Logo({ to = '/', showWordmark = true, className }) {
  // PrepPilot concept:
  // Sleek geometric monogram: Modern vertical mast + forward angled pilot compass / supersonic chevron + precision readiness check
  const mark = (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-indigo-700 text-white shadow-glow">
      <svg
        viewBox="0 0 32 32"
        className="h-5 w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Modern streamlined P silhouette with supersonic flight trajectory */}
        <path
          d="M7 6.5C7 5.67157 7.67157 5 8.5 5H18C22.4183 5 26 8.58172 26 13C26 17.4183 22.4183 21 18 21H12.5V26C12.5 26.8284 11.8284 27.5 11 27.5H8.5C7.67157 27.5 7 26.8284 7 26V6.5Z"
          fill="currentColor"
          fillOpacity="0.18"
        />
        {/* Forward Pilot Navigation Wing */}
        <path
          d="M8 6H17.5C21.0899 6 24 8.91015 24 12.5C24 16.0899 21.0899 19 17.5 19H8V6Z"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Primary Flight Mast */}
        <path
          d="M8 5V27"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Victory / Target Readiness Flight Compass */}
        <path
          d="M13.5 12.8L16.8 16L24.5 7.8"
          stroke="#2dd4bf"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )

  const content = (
    <>
      {mark}
      {showWordmark && (
        <span className="text-[16px] font-bold tracking-tight text-ink-50">
          Prep<span className="text-gradient-brand">Pilot</span>
        </span>
      )}
    </>
  )

  const classes = cn('inline-flex items-center gap-2.5', className)

  if (!to) return <div className={classes}>{content}</div>

  return (
    <Link
      to={to}
      className={cn(classes, 'transition-opacity hover:opacity-90')}
      aria-label="PrepPilot home"
    >
      {content}
    </Link>
  )
}
