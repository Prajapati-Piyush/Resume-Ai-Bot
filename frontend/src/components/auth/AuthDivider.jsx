/** "or" separator used between the credential form and social sign-in. */
export default function AuthDivider({ label = 'or' }) {
  return (
    <div className="flex items-center gap-3" role="separator" aria-label={label}>
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs font-medium uppercase tracking-wider text-ink-500">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
