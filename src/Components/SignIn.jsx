import { useState } from "react";
import "./SignIn.css";

function SignIn({ onSwitchToSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log("Sign in:", formData);
  };

  return (
    <div className="signin-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
        <div className="particle particle1"></div>
        <div className="particle particle2"></div>
        <div className="particle particle3"></div>
        <div className="particle particle4"></div>
        <div className="particle particle5"></div>
      </div>

      {/* Glassmorphism Sign-In Form */}
      <div className="signin-form-wrapper">
        <div className="signin-form-card">
          <div className="signin-header">
            <div className="logo-container">
              <svg
                className="logo-icon"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="rgba(91, 163, 208, 0.15)"
                />
                {/* Medical Heart with Pulse */}
                <path
                  d="M32 20C28 16 22 18 22 24C22 28 26 34 32 40C38 34 42 28 42 24C42 18 36 16 32 20Z"
                  fill="#5BA3D0"
                  stroke="#4A90C7"
                  strokeWidth="1.5"
                />
                <path
                  d="M16 32L20 28L24 36L28 24L32 40L36 28L40 36L44 30L48 34"
                  stroke="#5BA3D0"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <h1 className="signin-title">Welcome Back</h1>
            <p className="signin-subtitle">Sign in to your medical account</p>
          </div>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email or Username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email or username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-with-toggle">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="signin-button">
              Sign In
            </button>

            <div className="signin-footer">
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignUp}
                  className="create-account-link"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
