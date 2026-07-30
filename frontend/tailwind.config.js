/** @type {import('tailwindcss').Config} */

// The `ink` scale is SEMANTIC, not literal. Each stop has a fixed meaning and its
// actual colour is supplied by a CSS variable that flips between light and dark
// (see index.css). This lets the whole app theme without rewriting class names:
//   ink-50   → primary text        ink-700 → strong border
//   ink-300  → secondary text      ink-800 → hairline border
//   ink-400  → muted text          ink-900 → raised surface (cards)
//   ink-500/600 → faint text       ink-950 → app background
const inkVar = (stop) => `rgb(var(--ink-${stop}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        ink: {
          50: inkVar(50),
          100: inkVar(100),
          200: inkVar(200),
          300: inkVar(300),
          400: inkVar(400),
          500: inkVar(500),
          600: inkVar(600),
          700: inkVar(700),
          800: inkVar(800),
          900: inkVar(900),
          950: inkVar(950),
        },
        // Semantic fills/lines for panels, chips and hairlines — theme-aware,
        // used in place of the old hardcoded white/x utilities.
        fill: {
          DEFAULT: 'rgb(var(--fill) / <alpha-value>)',
          strong: 'rgb(var(--fill-strong) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--line) / <alpha-value>)',
          strong: 'rgb(var(--line-strong) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1rem', // 16px — the spec's card radius
        '3xl': '1.5rem',
      },
      boxShadow: {
        // Soft, layered shadows — flip via CSS vars so light mode gets real depth
        // and dark mode stays subtle (Linear-style).
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
        glow: 'var(--shadow-glow)',
      },
      keyframes: {
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
      },
    },
  },
  plugins: [],
}
