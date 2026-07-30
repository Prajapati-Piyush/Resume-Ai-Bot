import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/utils'

const OPTIONS = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
]

/**
 * Segmented light / dark / system control.
 * `variant="icon"` renders a single compact button that flips the rendered
 * theme — used in tight spots like the marketing navbar.
 */
export default function ThemeToggle({ variant = 'segmented', className }) {
  const { preference, setPreference, toggle, isDark } = useTheme()

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        className={cn(
          'grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-400 transition hover:bg-fill-strong hover:text-ink-100',
          className,
        )}
      >
        {isDark ? <Moon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} /> : <Sun className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />}
      </button>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn('inline-flex items-center gap-0.5 rounded-lg border border-line bg-fill p-0.5', className)}
    >
      {OPTIONS.map(({ value, icon: Icon, label }) => {
        const active = preference === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setPreference(value)}
            className={cn(
              'grid h-7 w-7 place-items-center rounded-md transition',
              active
                ? 'bg-ink-900 text-ink-50 shadow-card'
                : 'text-ink-500 hover:text-ink-200',
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
