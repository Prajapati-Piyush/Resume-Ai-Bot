import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants } from '../../lib/motion'

/**
 * Wraps routed content and replays an enter animation on each path change.
 * Keyed by pathname so React remounts and Framer re-runs `initial → animate`.
 * (No AnimatePresence exit here — the router swaps synchronously, and an exit
 * animation on unmount would fight the incoming route.)
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation()

  return (
    <motion.div
      key={pathname}
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  )
}
