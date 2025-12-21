import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService from "../services/hospitalService";
import "../styles/SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient", // doctor or patient
    specialization: "",
    department: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordStrength(getPasswordStrength(value));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting registration:', {
        email: formData.email,
        name: formData.username,
        role: formData.role,
        specialization: formData.specialization,
        department: formData.department
      });

      const response = await hospitalService.register(
        formData.email,
        formData.password,
        formData.username,
        formData.role,
        formData.role === 'doctor' ? formData.specialization : undefined,
        formData.role === 'doctor' ? formData.department : undefined,
        formData.role === 'patient' ? formData.phone : undefined,
        formData.role === 'patient' ? formData.age : undefined,
        formData.role === 'patient' ? formData.gender : undefined,
        formData.role === 'patient' ? formData.address : undefined
      );

      console.log('Registration response:', response);

      // Store user info
      if (response && response.id && response.token) {
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userRole", response.role);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.name || response.email);

        setSuccessMessage(`Welcome ${response.name || response.email}! Account created as ${response.role}`);
        setTimeout(() => {
        
        // Redirect to appropriate dashboard
        if (response.role === 'doctor') {
          navigate("/doctor-dashboard");
        } else if (response.role === 'patient') {
          navigate("/dashboard");
        } else {
          navigate("/signin");
        }
        }, 2000);
      } else {
        throw new Error('Invalid response from server: ' + JSON.stringify(response));
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.message || 'Unknown error occurred';
      setErrors({ form: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return { text: "Weak", class: "weak" };
    if (passwordStrength === 1) return { text: "Fair", class: "fair" };
    if (passwordStrength === 2) return { text: "Good", class: "good" };
    if (passwordStrength === 3) return { text: "Strong", class: "strong" };
    return { text: "Very Strong", class: "very-strong" };
  };

  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="signup-header">
            <div className="header-icon">👥</div>
            <h1>Create Account</h1>
            <p>Join AyurSetu Bridge to wellness</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {successMessage && (
              <div className="success-message" style={{marginBottom: '15px', padding: '10px', backgroundColor: '#e8f5e9', borderLeft: '4px solid #51cf66'}}>
                ✅ {successMessage}
              </div>
            )}
            {errors.form && (
              <div className="error-message" style={{marginBottom: '15px', padding: '10px', backgroundColor: '#ffebee', borderLeft: '4px solid #ff6b6b'}}>
                ❌ {errors.form}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="role">Account Type</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="username">Full Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Your full name"
                value={formData.username}
                onChange={handleChange}
                required
                className={errors.username ? "form-input error" : "form-input"}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={errors.email ? "form-input error" : "form-input"}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {formData.role === 'doctor' && (
              <>
                <div className="form-group">
                  <label htmlFor="specialization">Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    placeholder="e.g., Cardiology, Neurology"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="e.g., Cardiology Department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {formData.role === 'patient' && (
              <>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Your residential address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="form-textarea"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={errors.password ? "form-input error" : "form-input"}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide" : "Show"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`strength-bar ${i < passwordStrength ? getStrengthLabel().class : ""}`}
                      ></div>
                    ))}
                  </div>
                  <span className={`strength-label ${getStrengthLabel().class}`}>
                    {getStrengthLabel().text}
                  </span>
                </div>
              )}
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={errors.confirmPassword ? "form-input error" : "form-input"}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  title={showConfirmPassword ? "Hide" : "Show"}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#terms">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span>✨</span> Create My Account
                </>
              )}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <a href="/signin" className="signin-link">Sign In</a></p>
          </div>
        </div>

        <div className="signup-benefits">
          <h3>Why Join AyurSetu?</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">🏥</span>
              <p>Access Best Doctors</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📅</span>
              <p>Easy Scheduling</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💊</span>
              <p>Medicine Management</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔒</span>
              <p>Secure & Private</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;