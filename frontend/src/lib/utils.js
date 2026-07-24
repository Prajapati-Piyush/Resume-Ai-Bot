/** Tiny className joiner — filters falsy values so conditionals stay readable. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function formatDate(value, opts = {}) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...opts,
  })
}

export function formatRelativeTime(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  const seconds = Math.round((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'

  const units = [
    ['minute', 60],
    ['hour', 3600],
    ['day', 86400],
    ['week', 604800],
    ['month', 2592000],
    ['year', 31536000],
  ]

  let chosen = units[0]
  for (const unit of units) {
    if (seconds >= unit[1]) chosen = unit
  }

  const value_ = Math.floor(seconds / chosen[1])
  return new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(
    -value_,
    chosen[0],
  )
}

export function initialsOf(name = '', email = '') {
  const source = (name || email || '?').trim()
  const parts = source.split(/[\s._-]+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return source.slice(0, 2).toUpperCase()
}

/** Match-score → semantic colour band, shared by every score display. */
export function scoreTone(score) {
  if (score >= 75) return { label: 'Strong match', text: 'text-emerald-400', stroke: '#34d399', bg: 'bg-emerald-500/10', border: 'border-emerald-400/25' }
  if (score >= 50) return { label: 'Partial match', text: 'text-amber-400', stroke: '#fbbf24', bg: 'bg-amber-500/10', border: 'border-amber-400/25' }
  return { label: 'Needs work', text: 'text-rose-400', stroke: '#fb7185', bg: 'bg-rose-500/10', border: 'border-rose-400/25' }
}

export const SEVERITY_TONE = {
  high: { text: 'text-rose-300', bg: 'bg-rose-500/10', border: 'border-rose-400/25', label: 'High' },
  medium: { text: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-400/25', label: 'Medium' },
  low: { text: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-400/25', label: 'Low' },
}
