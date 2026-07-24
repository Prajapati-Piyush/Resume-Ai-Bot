import { cn } from '../../lib/utils'

/** Frosted surface used for every panel in the app. */
export default function Card({ as: Tag = 'div', className, hover = false, children, ...props }) {
  return (
    <Tag
      className={cn(
        'rounded-2xl glass shadow-card',
        hover && 'transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-lift',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CardHeader({ title, description, icon: Icon, action, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 p-5 sm:p-6', className)}>
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-brand-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">{title}</h3>
          {description && <p className="mt-1 text-sm text-ink-400">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
