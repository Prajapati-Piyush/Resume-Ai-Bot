import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, KeyRound, Lock } from 'lucide-react'
import AuthShell from '../../components/layout/AuthShell'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import {
  collectErrors,
  passwordStrength,
  validateConfirm,
  validatePassword,
} from '../../lib/validation'
import { cn } from '../../lib/utils'

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const tokenFromUrl = searchParams.get('token') || ''

  const [form, setForm] = useState({
    token: tokenFromUrl,
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const strength = passwordStrength(form.password)

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (formError) setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const found = collectErrors({
      token: form.token.trim() ? null : 'Reset token is required.',
      password: validatePassword(form.password, { min: 6 }),
      confirmPassword: validateConfirm(form.password, form.confirmPassword),
    })

    if (Object.keys(found).length) {
      setErrors(found)
      return
    }

    setSubmitting(true)
    setFormError('')

    try {
      await resetPassword({ token: form.token.trim(), password: form.password })
      setDone(true)
      toast.success('Password updated — you can sign in now')
      setTimeout(() => navigate('/login', { replace: true }), 2500)
    } catch (err) {
      setFormError(err.message)
      toast.error(err.message, { title: 'Reset failed' })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <AuthShell eyebrow="All set" title="Password updated">
        <div className="flex flex-col items-center py-4 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm text-ink-300">
            Your password has been changed. Redirecting you to sign in…
          </p>
          <Button to="/login" className="mt-6" fullWidth>
            Go to sign in now
          </Button>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      eyebrow="New password"
      title="Reset your password"
      subtitle={
        tokenFromUrl
          ? 'Choose a new password for your account.'
          : 'Paste the reset token from your email, then choose a new password.'
      }
      footer={
        <Link to="/login" className="font-medium text-brand-400 transition hover:text-brand-300">
          Back to sign in
        </Link>
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
          label="Reset token"
          name="token"
          icon={KeyRound}
          placeholder="Paste your reset token"
          value={form.token}
          onChange={update('token')}
          error={errors.token}
          // locked when it arrived via the emailed link — nothing to edit
          disabled={submitting || Boolean(tokenFromUrl)}
          className="font-mono text-xs"
          hint={tokenFromUrl ? 'Loaded from your reset link.' : undefined}
        />

        <div>
          <Input
            label="New password"
            type="password"
            name="password"
            icon={Lock}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
            disabled={submitting}
          />

          {form.password && !errors.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-1 gap-1" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-colors',
                      i < strength.score ? strength.tone : 'bg-white/10',
                    )}
                  />
                ))}
              </div>
              <span className="w-20 text-right text-xs text-ink-500">{strength.label}</span>
            </div>
          )}
        </div>

        <Input
          label="Confirm new password"
          type="password"
          name="confirmPassword"
          icon={Lock}
          autoComplete="new-password"
          placeholder="Repeat your new password"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          error={errors.confirmPassword}
          disabled={submitting}
        />

        <Button type="submit" fullWidth size="lg" loading={submitting} className="mt-2">
          {submitting ? 'Updating…' : 'Reset password'}
        </Button>
      </form>
    </AuthShell>
  )
}
