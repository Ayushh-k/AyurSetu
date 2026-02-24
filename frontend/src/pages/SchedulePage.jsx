import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService from "../services/hospitalService";
import "../styles/SchedulePage.css";

function SchedulePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookappointment");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const doctorList = await hospitalService.getDoctors();
      setDoctors(doctorList || []);
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSlots = async () => {
    if (!selectedDoctor || !appointmentDate) {
      alert("Please select a doctor and date");
      return;
    }
    try {
      const slots = await hospitalService.getAvailableSlots(selectedDoctor.id, appointmentDate);
      setAvailableSlots(slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
    }
  };

  const handleSelectSlot = (slot) => {
    setAppointmentTime(slot.time);
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      alert("Please complete all selections");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSubmit = async () => {
    try {
      const appointmentData = {
        patientId: userId,
        patientName: userName,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        department: selectedDoctor.department,
        date: appointmentDate,
        time: appointmentTime,
        reason: reason || "Consultation",
      };
      
      await hospitalService.bookAppointment(appointmentData);
      alert("Appointment booked successfully! Payment processed via " + paymentMethod);
      setShowPayment(false);
      setSelectedDoctor(null);
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");
      navigate("/dashboard");
    } catch (error) {
      alert("Error booking appointment: " + error.message);
    }
  };

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <h1>📋 Schedule Your Appointment</h1>
        <p>Book doctor appointments and manage your schedule</p>
        <div className="header-buttons">
          <button onClick={() => navigate("/dashboard")} className="nav-btn">Back to Dashboard</button>
          <button onClick={() => navigate("/profile")} className="nav-btn secondary">View Profile</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="schedule-tabs">
        <button
          className={`tab-btn ${activeTab === "bookappointment" ? "active" : ""}`}
          onClick={() => setActiveTab("bookappointment")}
        >
          📅 Book Appointment
        </button>
        <button
          className={`tab-btn ${activeTab === "myappointments" ? "active" : ""}`}
          onClick={() => setActiveTab("myappointments")}
        >
          📋 My Appointments
        </button>
      </div>

      <div className="schedule-content">
        {/* Book Appointment Tab */}
        {activeTab === "bookappointment" && (
          <div className="booking-section">
            <h2>Find & Book a Doctor</h2>
            
            {loading ? (
              <div className="loading">Loading doctors...</div>
            ) : (
              <>
                {/* Doctors List */}
                <div className="doctors-section">
                  <h3>Available Doctors</h3>
                  {doctors.length === 0 ? (
                    <p>No doctors available</p>
                  ) : (
                    <div className="doctors-grid">
                      {doctors.map(doctor => (
                        <div
                          key={doctor.id}
                          className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                          onClick={() => setSelectedDoctor(doctor)}
                        >
                          <div className="doctor-avatar">👨‍⚕️</div>
                          <h4>{doctor.name}</h4>
                          <p className="specialty">{doctor.specialization || doctor.department}</p>
                          <p className="fee">₹{doctor.consultationFee || 500}/consultation</p>
                          <div className="rating">⭐ {doctor.rating || 4.5}/5</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Booking Form */}
                {selectedDoctor && (
                  <div className="booking-form">
                    <h3>Book with {selectedDoctor.name}</h3>
                    
                    <div className="form-group">
                      <label>Select Date</label>
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <button onClick={handleGetSlots} className="get-slots-btn">
                        View Available Slots
                      </button>
                    </div>

                    {availableSlots.length > 0 && (
                      <div className="form-group">
                        <label>Select Time</label>
                        <div className="time-slots">
                          {availableSlots.map((slot, idx) => (
                            <button
                              key={idx}
                              className={`slot-btn ${slot.available ? 'available' : 'booked'} ${appointmentTime === slot.time ? 'selected' : ''}`}
                              onClick={() => slot.available && handleSelectSlot(slot)}
                              disabled={!slot.available}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="form-group">
                      <label>Reason for Visit</label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Describe your health concern..."
                        rows="3"
                      />
                    </div>

                    <div className="booking-summary">
                      <h4>Booking Summary</h4>
                      <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                      <p><strong>Department:</strong> {selectedDoctor.department}</p>
                      <p><strong>Date:</strong> {appointmentDate}</p>
                      <p><strong>Time:</strong> {appointmentTime || 'Not selected'}</p>
                      <p className="fee"><strong>Fee:</strong> ₹{selectedDoctor.consultationFee || 500}</p>
                    </div>

                    <button
                      onClick={handleBookAppointment}
                      className="book-btn"
                      disabled={!appointmentDate || !appointmentTime}
                    >
                      💳 Proceed to Payment
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Payment Modal */}
        {showPayment && (
          <div className="payment-modal">
            <div className="payment-content">
              <button className="close-btn" onClick={() => setShowPayment(false)}>✕</button>
              <h2>💳 Complete Payment</h2>
              
              <div className="payment-summary">
                <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
                <p><strong>Date & Time:</strong> {appointmentDate} at {appointmentTime}</p>
                <p className="amount"><strong>Amount:</strong> ₹{selectedDoctor?.consultationFee || 500}</p>
              </div>

              <div className="payment-methods">
                <h3>Select Payment Method</h3>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  💳 Credit/Debit Card
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  📱 UPI/Google Pay
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  👛 Digital Wallet
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-form">
                  <input type="text" placeholder="Card Number" maxLength="16" />
                  <input type="text" placeholder="MM/YY" maxLength="5" />
                  <input type="text" placeholder="CVV" maxLength="3" />
                </div>
              )}

              <div className="payment-actions">
                <button onClick={() => setShowPayment(false)} className="cancel-btn">Cancel</button>
                <button onClick={handlePaymentSubmit} className="pay-btn">
                  Pay ₹{selectedDoctor?.consultationFee || 500}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SchedulePage;