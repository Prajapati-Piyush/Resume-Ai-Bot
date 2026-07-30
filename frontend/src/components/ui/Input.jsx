import { forwardRef, useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Labelled field with inline validation messaging.
 * Wires aria-invalid / aria-describedby so errors are announced by screen readers.
 */
const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    icon: Icon,
    type = 'text',
    className,
    containerClassName,
    id: providedId,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const id = providedId || generatedId
  const [revealed, setRevealed] = useState(false)

  const isPassword = type === 'password'
  const resolvedType = isPassword && revealed ? 'text' : type
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-200">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-500"
            style={{ width: 18, height: 18 }}
            aria-hidden="true"
          />
        )}

        <input
          ref={ref}
          id={id}
          type={resolvedType}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-11 w-full rounded-xl border bg-fill text-sm text-ink-50 transition',
            'placeholder:text-ink-500 focus:bg-fill-strong',
            'disabled:cursor-not-allowed disabled:opacity-55',
            Icon ? 'pl-11' : 'pl-3.5',
            isPassword ? 'pr-11' : 'pr-3.5',
            error
              ? 'border-rose-400/50 focus:border-rose-400'
              : 'border-line focus:border-brand-400/60',
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-500 transition hover:text-ink-200"
          >
            {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
})

export default Input

export const Textarea = forwardRef(function Textarea(
  { label, error, hint, className, containerClassName, id: providedId, ...props },
  ref,
) {
  const generatedId = useId()
  const id = providedId || generatedId
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-200">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={cn(
          'w-full resize-y rounded-xl border bg-fill p-3.5 text-sm leading-relaxed text-ink-50 transition',
          'placeholder:text-ink-500 focus:bg-fill-strong',
          'disabled:cursor-not-allowed disabled:opacity-55',
          error
            ? 'border-rose-400/50 focus:border-rose-400'
            : 'border-line focus:border-brand-400/60',
          className,
        )}
        {...props}
      />

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
})
