import { motion } from 'framer-motion'
import { fadeUpItem, scaleIn, staggerContainer } from '../../lib/motion'

/**
 * Stagger — a container that reveals its children one after another as they
 * mount. Use with <StaggerItem> children. Renders a plain element so it can
 * carry layout classNames (grids, stacks).
 */
export function Stagger({ as = 'div', className, children, ...props }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      {...props}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({ as = 'div', className, children, ...props }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp className={className} variants={fadeUpItem} {...props}>
      {children}
    </Comp>
  )
}

/** One-shot reveal for a standalone block. */
export function Reveal({ as = 'div', className, children, ...props }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      variants={scaleIn}
      initial="initial"
      animate="animate"
      {...props}
    >
      {children}
    </Comp>
  )
}
