import { Link } from 'react-router';
import '../auth.form.scss';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Login = () => {

  const {loading, handleLogin } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit =async (e) => {
    e.preventDefault()
    handleLogin({email,password})
  }

  if(loading){
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    )
  }


  return (
    <main className="auth-root">
      <div className="auth-bg" aria-hidden="true" />

      <section className="auth-shell" aria-label="Login form">
        <header className="auth-header">
          <div className="auth-kicker">Welcome back</div>
          <h1 className="auth-title">Sign in to your account</h1>
          <p className="auth-subtitle">
            Use your email and password to continue.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="auth-form" method="post">
          <div className="auth-field">
            <label htmlFor="login-email" className="auth-label">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password" className="auth-label">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="auth-input"
            />
          </div>

          <div className="auth-row">
            <label className="auth-checkbox">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>

            <a className="auth-link" href="#">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-button auth-button--primary">
            Sign in
          </button>

          <div className="auth-divider" role="separator" aria-label="Or continue with">
            <span>or continue with</span>
          </div>

          <div className="auth-social">
            <button type="button" className="auth-socialBtn" aria-label="Continue with Google">
              <span className="auth-socialIcon" aria-hidden="true">G</span>
              Google
            </button>
            <button type="button" className="auth-socialBtn" aria-label="Continue with GitHub">
              <span className="auth-socialIcon" aria-hidden="true">⌁</span>
              GitHub
            </button>
          </div>

          <p className="auth-footnote">
            New here?{' '}
            <Link className="auth-link auth-link--bold" to="/register">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;

