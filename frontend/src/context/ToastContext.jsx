import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'

export const ToastContext = createContext(null)

const VARIANTS = {
  success: { icon: CheckCircle2, ring: 'ring-emerald-400/30', tint: 'text-emerald-400' },
  error: { icon: XCircle, ring: 'ring-rose-400/30', tint: 'text-rose-400' },
  warning: { icon: AlertTriangle, ring: 'ring-amber-400/30', tint: 'text-amber-400' },
  info: { icon: Info, ring: 'ring-brand-400/30', tint: 'text-brand-300' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (message, { variant = 'info', title, duration = 5000 } = {}) => {
      const id = ++idRef.current
      setToasts((prev) => [...prev, { id, message, variant, title }])
      if (duration > 0) setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  const toast = useMemo(
    () => ({
      success: (m, o) => push(m, { ...o, variant: 'success' }),
      error: (m, o) => push(m, { ...o, variant: 'error' }),
      warning: (m, o) => push(m, { ...o, variant: 'warning' }),
      info: (m, o) => push(m, { ...o, variant: 'info' }),
      dismiss,
    }),
    [push, dismiss],
  )

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => {
          const { icon: Icon, ring, tint } = VARIANTS[t.variant] || VARIANTS.info
          return (
            <div
              key={t.id}
              role="status"
              aria-live="polite"
              className={`pointer-events-auto flex w-full max-w-sm animate-slide-in-right items-start gap-3 rounded-xl p-3.5 shadow-lift ring-1 glass-strong ${ring}`}
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tint}`} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                {t.title && (
                  <p className="text-sm font-semibold text-ink-50">{t.title}</p>
                )}
                <p className="break-words text-sm text-ink-300">{t.message}</p>
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="rounded-md p-1 text-ink-400 transition hover:bg-fill-strong hover:text-ink-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
