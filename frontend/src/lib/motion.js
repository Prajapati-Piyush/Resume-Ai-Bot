/**
 * Shared Framer Motion variants. Keeping them in one place makes animation
 * feel consistent across the app and honours reduced-motion (Framer reads the
 * OS setting automatically via the `reducedMotion` config in MotionConfig).
 */

// Standard easing — matches the CSS cubic-bezier used elsewhere.
export const EASE = [0.16, 1, 0.3, 1]

// Page-level enter/exit for route transitions.
export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: EASE } },
}

// Container that staggers its children into view.
export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

// A single item within a staggered container (cards, list rows).
export const fadeUpItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
}

// Subtle press feedback for interactive cards.
export const tapScale = { scale: 0.985 }
export const hoverLift = { y: -3 }
