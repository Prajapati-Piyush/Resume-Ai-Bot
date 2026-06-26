import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

import "../auth.form.scss";

const Register = () => {
  const { handleRegister, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await handleRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful");
    } catch (error) {
      console.error(error);
      alert(error?.message || "Registration failed");
    }
  };

  return (
    <main className="auth-root">
      <div className="auth-bg" aria-hidden="true" />

      <section className="auth-shell" aria-label="Register form">
        <header className="auth-header">
          <div className="auth-kicker">Get started</div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Join us in minutes. No credit card required.
          </p>
        </header>

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-field">
            <label htmlFor="register-name" className="auth-label">
              Full name
            </label>
            <input
              id="register-name"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Jane Doe"
              required
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-email" className="auth-label">
              Email
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="name@company.com"
              required
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-password" className="auth-label">
              Password
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Create a password"
              required
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-confirm" className="auth-label">
              Confirm password
            </label>
            <input
              id="register-confirm"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Repeat your password"
              required
              className="auth-input"
            />
          </div>

          <button
            type="submit"
            className="auth-button auth-button--primary"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div
            className="auth-divider"
            role="separator"
            aria-label="Or sign up with"
          >
            <span>or sign up with</span>
          </div>

          <div className="auth-social">
            <button
              type="button"
              className="auth-socialBtn"
              aria-label="Continue with Google"
            >
              <span className="auth-socialIcon">G</span>
              Google
            </button>

            <button
              type="button"
              className="auth-socialBtn"
              aria-label="Continue with GitHub"
            >
              <span className="auth-socialIcon">⌁</span>
              GitHub
            </button>
          </div>

          <p className="auth-footnote">
            Already have an account?{" "}
            <Link className="auth-link auth-link--bold" to="/login">
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;