import { cn } from '../../lib/utils'

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-14 text-center', className)}>
      {Icon && (
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-line bg-fill text-ink-400">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
      )}
      <h3 className="text-base font-semibold text-ink-50">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-400">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
