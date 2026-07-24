import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Mail, Send } from 'lucide-react'
import AuthShell from '../../components/layout/AuthShell'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { validateEmail } from '../../lib/validation'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(null) // { message, resetToken? }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const invalid = validateEmail(email)
    if (invalid) {
      setError(invalid)
      return
    }

    setSubmitting(true)
    setFormError('')

    try {
      const data = await forgotPassword(email.trim())
      setSent(data)
      toast.success('Reset instructions sent')
    } catch (err) {
      setFormError(err.message)
      toast.error(err.message, { title: 'Request failed' })
    } finally {
      setSubmitting(false)
    }
  }

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(sent.resetToken)
      toast.success('Token copied to clipboard')
    } catch {
      toast.error('Could not copy — select and copy it manually.')
    }
  }

  if (sent) {
    return (
      <AuthShell
        eyebrow="Check your inbox"
        title="Reset link sent"
        subtitle={sent.message}
        footer={
          <Link to="/login" className="font-medium text-brand-400 transition hover:text-brand-300">
            Back to sign in
          </Link>
        }
      >
        {/* The API currently returns the raw token for dev/testing. Surface it so
            the flow is completable without an email service wired up. */}
        {sent.resetToken && (
          <div className="rounded-xl border border-amber-400/25 bg-amber-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Development mode
            </p>
            <p className="mt-1.5 text-sm text-ink-300">
              Email delivery is not configured, so the reset token is shown here:
            </p>

            <code className="mt-3 block break-all rounded-lg bg-ink-950/60 p-3 font-mono text-xs text-ink-200">
              {sent.resetToken}
            </code>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Button variant="secondary" size="sm" onClick={copyToken} className="flex-1">
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                Copy token
              </Button>
              <Button
                to={`/reset-password?token=${encodeURIComponent(sent.resetToken)}`}
                size="sm"
                className="flex-1"
              >
                Continue to reset
              </Button>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          fullWidth
          className="mt-4"
          onClick={() => {
            setSent(null)
            setEmail('')
          }}
        >
          Use a different email
        </Button>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      eyebrow="Password reset"
      title="Forgot your password?"
      subtitle="Enter the email on your account and we'll send a link to set a new password."
      footer={
        <>
          Remembered it?{' '}
          <Link to="/login" className="font-medium text-brand-400 transition hover:text-brand-300">
            Back to sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {formError && (
          <div
            role="alert"
            className="rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
          >
            {formError}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          icon={Mail}
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
            if (formError) setFormError('')
          }}
          error={error}
          disabled={submitting}
        />

        <Button type="submit" fullWidth size="lg" loading={submitting}>
          {!submitting && <Send className="h-4 w-4" aria-hidden="true" />}
          {submitting ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>
    </AuthShell>
  )
}
