import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService from "../services/hospitalService";
import "../styles/DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (userRole !== 'doctor') {
      navigate('/');
      return;
    }
    loadDoctorData();
  }, []);

  const loadDoctorData = async () => {
    try {
      setLoading(true);
      const doctor = await hospitalService.getDoctorById(userId);
      setDoctorInfo(doctor);
      const appointmentsData = await hospitalService.getAppointmentsByDoctor(userId);
      setAppointments(appointmentsData || []);
    } catch (error) {
      console.error('Error loading doctor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      await hospitalService.updateAppointmentStatus(appointmentId, newStatus);
      loadDoctorData();
      alert(`Appointment status updated to ${newStatus}`);
    } catch (error) {
      alert('Error updating appointment: ' + error.message);
    }
  };

  if (loading) return <div className="loading">Loading doctor dashboard...</div>;
  if (!doctorInfo) return <div className="loading">Doctor profile not found</div>;

  const todayAppointments = appointments.filter((apt) => {
    const aptDate = apt.date || apt.appointmentDate;
    return aptDate === selectedDate;
  });

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status !== "Completed" && apt.status !== "Rejected"
  );

  const pendingCount = appointments.filter((apt) => apt.status === "Pending").length;
  const confirmedCount = appointments.filter((apt) => apt.status === "Confirmed").length;

  return (
    <div className="doctor-dashboard">
      <div className="doctor-container">
        {/* Header */}
        <div className="doctor-header">
          <div className="header-left">
            <div className="doctor-avatar-large">👨‍⚕️</div>
            <div className="doctor-info-header">
              <h1>{doctorInfo.name || doctorInfo.fullName}</h1>
              <p className="specialization">{doctorInfo.specialization}</p>
              {doctorInfo.department && <p className="department">{doctorInfo.department}</p>}
              <div className="doctor-meta">
                {doctorInfo.rating && <span className="rating">⭐ {doctorInfo.rating}</span>}
              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="status-selector">
              <label>Status:</label>
              <select className="status-dropdown">
                <option value="available">✅ Available</option>
                <option value="busy">🔴 Busy</option>
                <option value="on-leave">🏖️ On Leave</option>
              </select>
            </div>
            <button className="btn-logout" onClick={() => {
              localStorage.clear();
              navigate("/signin");
            }}>
              Logout
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="doctor-stats">
          <div className="stat-item">
            <span className="stat-label">Today's Appointments</span>
            <span className="stat-value">{todayAppointments.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending Approvals</span>
            <span className="stat-value">{pendingCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Appointments</span>
            <span className="stat-value">{appointments.length}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="doctor-tabs">
          <button
            className={`tab-btn ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            📅 Appointments
          </button>
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="appointments-section">
              <h2>📅 My Appointments</h2>

              <div className="appointments-filters">
                <div className="date-selector">
                  <label>View appointments for:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="filter-tabs">
                  <button className="filter-btn active">All ({appointments.length})</button>
                  <button className="filter-btn">
                    Pending ({pendingCount})
                  </button>
                  <button className="filter-btn">
                    Confirmed ({confirmedCount})
                  </button>
                </div>
              </div>

              <div className="appointments-list">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment) => (
                    <div key={appointment._id || appointment.id} className="appointment-card">
                      <div className="appointment-time">
                        <span className="time">{appointment.time || appointment.appointmentTime || "N/A"}</span>
                      </div>

                      <div className="appointment-details">
                        <h3 className="patient-name">{appointment.patientName || appointment.patientId}</h3>
                        <p className="reason">
                          <strong>Reason:</strong> {appointment.reason || appointment.appointmentType || "General Consultation"}
                        </p>
                        <p className="notes">
                          <strong>Notes:</strong> {appointment.notes || appointment.description || "No notes"}
                        </p>
                      </div>

                      <div className="appointment-status">
                        <span
                          className={`status-badge ${(appointment.status || "Pending").toLowerCase()}`}
                        >
                          {appointment.status || "Pending"}
                        </span>
                      </div>

                      {appointment.status === "Pending" && (
                        <div className="appointment-actions">
                          <button
                            className="btn-approve"
                            onClick={() => handleUpdateStatus(appointment._id || appointment.id, "Confirmed")}
                          >
                            ✅ Approve
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => handleUpdateStatus(appointment._id || appointment.id, "Rejected")}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-appointments">
                    <p>No appointments on {new Date(selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                )}
              </div>

              {upcomingAppointments.length > 0 && (
                <div className="upcoming-section">
                  <h3>📈 Upcoming Appointments</h3>
                  <div className="upcoming-list">
                    {upcomingAppointments.slice(0, 5).map((apt) => (
                      <div key={apt._id || apt.id} className="upcoming-item">
                        <span className="upcoming-date">{apt.date || apt.appointmentDate}</span>
                        <span className="upcoming-patient">{apt.patientName}</span>
                        <span className={`upcoming-status ${(apt.status || "Pending").toLowerCase()}`}>
                          {apt.status || "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>👤 My Profile</h2>
              <div className="profile-card">
                <div className="profile-info">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{doctorInfo.name || doctorInfo.fullName}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{doctorInfo.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <p>{doctorInfo.phone || "Not provided"}</p>
                  </div>
                  <div className="info-item">
                    <label>Specialization</label>
                    <p>{doctorInfo.specialization}</p>
                  </div>
                  {doctorInfo.department && (
                    <div className="info-item">
                      <label>Department</label>
                      <p>{doctorInfo.department}</p>
                    </div>
                  )}
                  {doctorInfo.experience && (
                    <div className="info-item">
                      <label>Experience</label>
                      <p>{doctorInfo.experience} years</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
