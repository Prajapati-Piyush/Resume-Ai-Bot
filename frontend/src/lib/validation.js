const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value) {
  if (!value?.trim()) return 'Email is required.'
  if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.'
  return null
}

export function validatePassword(value, { min = 6 } = {}) {
  if (!value) return 'Password is required.'
  if (value.length < min) return `Password must be at least ${min} characters.`
  return null
}

export function validateName(value) {
  if (!value?.trim()) return 'Name is required.'
  if (value.trim().length < 2) return 'Name must be at least 2 characters.'
  return null
}

export function validateConfirm(password, confirm) {
  if (!confirm) return 'Please confirm your password.'
  if (password !== confirm) return 'Passwords do not match.'
  return null
}

/** Run a map of field -> validator result, returning only the entries that failed. */
export function collectErrors(map) {
  return Object.fromEntries(Object.entries(map).filter(([, v]) => Boolean(v)))
}

/** 0-4 strength score plus a label, used by the register form meter. */
export function passwordStrength(password = '') {
  if (!password) return { score: 0, label: '', tone: 'bg-white/10' }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const capped = Math.min(4, score)
  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong']
  const tones = ['bg-rose-500', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-400']

  return { score: capped, label: labels[capped], tone: tones[capped] }
}
