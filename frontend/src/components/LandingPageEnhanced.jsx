import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService, { departments } from "../services/hospitalService";
import "../styles/LandingPageEnhanced.css";

const LandingPageEnhanced = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchDepartment, searchDoctor]);

  const loadData = async () => {
    try {
      const doctorsData = await hospitalService.getDoctors();
      const analyticsData = await hospitalService.getAnalytics();
      setDoctors(doctorsData);
      setStats(analyticsData);
      setFilteredDoctors(doctorsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    if (searchDepartment) {
      filtered = filtered.filter((doc) =>
        doc.department.toLowerCase().includes(searchDepartment.toLowerCase())
      );
    }

    if (searchDoctor) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchDoctor.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  return (
    <div className="landing-page-enhanced">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-animation">
          <div className="hospital-icon">🏥</div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Smart Hospital Scheduling</h1>
          <h2 className="hero-subtitle">For Better Patient Care</h2>
          <p className="hero-description">
            Experience seamless appointment booking with real-time doctor availability.
            Reduce waiting times and optimize healthcare delivery.
          </p>
          <div className="hero-cta">
            <button
              className="btn-primary"
              onClick={() => navigate("/signup")}
            >
              🚀 Book Appointment Now
            </button>
            <button
              className="btn-secondary"
              onClick={() => document.querySelector(".doctors-section").scrollIntoView({ behavior: "smooth" })}
            >
              👀 Browse Doctors
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Smart Scheduling</h3>
            <p>AI-powered appointment scheduling that prevents conflicts and optimizes doctor time.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👁️</div>
            <h3>Real-Time Availability</h3>
            <p>View live doctor availability and book your preferred time slot instantly.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Faster Patient Care</h3>
            <p>Reduce waiting times with automated scheduling and instant confirmations.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access our platform anytime, anywhere from your smartphone or computer.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Smart Notifications</h3>
            <p>Get reminders and updates for your appointments via email and SMS.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your medical information is encrypted and protected with bank-level security.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {stats && (
        <section className="statistics-section">
          <h2>Our Impact</h2>
          <div className="stats-counters">
            <div className="counter-card">
              <div className="counter-value">{stats.totalDoctors}+</div>
              <div className="counter-label">Expert Doctors</div>
            </div>

            <div className="counter-card">
              <div className="counter-value">{stats.totalPatients}+</div>
              <div className="counter-label">Happy Patients</div>
            </div>

            <div className="counter-card">
              <div className="counter-value">{stats.totalAppointments}+</div>
              <div className="counter-label">Successful Appointments</div>
            </div>

            <div className="counter-card">
              <div className="counter-value">4.8★</div>
              <div className="counter-label">Average Rating</div>
            </div>
          </div>
        </section>
      )}

      {/* Departments Section */}
      <section className="departments-section">
        <h2>Our Departments</h2>
        <div className="departments-grid">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="department-card"
              onClick={() => setSearchDepartment(dept.name)}
            >
              <div className="dept-icon">{dept.icon}</div>
              <h3>{dept.name}</h3>
              <p>{dept.doctors} Doctors</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <h2>Our Expert Doctors</h2>

        <div className="search-filters">
          <input
            type="text"
            placeholder="Search doctor name or specialization..."
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
            className="search-input"
          />

          <select
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
            className="department-filter"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="doctors-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card-enhanced">
                <div className="doctor-avatar-large">{doctor.image}</div>
                <div className="doctor-content">
                  <h3>{doctor.name}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="department">{doctor.department}</p>
                  <div className="doctor-info-badges">
                    <span className="badge">⭐ {doctor.rating}</span>
                    <span className="badge">👥 {doctor.totalPatients}</span>
                  </div>
                  <div className="working-hours">
                    <p>
                      <strong>Hours:</strong> {doctor.workingHours.start} - {doctor.workingHours.end}
                    </p>
                  </div>
                  <p className="bio">{doctor.bio}</p>
                  <div className="doctor-actions">
                    <button
                      className="btn-view-profile"
                      onClick={() => navigate(`/profile?doctor=${doctor.id}`)}
                    >
                      View Profile
                    </button>
                    <button
                      className="btn-book-now"
                      onClick={() => navigate("/signup")}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-doctors">
              <p>No doctors found. Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Patients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Booking an appointment was so easy! The platform is user-friendly and I got my appointment confirmed in minutes."
            </p>
            <div className="patient-info">
              <strong>Rajesh Kumar</strong>
              <span>Patient</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "The real-time availability feature helped me find the perfect time slot with Dr. Priya Sharma. Highly recommended!"
            </p>
            <div className="patient-info">
              <strong>Priya Singh</strong>
              <span>Patient</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "As a doctor, this platform has significantly reduced my scheduling conflicts. My patients are very satisfied too!"
            </p>
            <div className="patient-info">
              <strong>Dr. Vikram Patel</strong>
              <span>Doctor</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Experience Better Healthcare?</h2>
        <p>Join thousands of patients and doctors using our platform</p>
        <div className="cta-buttons">
          <button className="btn-get-started" onClick={() => navigate("/signup")}>
            Get Started Now
          </button>
          <button className="btn-learn-more" onClick={() => navigate("/home")}>
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPageEnhanced;
