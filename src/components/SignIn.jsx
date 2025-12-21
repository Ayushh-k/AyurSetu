import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService from "../services/hospitalService";
import "../styles/SignIn.css";

function SignIn({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await hospitalService.login(email, password);
      
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userRole", response.role);
        localStorage.setItem("userName", response.name || response.email);
        
        setIsAuthenticated(true);
        
        // Redirect based on role
        if (response.role === 'doctor') {
          navigate("/doctor-dashboard");
        } else if (response.role === 'admin') {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-header">
          <h1>AyurSetu</h1>
          <p>Healthcare Management Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="signin-form">
          <h2>Sign In</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="form-input"
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn google">
              <span>🔵</span> Sign in with Google
            </button>
            <button type="button" className="social-btn microsoft">
              <span>🔷</span> Sign in with Microsoft
            </button>
          </div>
        </form>

        <div className="signin-footer">
          <p>Don't have an account? <a href="/signup" className="signup-link">Sign Up</a></p>
        </div>
      </div>

      <div className="signin-features">
        <div className="feature">
          <span className="feature-icon">✓</span>
          <p><strong>Easy Scheduling</strong><br/>Book appointments in seconds</p>
        </div>
        <div className="feature">
          <span className="feature-icon">✓</span>
          <p><strong>Real-time Availability</strong><br/>See doctor schedules instantly</p>
        </div>
        <div className="feature">
          <span className="feature-icon">✓</span>
          <p><strong>Smart Prescriptions</strong><br/>Manage your medications easily</p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;