import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService from "../services/hospitalService";
import "../styles/AppointmentBooking.css";

const AppointmentBooking = ({ doctorId, onClose }) => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    reason: "",
    notes: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDoctor();
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadDoctor = async () => {
    try {
      const data = await hospitalService.getDoctorById(doctorId);
      setDoctor(data);
      if (data.slots && data.slots.length > 0) {
        setSelectedDate(data.slots[0].date);
      }
    } catch (error) {
      console.error("Error loading doctor:", error);
    }
  };

  const loadAvailableSlots = async (date) => {
    try {
      const slots = await hospitalService.getAvailableSlots(doctorId, date);
      setAvailableSlots(slots);
      if (slots.length > 0) {
        setSelectedTime(slots[0].time);
      }
    } catch (error) {
      console.error("Error loading slots:", error);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Auto-register patient if not logged in
      let patientId = localStorage.getItem('userId');
      
      if (!patientId) {
        // Create a temporary patient account
        const registerResponse = await hospitalService.register(
          formData.email,
          `temp_${Date.now()}`, // temporary password
          formData.patientName,
          'patient'
        );
        patientId = registerResponse.id;
        localStorage.setItem('userId', patientId);
        localStorage.setItem('userRole', 'patient');
      }

      const appointmentData = {
        patientId: patientId,
        patientName: formData.patientName,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        doctorId: doctorId,
        doctorName: doctor.name,
        department: doctor.department,
        date: selectedDate,
        time: selectedTime,
        reason: formData.reason,
        notes: formData.notes,
        status: "Pending",
      };

      await hospitalService.bookAppointment(appointmentData);

      // Show success message and navigate
      alert(`Appointment booked successfully!\n\nDoctor: ${doctor.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
      onClose?.();
      navigate("/profile");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointment-booking">
      <div className="booking-container">
        <div className="booking-header">
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
          <h2>Book Appointment</h2>
          <p>with {doctor.name} - {doctor.specialization}</p>
        </div>

        <div className="booking-steps">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <span>1</span>
            <p>Doctor Info</p>
          </div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <span>2</span>
            <p>Date & Time</p>
          </div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>
            <span>3</span>
            <p>Your Details</p>
          </div>
          <div className={`step ${step >= 4 ? "active" : ""}`}>
            <span>4</span>
            <p>Confirm</p>
          </div>
        </div>

        <form onSubmit={handleBookAppointment} className="booking-form">
          {step === 1 && (
            <div className="form-step">
              <h3>Doctor Information</h3>

              <div className="doctor-info-card">
                <div className="doctor-avatar">{doctor.image}</div>
                <div className="doctor-details">
                  <h4>{doctor.name}</h4>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="department">{doctor.department}</p>
                  <div className="doctor-stats">
                    <span>⭐ {doctor.rating}</span>
                    <span>👥 {doctor.totalPatients} Patients</span>
                    <span>💰 ₹{doctor.consultationFee}</span>
                  </div>
                  <p className="bio">{doctor.bio}</p>
                </div>
              </div>

              <div className="qualifications">
                <h4>Qualifications & Experience</h4>
                <ul>
                  <li><strong>Qualifications:</strong> {doctor.qualifications}</li>
                  <li><strong>Experience:</strong> {doctor.experience}</li>
                  <li><strong>License:</strong> {doctor.licenseNumber}</li>
                </ul>
              </div>

              <button type="button" className="btn-next" onClick={() => setStep(2)}>
                Continue to Date & Time
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Select Date & Time</h3>

              <div className="date-time-selector">
                <div className="date-selection">
                  <label>Select Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>

                <div className="time-selection">
                  <label>Select Time Slot:</label>
                  <div className="time-slots">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`time-slot ${selectedTime === slot.time ? "selected" : ""}`}
                          onClick={() => setSelectedTime(slot.time)}
                        >
                          {slot.time}
                        </button>
                      ))
                    ) : (
                      <p className="no-slots">No available slots for this date</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="appointment-summary">
                <h4>Summary</h4>
                <p><strong>Doctor:</strong> {doctor.name}</p>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Fee:</strong> ₹{doctor.consultationFee}</p>
              </div>

              <div className="step-buttons">
                <button type="button" className="btn-back" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="button" className="btn-next" onClick={() => setStep(3)}>
                  Continue to Your Details
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h3>Your Information</h3>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label>Reason for Visit *</label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="e.g., Regular Checkup, Pain, Follow-up"
                  required
                />
              </div>

              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional information you'd like to share..."
                  rows="4"
                />
              </div>

              <div className="step-buttons">
                <button type="button" className="btn-back" onClick={() => setStep(2)}>
                  Back
                </button>
                <button type="button" className="btn-next" onClick={() => setStep(4)}>
                  Review Appointment
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <h3>Confirm Your Appointment</h3>

              <div className="confirmation-card">
                <div className="confirmation-section">
                  <h4>Doctor Information</h4>
                  <div className="confirmation-detail">
                    <span>Name:</span>
                    <strong>{doctor.name}</strong>
                  </div>
                  <div className="confirmation-detail">
                    <span>Specialization:</span>
                    <strong>{doctor.specialization}</strong>
                  </div>
                  <div className="confirmation-detail">
                    <span>Department:</span>
                    <strong>{doctor.department}</strong>
                  </div>
                </div>

                <div className="confirmation-section">
                  <h4>Appointment Details</h4>
                  <div className="confirmation-detail">
                    <span>Date:</span>
                    <strong>{selectedDate}</strong>
                  </div>
                  <div className="confirmation-detail">
                    <span>Time:</span>
                    <strong>{selectedTime}</strong>
                  </div>
                  <div className="confirmation-detail">
                    <span>Reason:</span>
                    <strong>{formData.reason}</strong>
                  </div>
                </div>

                <div className="confirmation-section">
                  <h4>Your Information</h4>
                  <div className="confirmation-detail">
                    <span>Name:</span>
                    <strong>{formData.patientName}</strong>
                  </div>
                  <div className="confirmation-detail">
                    <span>Email:</span>
                    <strong>{formData.email}</strong>
                  </div>
                  <div className="confirmation-detail">
                    <span>Phone:</span>
                    <strong>{formData.phone}</strong>
                  </div>
                </div>

                <div className="confirmation-section fee-section">
                  <div className="confirmation-detail">
                    <span>Consultation Fee:</span>
                    <strong className="fee">₹{doctor.consultationFee}</strong>
                  </div>
                </div>
              </div>

              <p className="confirmation-note">
                ✓ We'll send you a confirmation email and SMS with appointment details
              </p>

              <div className="step-buttons">
                <button type="button" className="btn-back" onClick={() => setStep(3)}>
                  Back
                </button>
                <button type="submit" className="btn-confirm" disabled={loading}>
                  {loading ? "Booking..." : "✓ Confirm & Book Appointment"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;
