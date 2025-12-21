import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService from "../services/hospitalService";
import "../styles/Dashboard.css";
import "../styles/DashboardFeatures.css";

const Dashboard = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [doctors, setDoctors] = useState([]);
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [myAppointments, setMyAppointments] = useState([]);
  const [ointments, setOintments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [appointmentSymptoms, setAppointmentSymptoms] = useState("");
  const [appointmentMedicalHistory, setAppointmentMedicalHistory] = useState("");
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [pendingAppointment, setPendingAppointment] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState({
    bloodPressure: "120/80",
    heartRate: "72",
    lastCheckup: "5 days ago"
  });
  const [medicalRecords, setMedicalRecords] = useState([
    { id: 1, name: "🩺 Blood Test Report", date: "Dec 10, 2024", type: "Blood Test" },
    { id: 2, name: "📸 X-Ray Report", date: "Dec 5, 2024", type: "X-Ray" },
    { id: 3, name: "💉 Vaccination Record", date: "Nov 28, 2024", type: "Vaccination" }
  ]);
  const [insuranceData, setInsuranceData] = useState({
    provider: "Aditya Birla Health Insurance",
    policyId: "ABH-2024-789456",
    balance: 500
  });

  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  // Filter doctors based on selected filter
  const filteredDoctors = doctors.filter(doctor => {
    if (doctorFilter === "all") return true;
    return doctor.department === doctorFilter || doctor.specialization === doctorFilter;
  });

  useEffect(() => {
    if (userRole !== 'patient' && userRole !== null) {
      navigate('/');
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const doctorsData = await hospitalService.getDoctors();
      setDoctors(doctorsData);

      if (userId) {
        const appointmentsData = await hospitalService.getAppointmentsByPatient(userId);
        setMyAppointments(appointmentsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime || !appointmentReason.trim()) {
      alert('Please fill in all required fields including the reason for visit');
      return;
    }
    
    // Set pending appointment and show payment modal
    const appointmentData = {
      patientId: userId,
      patientName: localStorage.getItem('userName'),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      department: selectedDoctor.department,
      date: appointmentDate,
      time: appointmentTime,
      reason: appointmentReason,
      symptoms: appointmentSymptoms,
      medicalHistory: appointmentMedicalHistory,
      fee: selectedDoctor.consultationFee || 500,
    };
    
    setPendingAppointment(appointmentData);
    setShowPayment(true);
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await hospitalService.cancelAppointment(appointmentId);
        // Remove the appointment from the list
        setMyAppointments(myAppointments.filter(apt => apt.id !== appointmentId));
        alert('Appointment deleted successfully');
      } catch (error) {
        alert('Failed to delete appointment: ' + error.message);
        console.error('Cancel error:', error);
      }
    }
  };

  const handleRescheduleClick = (appointment) => {
    setRescheduleAppointment(appointment);
    setAppointmentDate(appointment.date);
    setAppointmentTime(appointment.time);
    setShowReschedule(true);
  };

  const handleConfirmReschedule = async () => {
    if (!appointmentDate || !appointmentTime) {
      alert('Please fill in all fields');
      return;
    }
    try {
      // Create new appointment with new date/time
      const updatedAppointment = {
        ...rescheduleAppointment,
        date: appointmentDate,
        time: appointmentTime,
      };
      
      // Cancel old appointment
      await hospitalService.cancelAppointment(rescheduleAppointment.id);
      
      // Create new appointment
      await hospitalService.bookAppointment({
        patientId: rescheduleAppointment.patientId,
        patientName: rescheduleAppointment.patientName,
        doctorId: rescheduleAppointment.doctorId,
        doctorName: rescheduleAppointment.doctorName,
        department: rescheduleAppointment.department,
        date: appointmentDate,
        time: appointmentTime,
        reason: rescheduleAppointment.reason,
      });
      
      alert('Appointment rescheduled successfully');
      setShowReschedule(false);
      setRescheduleAppointment(null);
      setAppointmentDate("");
      setAppointmentTime("");
      loadData();
    } catch (error) {
      alert('Failed to reschedule appointment: ' + error.message);
      console.error('Reschedule error:', error);
    }
  };

  const handleEmergency = () => {
    setShowEmergencyModal(true);
  };

  const handleConsultOnline = () => {
    alert('Online consultation feature coming soon! For now, book an appointment with your preferred doctor.');
    setActiveTab("doctors");
  };

  const handleViewReports = () => {
    setShowReportModal(true);
  };

  const handleRefillMedicine = () => {
    setShowMedicineModal(true);
  };

  const handleInsuranceBilling = () => {
    setShowInsuranceModal(true);
  };

  const handleDownloadReport = (report) => {
    alert(`Downloading ${report.type} report from ${report.date}`);
  };

  const handlePaymentComplete = async (paymentMethod, transactionId) => {
    try {
      // Book appointment after payment is confirmed
      await hospitalService.bookAppointment({
        ...pendingAppointment,
        paymentStatus: 'Completed',
        paymentMethod: paymentMethod,
        transactionId: transactionId,
      });
      
      alert(`Appointment booked successfully! Payment confirmed via ${paymentMethod}`);
      setShowPayment(false);
      setPendingAppointment(null);
      setSelectedDoctor(null);
      setAppointmentDate("");
      setAppointmentTime("");
      loadData();
    } catch (error) {
      alert('Failed to complete booking: ' + error.message);
      console.error('Payment booking error:', error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome Back, Patient! 👋</h1>
          <p>Manage your healthcare appointments and prescriptions</p>
          <div className="header-nav-buttons">
            <button onClick={() => navigate("/profile")} className="header-btn primary">
              👤 View Profile
            </button>
            <button onClick={() => navigate("/schedule")} className="header-btn secondary">
              📋 My Schedule
            </button>
            <button onClick={() => navigate("/home")} className="header-btn tertiary">
              📄 Services
            </button>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-icon">📅</span>
            <div className="stat-text">
              <p className="stat-label">Upcoming</p>
              <p className="stat-value">{myAppointments.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <div className="stat-text">
              <p className="stat-label">Top Rated</p>
              <p className="stat-value">4.8</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💳</span>
            <div className="stat-text">
              <p className="stat-label">Total Spent</p>
              <p className="stat-value">₹2,400</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button
          className={`nav-btn ${activeTab === "doctors" ? "active" : ""}`}
          onClick={() => setActiveTab("doctors")}
        >
          👨‍⚕️ Find Doctors
        </button>
        <button
          className={`nav-btn ${activeTab === "appointments" ? "active" : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          📋 My Appointments
        </button>
        <button
          className={`nav-btn ${activeTab === "ointments" ? "active" : ""}`}
          onClick={() => setActiveTab("ointments")}
        >
          🧴 Medications
        </button>
        <button
          className={`nav-btn ${activeTab === "prescriptions" ? "active" : ""}`}
          onClick={() => setActiveTab("prescriptions")}
        >
          📝 Prescriptions
        </button>
      </div>

      {/* Content Area */}
      <div className="dashboard-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="tab-content">
            <h2>Dashboard Overview</h2>
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Your Health Status</h3>
                <div className="health-metrics">
                  <div className="metric">
                    <span>Blood Pressure</span>
                    <p>120/80 mmHg <span className="status-good">Normal</span></p>
                  </div>
                  <div className="metric">
                    <span>Heart Rate</span>
                    <p>72 bpm <span className="status-good">Normal</span></p>
                  </div>
                  <div className="metric">
                    <span>Last Checkup</span>
                    <p>5 days ago</p>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="quick-action-btn" onClick={handleEmergency}>
                    <span>📞</span> Emergency
                  </button>
                  <button className="quick-action-btn" onClick={handleConsultOnline}>
                    <span>💬</span> Consult Online
                  </button>
                  <button className="quick-action-btn" onClick={handleViewReports}>
                    <span>📊</span> View Reports
                  </button>
                  <button className="quick-action-btn" onClick={handleRefillMedicine}>
                    <span>💊</span> Refill Medicine
                  </button>
                </div>
              </div>

              <div className="overview-card">
                <h3>Medical Records</h3>
                <div className="records-list">
                  <div className="record-item">
                    <span>🩺 Blood Test Report</span>
                    <p>Dec 10, 2024</p>
                  </div>
                  <div className="record-item">
                    <span>📸 X-Ray Report</span>
                    <p>Dec 5, 2024</p>
                  </div>
                  <div className="record-item">
                    <span>💉 Vaccination Record</span>
                    <p>Nov 28, 2024</p>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>Insurance & Billing</h3>
                <div className="billing-info">
                  <div className="billing-item">
                    <span>Insurance Provider</span>
                    <p>{insuranceData.provider}</p>
                  </div>
                  <div className="billing-item">
                    <span>Policy ID</span>
                    <p>{insuranceData.policyId}</p>
                  </div>
                  <div className="billing-item">
                    <span>Outstanding Balance</span>
                    <p>₹{insuranceData.balance}</p>
                  </div>
                  <button className="view-details-btn" onClick={handleInsuranceBilling}>
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === "doctors" && (
          <div className="tab-content">
            <h2>Find & Book Doctors</h2>
            <div className="filter-section">
              <div className="filter-group">
                <label>Filter by Specialty:</label>
                <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)}>
                  <option value="all">All Specialists</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="General Practice">General Practice</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>
              <div className="search-box">
                <input type="text" placeholder="Search doctors..." />
              </div>
            </div>

            <div className="doctors-grid">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-header">
                    <div className="doctor-avatar">{doctor.name.charAt(0)}</div>
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p className="specialty">{doctor.specialization || doctor.department}</p>
                    </div>
                    <div className={`availability-badge ${doctor.status === "Available" ? "available" : "busy"}`}>
                      {doctor.status || "Available"}
                    </div>
                  </div>

                  <div className="doctor-details">
                    <div className="detail-item">
                      <span>⭐ Rating</span>
                      <p>{doctor.rating || 4.5}/5</p>
                    </div>
                    <div className="detail-item">
                      <span>📚 Department</span>
                      <p>{doctor.department}</p>
                    </div>
                    <div className="detail-item">
                      <span>💰 Fee</span>
                      <p>₹{doctor.consultationFee || 500}</p>
                    </div>
                    <div className="detail-item">
                      <span>⏰ Hours</span>
                      <p>{doctor.workingHours?.start || '09:00'} - {doctor.workingHours?.end || '17:00'}</p>
                    </div>
                  </div>

                  <button 
                    className="book-btn"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="tab-content">
            <h2>My Appointments</h2>
            <div className="appointments-list">
              {myAppointments.length === 0 ? (
                <div className="empty-state">
                  <p>No appointments scheduled yet</p>
                  <button className="btn-book" onClick={() => setActiveTab("doctors")}>Book an Appointment</button>
                </div>
              ) : (
                myAppointments.map(appointment => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-status">
                      <span className={`status-badge ${appointment.status?.toLowerCase()}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="appointment-details">
                      <h3>{appointment.doctorName}</h3>
                      <p className="specialty">{appointment.department}</p>
                      <div className="appointment-info">
                        <span>📅 {appointment.date}</span>
                        <span>⏰ {appointment.time}</span>
                        <span>📍 Reason: {appointment.reason || 'Consultation'}</span>
                      </div>
                    </div>
                    <div className="appointment-actions">
                      <button 
                        className="action-btn reschedule"
                        onClick={() => handleRescheduleClick(appointment)}
                      >
                        Reschedule
                      </button>
                      <button 
                        className="action-btn cancel"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Medications Tab */}
        {activeTab === "ointments" && (
          <div className="tab-content">
            <h2>Available Medications & Ointments</h2>
            <div className="ointments-grid">
              {ointments.map(ointment => (
                <div key={ointment.id} className="ointment-card">
                  <div className="ointment-icon">🧴</div>
                  <h3>{ointment.name}</h3>
                  <div className="ointment-info">
                    <p><strong>Category:</strong> {ointment.category}</p>
                    <p><strong>Stock:</strong> <span className={ointment.stock > 30 ? "stock-high" : "stock-low"}>{ointment.stock} units</span></p>
                    <p><strong>Price:</strong> ₹{ointment.price}</p>
                  </div>
                  <div className="ointment-actions">
                    <button className="ointment-btn add">Add to Cart</button>
                    <button className="ointment-btn request">Request Prescription</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === "prescriptions" && (
          <div className="tab-content">
            <h2>My Prescriptions</h2>
            <div className="prescriptions-list">
              <div className="prescription-card">
                <div className="prescription-header">
                  <h3>Cardiology Medications</h3>
                  <span className="date">Prescribed: Dec 10, 2024</span>
                </div>
                <div className="prescription-items">
                  <div className="prescription-item">
                    <span>Atenolol</span>
                    <p>50mg, Twice daily for 30 days</p>
                  </div>
                  <div className="prescription-item">
                    <span>Lisinopril</span>
                    <p>10mg, Once daily for 30 days</p>
                  </div>
                </div>
                <div className="prescription-actions">
                  <button className="rx-btn refill">Refill</button>
                  <button className="rx-btn download">Download</button>
                </div>
              </div>

              <div className="prescription-card">
                <div className="prescription-header">
                  <h3>General Health</h3>
                  <span className="date">Prescribed: Dec 5, 2024</span>
                </div>
                <div className="prescription-items">
                  <div className="prescription-item">
                    <span>Vitamin D3</span>
                    <p>1000 IU, Once daily</p>
                  </div>
                  <div className="prescription-item">
                    <span>B-Complex</span>
                    <p>Once daily for 60 days</p>
                  </div>
                </div>
                <div className="prescription-actions">
                  <button className="rx-btn refill">Refill</button>
                  <button className="rx-btn download">Download</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedDoctor(null)}>✕</button>
            <h2>Book Appointment</h2>
            <div className="modal-doctor-info">
              <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
              <p><strong>Specialty:</strong> {selectedDoctor.specialization || selectedDoctor.department}</p>
              <p><strong>Consultation Fee:</strong> ₹{selectedDoctor.consultationFee || 500}</p>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label>Select Date: <span className="required">*</span></label>
                <input 
                  type="date" 
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Select Time: <span className="required">*</span></label>
                <input 
                  type="time" 
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Reason for Visit: <span className="required">*</span></label>
                <select 
                  value={appointmentReason}
                  onChange={(e) => setAppointmentReason(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a reason...</option>
                  <option value="General Checkup">General Checkup</option>
                  <option value="Follow-up Consultation">Follow-up Consultation</option>
                  <option value="Symptoms/Pain">Symptoms/Pain</option>
                  <option value="Prescription Renewal">Prescription Renewal</option>
                  <option value="Lab Test Review">Lab Test Review</option>
                  <option value="Preventive Care">Preventive Care</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Current Symptoms:</label>
                <textarea 
                  value={appointmentSymptoms}
                  onChange={(e) => setAppointmentSymptoms(e.target.value)}
                  placeholder="Describe any symptoms or discomfort you're experiencing..."
                  rows="3"
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label>Medical History (if any):</label>
                <textarea 
                  value={appointmentMedicalHistory}
                  onChange={(e) => setAppointmentMedicalHistory(e.target.value)}
                  placeholder="Any previous medical conditions, allergies, or medications you're currently taking..."
                  rows="3"
                  className="form-textarea"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => {
                setSelectedDoctor(null);
                setAppointmentDate("");
                setAppointmentTime("");
                setAppointmentReason("");
                setAppointmentSymptoms("");
                setAppointmentMedicalHistory("");
              }}>Cancel</button>
              <button 
                className="btn-confirm"
                onClick={handleConfirmBooking}
                disabled={!appointmentDate || !appointmentTime || !appointmentReason}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && pendingAppointment && (
        <div className="modal-overlay">
          <div className="modal-content payment-modal">
            <button className="close-modal" onClick={() => { setShowPayment(false); setPendingAppointment(null); }}>✕</button>
            <h2>💳 Complete Payment</h2>
            <div className="payment-summary">
              <div className="summary-item">
                <span>Doctor:</span>
                <strong>{pendingAppointment.doctorName}</strong>
              </div>
              <div className="summary-item">
                <span>Department:</span>
                <strong>{pendingAppointment.department}</strong>
              </div>
              <div className="summary-item">
                <span>Date & Time:</span>
                <strong>{pendingAppointment.date} at {pendingAppointment.time}</strong>
              </div>
              <div className="summary-item">
                <span>Reason:</span>
                <strong>{pendingAppointment.reason}</strong>
              </div>
              {pendingAppointment.symptoms && (
                <div className="summary-item">
                  <span>Symptoms:</span>
                  <strong>{pendingAppointment.symptoms.substring(0, 50)}...</strong>
                </div>
              )}
              <div className="summary-item total">
                <span>Consultation Fee:</span>
                <strong>₹{pendingAppointment.fee}</strong>
              </div>
            </div>

            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              
              <div className="payment-option">
                <button 
                  className="payment-btn card-payment"
                  onClick={() => handlePaymentComplete('Credit/Debit Card', 'TXN-' + Date.now())}
                >
                  <span className="payment-icon">💳</span>
                  <span className="payment-label">Credit/Debit Card</span>
                </button>
              </div>

              <div className="payment-option">
                <button 
                  className="payment-btn upi-payment"
                  onClick={() => handlePaymentComplete('UPI', 'UPI-' + Date.now())}
                >
                  <span className="payment-icon">📱</span>
                  <span className="payment-label">UPI</span>
                </button>
              </div>

              <div className="payment-option">
                <button 
                  className="payment-btn wallet-payment"
                  onClick={() => handlePaymentComplete('Digital Wallet', 'WAL-' + Date.now())}
                >
                  <span className="payment-icon">🏦</span>
                  <span className="payment-label">Digital Wallet</span>
                </button>
              </div>

              <div className="payment-option">
                <button 
                  className="payment-btn bank-payment"
                  onClick={() => handlePaymentComplete('Bank Transfer', 'BANK-' + Date.now())}
                >
                  <span className="payment-icon">🏛️</span>
                  <span className="payment-label">Bank Transfer</span>
                </button>
              </div>

              <div className="payment-option">
                <button 
                  className="payment-btn cod-payment"
                  onClick={() => handlePaymentComplete('Pay at Counter', 'COD-' + Date.now())}
                >
                  <span className="payment-icon">💰</span>
                  <span className="payment-label">Pay at Counter</span>
                </button>
              </div>
            </div>

            <div className="payment-terms">
              <label>
                <input type="checkbox" required />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-cancel" 
                onClick={() => { setShowPayment(false); setPendingAppointment(null); }}
              >
                Cancel Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showReschedule && rescheduleAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => { setShowReschedule(false); setRescheduleAppointment(null); }}>✕</button>
            <h2>📅 Reschedule Appointment</h2>
            <div className="modal-doctor-info">
              <p><strong>Doctor:</strong> {rescheduleAppointment.doctorName}</p>
              <p><strong>Current Date & Time:</strong> {rescheduleAppointment.date} at {rescheduleAppointment.time}</p>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label>Select New Date:</label>
                <input 
                  type="date" 
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Select New Time:</label>
                <input 
                  type="time" 
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-cancel" 
                onClick={() => { setShowReschedule(false); setRescheduleAppointment(null); }}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm"
                onClick={handleConfirmReschedule}
                disabled={!appointmentDate || !appointmentTime}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowEmergencyModal(false)}>✕</button>
            <h2>🚨 Emergency Services</h2>
            <div className="modal-form">
              <div className="emergency-contacts">
                <div className="emergency-card">
                  <h3>Ambulance</h3>
                  <p className="emergency-number">📞 102 / 1298</p>
                  <p>24/7 Ambulance Service</p>
                </div>
                <div className="emergency-card">
                  <h3>Emergency Helpline</h3>
                  <p className="emergency-number">📞 +91-1234-567890</p>
                  <p>Speak to our medical team immediately</p>
                </div>
                <div className="emergency-card">
                  <h3>Hospital Emergency</h3>
                  <p className="emergency-number">📞 +91-9876-543210</p>
                  <p>Direct hospital emergency department</p>
                </div>
                <div className="emergency-card">
                  <h3>Poison Control</h3>
                  <p className="emergency-number">📞 1800-112-150</p>
                  <p>24/7 Poison Control Helpline</p>
                </div>
              </div>
              <button 
                className="btn-confirm emergency-btn"
                onClick={() => {
                  alert('Emergency services contacted. Help is on the way!');
                  setShowEmergencyModal(false);
                }}
              >
                ✓ Acknowledge Emergency Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medical Reports Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowReportModal(false)}>✕</button>
            <h2>📋 Medical Records & Reports</h2>
            <div className="modal-form">
              <div className="records-grid">
                {medicalRecords.map(record => (
                  <div key={record.id} className="report-card">
                    <h4>{record.name}</h4>
                    <p className="report-date">{record.date}</p>
                    <div className="report-actions">
                      <button 
                        className="btn-small"
                        onClick={() => handleDownloadReport(record)}
                      >
                        📥 Download
                      </button>
                      <button 
                        className="btn-small"
                        onClick={() => alert(`Viewing ${record.type} report`)}
                      >
                        👁️ View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-confirm" style={{marginTop: '20px'}} onClick={() => setShowReportModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medicine Refill Modal */}
      {showMedicineModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowMedicineModal(false)}>✕</button>
            <h2>💊 Refill Medicines</h2>
            <div className="modal-form">
              <div className="medicines-list">
                <div className="medicine-item">
                  <div className="medicine-info">
                    <h4>Aspirin 500mg</h4>
                    <p>Prescribed: Nov 15, 2024</p>
                    <p className="medicine-dosage">Dosage: 1 tablet twice daily</p>
                  </div>
                  <button className="btn-small refill-btn" onClick={() => alert('Medicine refill requested. You will receive it within 2 hours.')}>
                    🔄 Refill
                  </button>
                </div>
                <div className="medicine-item">
                  <div className="medicine-info">
                    <h4>Vitamin D3 1000 IU</h4>
                    <p>Prescribed: Oct 22, 2024</p>
                    <p className="medicine-dosage">Dosage: 1 capsule daily</p>
                  </div>
                  <button className="btn-small refill-btn" onClick={() => alert('Medicine refill requested. You will receive it within 2 hours.')}>
                    🔄 Refill
                  </button>
                </div>
                <div className="medicine-item">
                  <div className="medicine-info">
                    <h4>Metformin 500mg</h4>
                    <p>Prescribed: Sep 30, 2024</p>
                    <p className="medicine-dosage">Dosage: 1 tablet thrice daily</p>
                  </div>
                  <button className="btn-small refill-btn" onClick={() => alert('Medicine refill requested. You will receive it within 2 hours.')}>
                    🔄 Refill
                  </button>
                </div>
              </div>
              <button className="btn-confirm" style={{marginTop: '20px'}} onClick={() => setShowMedicineModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insurance & Billing Modal */}
      {showInsuranceModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowInsuranceModal(false)}>✕</button>
            <h2>💳 Insurance & Billing Details</h2>
            <div className="modal-form">
              <div className="billing-details">
                <div className="detail-card">
                  <h4>Insurance Information</h4>
                  <div className="detail-item">
                    <span>Provider:</span>
                    <p>{insuranceData.provider}</p>
                  </div>
                  <div className="detail-item">
                    <span>Policy ID:</span>
                    <p>{insuranceData.policyId}</p>
                  </div>
                  <div className="detail-item">
                    <span>Coverage:</span>
                    <p>₹10,00,000</p>
                  </div>
                  <div className="detail-item">
                    <span>Network Status:</span>
                    <p className="status-active">🟢 Active</p>
                  </div>
                </div>

                <div className="detail-card">
                  <h4>Billing History</h4>
                  <div className="billing-history">
                    <div className="history-item">
                      <div>
                        <p><strong>Appointment - Dec 10, 2024</strong></p>
                        <p>Dr. Rajesh Kumar - Cardiology</p>
                      </div>
                      <p className="amount">₹500</p>
                    </div>
                    <div className="history-item">
                      <div>
                        <p><strong>Lab Test - Nov 28, 2024</strong></p>
                        <p>Blood Test & ECG</p>
                      </div>
                      <p className="amount">₹2,000</p>
                    </div>
                    <div className="history-item">
                      <div>
                        <p><strong>Appointment - Nov 15, 2024</strong></p>
                        <p>Dr. Priya Singh - General Practice</p>
                      </div>
                      <p className="amount">₹400</p>
                    </div>
                  </div>
                </div>

                <div className="detail-card outstanding">
                  <h4>Outstanding Balance</h4>
                  <div className="balance-info">
                    <p className="balance-amount">₹{insuranceData.balance}</p>
                    <p>Due Date: Dec 25, 2024</p>
                  </div>
                  <button className="btn-confirm" onClick={() => alert('Payment of ₹' + insuranceData.balance + ' processed successfully!')}>
                    💳 Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;