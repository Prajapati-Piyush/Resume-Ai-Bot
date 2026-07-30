import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, LogIn, Mail } from 'lucide-react'
import AuthShell from '../../components/layout/AuthShell'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GoogleLoginButton from '../../components/auth/GoogleLoginButton'
import AuthDivider from '../../components/auth/AuthDivider'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { collectErrors, validateEmail, validatePassword } from '../../lib/validation'

export default function Login() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Surface Google OAuth failures redirected back as ?oauth=failed|error,
  // then strip the param so a refresh doesn't re-toast.
  useEffect(() => {
    const oauth = searchParams.get('oauth')
    if (!oauth) return
    toast.error(
      oauth === 'failed'
        ? 'Google sign-in was cancelled or denied.'
        : 'Google sign-in failed. Please try again.',
      { title: 'Sign in failed' },
    )
    searchParams.delete('oauth')
    setSearchParams(searchParams, { replace: true })
  }, [searchParams, setSearchParams, toast])

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    // clear the field error as soon as the user starts correcting it
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (formError) setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const found = collectErrors({
      email: validateEmail(form.email),
      password: validatePassword(form.password, { min: 1 }),
    })

    if (Object.keys(found).length) {
      setErrors(found)
      return
    }

    setSubmitting(true)
    setFormError('')

    try {
      const user = await login({
        email: form.email.trim(),
        password: form.password,
        rememberMe: form.rememberMe,
      })

      toast.success(`Welcome back${user?.name ? `, ${user.name}` : ''}!`)
      navigate(location.state?.from || '/app', { replace: true })
    } catch (err) {
      setFormError(err.message)
      toast.error(err.message, { title: 'Sign in failed' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to PrepPilot"
      subtitle="Pick up where you left off and keep preparing."
      footer={
        <>
          New here?{' '}
          <Link to="/register" className="font-medium text-brand-400 transition hover:text-brand-300">
            Create a free account
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
          value={form.email}
          onChange={update('email')}
          error={errors.email}
          disabled={submitting}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          icon={Lock}
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
          disabled={submitting}
        />

        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex cursor-pointer select-none items-center gap-2 text-sm text-ink-300">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={update('rememberMe')}
              disabled={submitting}
              className="h-4 w-4 rounded border-line-strong bg-fill-strong text-brand-500 focus:ring-brand-400"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-brand-400 transition hover:text-brand-300"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" loading={submitting} className="mt-2">
          {!submitting && <LogIn className="h-4 w-4" aria-hidden="true" />}
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>

        <AuthDivider />

        <GoogleLoginButton label="Continue with Google" disabled={submitting} />
      </form>
    </AuthShell>
  )
}
