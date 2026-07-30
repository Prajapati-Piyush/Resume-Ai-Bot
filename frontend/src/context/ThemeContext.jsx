import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const ThemeContext = createContext(null)

const STORAGE_KEY = 'preppilot.theme' // 'light' | 'dark' | 'system'

function systemPrefersDark() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true
}

/** Resolve a preference ('system') down to the concrete theme to paint. */
function resolve(pref) {
  return pref === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : pref
}

function applyTheme(resolved) {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved
}

export function ThemeProvider({ children }) {
  // Preference is what the user chose; resolved is what's actually rendered.
  const [preference, setPreference] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'system',
  )
  const [resolved, setResolved] = useState(() => resolve(preference))

  // Repaint whenever the preference changes.
  useEffect(() => {
    const next = resolve(preference)
    setResolved(next)
    applyTheme(next)

    if (preference === 'system') {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, preference)
    }
  }, [preference])

  // Follow the OS while the user is on 'system'.
  useEffect(() => {
    if (preference !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const next = systemPrefersDark() ? 'dark' : 'light'
      setResolved(next)
      applyTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [preference])

  const toggle = useCallback(() => {
    // Toggle flips the *rendered* theme and pins it as an explicit preference.
    setPreference(resolved === 'dark' ? 'light' : 'dark')
  }, [resolved])

  const value = useMemo(
    () => ({ preference, theme: resolved, isDark: resolved === 'dark', setPreference, toggle }),
    [preference, resolved, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
