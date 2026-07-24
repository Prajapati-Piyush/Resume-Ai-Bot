import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import Spinner from './Spinner'

const VARIANTS = {
  primary:
    'bg-brand-600 text-white shadow-glow hover:bg-brand-500 active:bg-brand-700 border border-brand-400/30',
  secondary:
    'bg-white/[0.06] text-white border border-white/12 hover:bg-white/[0.1] backdrop-blur',
  ghost: 'text-ink-300 hover:text-white hover:bg-white/[0.06] border border-transparent',
  danger:
    'bg-rose-600/90 text-white border border-rose-400/30 hover:bg-rose-500 active:bg-rose-700',
  outline:
    'border border-white/15 text-white hover:border-brand-400/50 hover:bg-brand-500/10',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2 rounded-xl',
}

/**
 * One button for the whole app. Renders as <button>, <a> or react-router <Link>
 * depending on the props given, so callers never re-implement styling.
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    className,
    children,
    to,
    href,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading

  const classes = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'disabled:cursor-not-allowed disabled:opacity-55 select-none whitespace-nowrap',
    'active:scale-[0.98]',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  )

  const content = (
    <>
      {loading && <Spinner size={16} />}
      {children}
    </>
  )

  if (to && !isDisabled) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href && !isDisabled) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={props.type || 'button'}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </button>
  )
})

export default Button
