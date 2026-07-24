import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, UserPlus, User as UserIcon } from 'lucide-react'
import AuthShell from '../../components/layout/AuthShell'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import {
  collectErrors,
  passwordStrength,
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
} from '../../lib/validation'
import { cn } from '../../lib/utils'

export default function Register() {
  const { register } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
      name: validateName(form.name),
      email: validateEmail(form.email),
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
      // register signs the user in (the API sets the session cookie), so go
      // straight to the dashboard rather than bouncing through /login.
      const user = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      })

      toast.success(`Account created — welcome${user?.name ? `, ${user.name}` : ''}!`)
      navigate('/app', { replace: true })
    } catch (err) {
      setFormError(err.message)
      toast.error(err.message, { title: 'Registration failed' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Free to start. Your first prep report takes about a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-400 transition hover:text-brand-300">
            Sign in
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
          label="Full name"
          name="name"
          icon={UserIcon}
          autoComplete="name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={update('name')}
          error={errors.name}
          disabled={submitting}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          icon={Mail}
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
          disabled={submitting}
        />

        <div>
          <Input
            label="Password"
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
          label="Confirm password"
          type="password"
          name="confirmPassword"
          icon={Lock}
          autoComplete="new-password"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          error={errors.confirmPassword}
          disabled={submitting}
        />

        <Button type="submit" fullWidth size="lg" loading={submitting} className="mt-2">
          {!submitting && <UserPlus className="h-4 w-4" aria-hidden="true" />}
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>

        <p className="text-center text-xs leading-relaxed text-ink-500">
          By creating an account you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  )
}
