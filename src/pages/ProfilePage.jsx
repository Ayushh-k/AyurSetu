import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService from "../services/hospitalService";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
      return;
    }
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      if (userRole === 'patient') {
        const patientData = await hospitalService.getPatientById(userId);
        setProfile(patientData || { id: userId, name: localStorage.getItem('userName'), email: '' });
        setFormData(patientData || { id: userId, name: localStorage.getItem('userName'), email: '' });
        const appointmentsData = await hospitalService.getAppointmentsByPatient(userId);
        setAppointments(appointmentsData || []);
      } else if (userRole === 'doctor') {
        const doctorData = await hospitalService.getDoctorById(userId);
        setProfile(doctorData || { id: userId, name: localStorage.getItem('userName') });
        setFormData(doctorData || { id: userId, name: localStorage.getItem('userName') });
        const appointmentsData = await hospitalService.getAppointmentsByDoctor(userId);
        setAppointments(appointmentsData || []);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setProfile({ id: userId, name: localStorage.getItem('userName'), email: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (userRole === 'patient') {
        await hospitalService.updatePatient(userId, formData);
      } else if (userRole === 'doctor') {
        await hospitalService.updateDoctor(userId, formData);
      }
      setProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
      loadProfileData();
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!profile) return <div className="loading">Profile not found</div>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="header-left">
            <div className="avatar">{userRole === 'patient' ? '🧑‍⚕️' : '👨‍⚕️'}</div>
            <div className="header-info">
              <h1>{profile?.name || 'User Profile'}</h1>
              <p>{userRole === 'patient' ? 'Patient Account' : 'Doctor Account'}</p>
            </div>
          </div>
          <button
            className={`edit-btn ${isEditing ? "cancel" : ""}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "✏️ Edit Profile"}
          </button>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            📋 Info
          </button>
          <button
            className={`tab-btn ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            📅 Appointments
          </button>
          {userRole === 'doctor' && (
            <button
              className={`tab-btn ${activeTab === "availability" ? "active" : ""}`}
              onClick={() => setActiveTab("availability")}
            >
              🕐 Availability
            </button>
          )}
        </div>

        {/* Info Tab */}
        {activeTab === "info" && (
          <div className="tab-content">
            <div className="info-card">
              {isEditing ? (
                <form className="edit-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                  {userRole === 'patient' && (
                    <>
                      <div className="form-group">
                        <label>Age</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender || ''} onChange={handleFormChange}>
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <textarea
                          name="address"
                          value={formData.address || ''}
                          onChange={handleFormChange}
                          rows="2"
                        />
                      </div>
                    </>
                  )}
                  {userRole === 'doctor' && (
                    <>
                      <div className="form-group">
                        <label>Specialization</label>
                        <input
                          type="text"
                          name="specialization"
                          value={formData.specialization || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Department</label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Consultation Fee</label>
                        <input
                          type="number"
                          name="consultationFee"
                          value={formData.consultationFee || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                    </>
                  )}
                  <button type="button" onClick={handleSaveProfile} className="save-btn">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="info-display">
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
                  {userRole === 'patient' && (
                    <>
                      <p><strong>Age:</strong> {profile.age || 'N/A'}</p>
                      <p><strong>Gender:</strong> {profile.gender || 'N/A'}</p>
                      <p><strong>Address:</strong> {profile.address || 'N/A'}</p>
                    </>
                  )}
                  {userRole === 'doctor' && (
                    <>
                      <p><strong>Specialization:</strong> {profile.specialization || 'N/A'}</p>
                      <p><strong>Department:</strong> {profile.department || 'N/A'}</p>
                      <p><strong>Consultation Fee:</strong> ₹{profile.consultationFee || 'N/A'}</p>
                      <p><strong>Rating:</strong> ⭐ {profile.rating || 'N/A'}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="tab-content">
            <h3>Your Appointments</h3>
            {appointments.length > 0 ? (
              <div className="appointments-list">
                {appointments.map(apt => (
                  <div key={apt.id} className={`appointment-card ${apt.status?.toLowerCase()}`}>
                    <div className="appt-info">
                      <p><strong>{userRole === 'patient' ? 'Doctor' : 'Patient'}:</strong> {userRole === 'patient' ? apt.doctorName : apt.patientName}</p>
                      <p><strong>Date:</strong> {apt.date} at {apt.time}</p>
                      <p><strong>Department:</strong> {apt.department}</p>
                      <p><strong>Reason:</strong> {apt.reason || 'Consultation'}</p>
                    </div>
                    <div className="appt-status">
                      <span className={`status-badge ${apt.status?.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No appointments scheduled yet</p>
                <button onClick={() => navigate("/schedule")} className="book-btn">
                  📅 Schedule Appointment
                </button>
              </div>
            )}
          </div>
        )}

        {/* Availability Tab (Doctor only) */}
        {userRole === 'doctor' && activeTab === "availability" && (
          <div className="tab-content">
            <div className="availability-card">
              <h3>Working Hours</h3>
              <p>{profile.workingHours?.start || '09:00'} - {profile.workingHours?.end || '17:00'}</p>
              <h3>Working Days</h3>
              <p>{profile.workingDays?.join(', ') || 'Mon-Fri'}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="profile-footer">
          <button onClick={() => navigate("/dashboard")} className="nav-btn primary">
            📊 Dashboard
          </button>
          <button onClick={() => navigate("/schedule")} className="nav-btn secondary">
            📅 Schedule
          </button>
          <button onClick={() => navigate("/home")} className="nav-btn tertiary">
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
