import { useState } from "react";
import "./SignUp.css";

function SignUp({ onSwitchToSignIn }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    bloodType: "",
    allergies: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [zipStatus, setZipStatus] = useState({ loading: false, error: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleZipChange = async (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      zipCode: value,
      city: "",
      state: "",
    });

    if (errors.zipCode) {
      setErrors({ ...errors, zipCode: "" });
    }

    // Indian PIN code lookup (6 digits) via postalpincode.in
    if (/^\d{6}$/.test(value)) {
      setZipStatus({ loading: true, error: "" });
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data = await res.json();
        const first = data?.[0];
        const status = first?.Status;
        const office = first?.PostOffice?.[0];
        if (status !== "Success" || !office) {
          throw new Error("PIN not found");
        }
        setFormData((prev) => ({
          ...prev,
          city: office.District || office.Block || prev.city,
          state: office.State || prev.state,
        }));
        setZipStatus({ loading: false, error: "" });
      } catch (err) {
        setZipStatus({
          loading: false,
          error: "PIN lookup failed. Please fill city/state manually.",
        });
      }
    } else {
      setZipStatus({ loading: false, error: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 0 || age > 120) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid 6-digit PIN code";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = "Emergency contact name is required";
    }

    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = "Emergency contact phone is required";
    } else if (
      !/^[0-9]{10}$/.test(formData.emergencyContactPhone.replace(/\D/g, ""))
    ) {
      newErrors.emergencyContactPhone =
        "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Sign up:", formData);
      setIsSubmitting(false);
      // Handle successful signup here
      alert("Account created successfully!");
    }, 1000);
  };

  return (
    <div className="signup-container">
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

      {/* Glassmorphism Sign-Up Form */}
      <div className="signup-form-card">
        <div className="signup-header">
          <div className="logo-container">
            <svg
              className="logo-icon"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="30" fill="rgba(91, 163, 208, 0.15)" />
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
          <h1 className="signup-title">
            {currentStep === 1 ? "Personal Information" : "Medical Information"}
          </h1>
          <p className="signup-subtitle">
            {currentStep === 1
              ? "Step 1 of 2 - Tell us about yourself"
              : "Step 2 of 2 - Medical details"}
          </p>
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              <span>1</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              <span>2</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={currentStep === 1 ? handleNext : handleSubmit}
          className="signup-form"
        >
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-input ${errors.fullName ? "error" : ""}`}
              placeholder="Enter your full name"
              required
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? "error" : ""}`}
              placeholder="Enter phone number"
              required
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`form-input ${errors.dateOfBirth ? "error" : ""}`}
              required
            />
            {errors.dateOfBirth && (
              <span className="error-message">{errors.dateOfBirth}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`form-input ${errors.gender ? "error" : ""}`}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="address" className="form-label">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`form-input ${errors.address ? "error" : ""}`}
              placeholder="Enter your street address"
              required
            />
            {errors.address && (
              <span className="error-message">{errors.address}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`form-input ${errors.city ? "error" : ""}`}
              placeholder="Enter city"
              required
            />
            {errors.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`form-input ${errors.state ? "error" : ""}`}
              placeholder="Enter state"
              required
            />
            {errors.state && (
              <span className="error-message">{errors.state}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="zipCode" className="form-label">
              PIN Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleZipChange}
              className={`form-input ${errors.zipCode ? "error" : ""}`}
              placeholder="Enter zip code"
              required
            />
            {errors.zipCode && (
              <span className="error-message">{errors.zipCode}</span>
            )}
            {zipStatus.loading && (
              <span className="info-message">Looking up city/state...</span>
            )}
            {zipStatus.error && (
              <span className="error-message">{zipStatus.error}</span>
            )}
          </div>

          {currentStep === 1 ? (
            <>
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
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Create password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-with-toggle">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button type="submit" className="signup-button">
                Next: Medical Information
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="bloodType" className="form-label">
                  Blood Type <span className="optional">(Optional)</span>
                </label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="allergies" className="form-label">
                  Allergies/Medical Conditions{" "}
                  <span className="optional">(Optional)</span>
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="List any allergies or medical conditions"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContactName" className="form-label">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className={`form-input ${
                    errors.emergencyContactName ? "error" : ""
                  }`}
                  placeholder="Emergency contact name"
                  required
                />
                {errors.emergencyContactName && (
                  <span className="error-message">
                    {errors.emergencyContactName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContactPhone" className="form-label">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  className={`form-input ${
                    errors.emergencyContactPhone ? "error" : ""
                  }`}
                  placeholder="Emergency contact phone"
                  required
                />
                {errors.emergencyContactPhone && (
                  <span className="error-message">
                    {errors.emergencyContactPhone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="insuranceProvider" className="form-label">
                  Insurance Provider{" "}
                  <span className="optional">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Insurance company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="insurancePolicyNumber" className="form-label">
                  Policy Number <span className="optional">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="insurancePolicyNumber"
                  name="insurancePolicyNumber"
                  value={formData.insurancePolicyNumber}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Insurance policy number"
                />
              </div>

              <div className="form-options">
                <label className="terms-checkbox">
                  <input type="checkbox" required />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="terms-link">
                      Terms & Conditions
                    </a>
                  </span>
                </label>
              </div>

              <div className="button-group">
                <button
                  type="button"
                  onClick={handleBack}
                  className="back-button"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`signup-button ${
                    isSubmitting ? "submitting" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </>
          )}

          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="signin-link-button"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
