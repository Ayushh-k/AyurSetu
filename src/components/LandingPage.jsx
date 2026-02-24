import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = ({ isAuthenticated }) => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  const handleLearnMore = () => {
    navigate("/home");
    window.scrollTo(0, 0);
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-content"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="highlight-text">AyurSetu</span> - Smart
              Healthcare Management
            </h1>
            <p className="hero-subtitle">
              Revolutionizing hospital operations with intelligent doctor
              scheduling
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleGetStarted}>
                Get Started
              </button>
              <button className="btn btn-secondary" onClick={handleLearnMore}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="icon">🏥</div>
              <p>Hospital Management</p>
            </div>
            <div className="floating-card card-2">
              <div className="icon">👨‍⚕️</div>
              <p>Doctor Scheduling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="container">
          <h2>The Challenge</h2>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">⏳</div>
              <h3>Long Waiting Times</h3>
              <p>
                Patients face extended wait periods due to inefficient
                scheduling and resource allocation.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">📋</div>
              <h3>Manual Management</h3>
              <p>
                Outdated systems lead to human errors and operational
                inefficiencies.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🔄</div>
              <h3>Resource Wastage</h3>
              <p>
                Poor allocation of medical resources and staff schedules impact
                hospital revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <h2>Our Solution</h2>
          <p className="solution-intro">
            AyurSetu provides an intelligent, seamless platform that transforms
            hospital management
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3>Real-Time Doctor Availability</h3>
              <p>
                Track doctor schedules in real-time with automated availability
                updates and instant notifications.
              </p>
              <div className="feature-icon">📅</div>
            </div>
            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>Smart Appointment Scheduling</h3>
              <p>
                AI-powered appointment system that minimizes patient wait times
                and optimizes doctor utilization.
              </p>
              <div className="feature-icon">🔔</div>
            </div>
            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>Instant Confirmation</h3>
              <p>
                Automated booking confirmations with SMS and email notifications
                for enhanced patient experience.
              </p>
              <div className="feature-icon">✅</div>
            </div>
            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3>Analytics Dashboard</h3>
              <p>
                Comprehensive analytics and reporting for hospital
                administrators to make data-driven decisions.
              </p>
              <div className="feature-icon">📊</div>
            </div>
            <div className="feature-card">
              <div className="feature-number">05</div>
              <h3>Patient Portal</h3>
              <p>
                User-friendly interface for patients to book appointments, track
                prescriptions, and manage health records.
              </p>
              <div className="feature-icon">👥</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-works-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-circle">1</div>
              <h3>Sign Up</h3>
              <p>
                Create your hospital or patient account with secure
                authentication
              </p>
            </div>
            <div className="step-connector"></div>
            <div className="step-item">
              <div className="step-circle">2</div>
              <h3>Browse Doctors</h3>
              <p>
                View available doctors and their real-time availability
                schedules
              </p>
            </div>
            <div className="step-connector"></div>
            <div className="step-item">
              <div className="step-circle">3</div>
              <h3>Book Appointment</h3>
              <p>Select preferred time slot and get instant confirmation</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-item">
              <div className="step-circle">4</div>
              <h3>Get Treatment</h3>
              <p>Visit on scheduled date and receive quality healthcare</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2>Why Choose AyurSetu?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h4>⚡ Fast & Efficient</h4>
              <p>Reduce patient waiting time by up to 60%</p>
            </div>
            <div className="benefit-item">
              <h4>🔒 Secure</h4>
              <p>HIPAA-compliant with end-to-end encryption</p>
            </div>
            <div className="benefit-item">
              <h4>💰 Cost-Effective</h4>
              <p>Minimize operational costs through automation</p>
            </div>
            <div className="benefit-item">
              <h4>📱 Mobile-First</h4>
              <p>Access from any device, anytime, anywhere</p>
            </div>
            <div className="benefit-item">
              <h4>🎯 Accurate</h4>
              <p>AI-powered recommendations for optimal scheduling</p>
            </div>
            <div className="benefit-item">
              <h4>🌍 Scalable</h4>
              <p>Supports small clinics to large hospital networks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Hospitals Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>
                "AyurSetu reduced our patient wait time significantly. A
                game-changer for our operations!"
              </p>
              <h4>Ayush kamboj</h4>
              <p className="hospital-name">City General Hospital</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>
                "Outstanding platform! Our staff efficiency improved by 45%
                after implementation."
              </p>
              <h4>Harsh kumar</h4>
              <p className="hospital-name">Apollo Health Center</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>
                "The scheduling system is intuitive and the customer support is
                exceptional."
              </p>
              <h4>Abhishek kumar</h4>
              <p className="hospital-name">CarePlus Medical Institute</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Ready to Transform Your Hospital?</h2>
          <p>Join hundreds of hospitals already using AyurSetu</p>
          <button
            className="btn btn-primary btn-large"
            onClick={handleGetStarted}
          >
            {isAuthenticated
              ? "Go to Dashboard"
              : "Start Your Free Trial Today"}
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <h3 className="stat-number">500+</h3>
            <p>Hospitals Using AyurSetu</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">2M+</h3>
            <p>Appointments Scheduled</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">98%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">24/7</h3>
            <p>Customer Support</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="container">
          <div className="newsletter-box">
            <h3>Stay Updated</h3>
            <p>
              Subscribe to get updates on new features and healthcare insights
            </p>
            <div className="newsletter-input">
              <input type="email" placeholder="Enter your email" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
