import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospitalService, { analyticsData, mockDoctors } from "../services/hospitalService";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [doctors, setDoctors] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    department: "",
    qualifications: "",
    experience: "",
    consultationFee: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const doctorsData = await hospitalService.getDoctors();
      const analyticsData = await hospitalService.getAnalytics();
      setDoctors(doctorsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        await hospitalService.updateDoctor(editingDoctor.id, formData);
        setEditingDoctor(null);
      } else {
        await hospitalService.addDoctor(formData);
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        department: "",
        qualifications: "",
        experience: "",
        consultationFee: "",
      });
      setShowAddDoctor(false);
      loadData();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await hospitalService.deleteDoctor(id);
        loadData();
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      department: doctor.department,
      qualifications: doctor.qualifications,
      experience: doctor.experience,
      consultationFee: doctor.consultationFee,
    });
    setShowAddDoctor(true);
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-left">
            <h1>🏥 Hospital Admin Dashboard</h1>
            <p>Manage doctors, appointments, and view analytics</p>
          </div>
          <div className="header-right">
            <button className="btn-logout" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        {analytics && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👨‍⚕️</div>
              <div className="stat-content">
                <p className="stat-label">Total Doctors</p>
                <h3 className="stat-value">{analytics.totalDoctors}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <p className="stat-label">Total Patients</p>
                <h3 className="stat-value">{analytics.totalPatients}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <p className="stat-label">Total Appointments</p>
                <h3 className="stat-value">{analytics.totalAppointments}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <p className="stat-label">This Month</p>
                <h3 className="stat-value">{analytics.appointmentsThisMonth}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`tab-btn ${activeTab === "doctors" ? "active" : ""}`}
            onClick={() => setActiveTab("doctors")}
          >
            👨‍⚕️ Manage Doctors
          </button>
          <button
            className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            📈 Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === "overview" && analytics && (
            <div className="overview-section">
              <h2>📊 Dashboard Overview</h2>

              <div className="overview-grid">
                <div className="overview-card">
                  <h3>Appointments Trend (This Week)</h3>
                  <div className="chart-container">
                    <div className="simple-bar-chart">
                      {analytics.appointmentsTrend.map((item, idx) => (
                        <div key={idx} className="bar-item">
                          <div className="bar-label">{item.day}</div>
                          <div className="bar-wrapper">
                            <div
                              className="bar"
                              style={{ height: `${(item.appointments / 61) * 100}%` }}
                            />
                          </div>
                          <div className="bar-value">{item.appointments}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overview-card">
                  <h3>Top Doctors by Workload</h3>
                  <div className="doctor-workload-list">
                    {analytics.doctorWorkload.map((item, idx) => (
                      <div key={idx} className="workload-item">
                        <div className="workload-name">{item.name}</div>
                        <div className="workload-bar">
                          <div
                            className="workload-fill"
                            style={{ width: `${(item.appointments / 45) * 100}%` }}
                          />
                        </div>
                        <div className="workload-count">{item.appointments}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>Department Statistics</h3>
                <div className="department-table">
                  <div className="table-header">
                    <div>Department</div>
                    <div>Appointments</div>
                    <div>Revenue</div>
                  </div>
                  {analytics.departmentStats.map((item, idx) => (
                    <div key={idx} className="table-row">
                      <div>{item.department}</div>
                      <div>{item.appointments}</div>
                      <div className="revenue">{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Doctors Management Tab */}
          {activeTab === "doctors" && (
            <div className="doctors-section">
              <div className="doctors-header">
                <h2>👨‍⚕️ Manage Doctors</h2>
                <button
                  className="btn-add-doctor"
                  onClick={() => {
                    setEditingDoctor(null);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      specialization: "",
                      department: "",
                      qualifications: "",
                      experience: "",
                      consultationFee: "",
                    });
                    setShowAddDoctor(true);
                  }}
                >
                  ➕ Add Doctor
                </button>
              </div>

              {/* Search Bar */}
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Add/Edit Doctor Form */}
              {showAddDoctor && (
                <div className="doctor-form-container">
                  <h3>{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</h3>
                  <form onSubmit={handleAddDoctor} className="doctor-form">
                    <div className="form-grid">
                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Specialization"
                        value={formData.specialization}
                        onChange={(e) =>
                          setFormData({ ...formData, specialization: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Department"
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({ ...formData, department: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Qualifications"
                        value={formData.qualifications}
                        onChange={(e) =>
                          setFormData({ ...formData, qualifications: e.target.value })
                        }
                        required
                      />
                      <input
                        type="number"
                        placeholder="Experience (years)"
                        value={formData.experience}
                        onChange={(e) =>
                          setFormData({ ...formData, experience: e.target.value })
                        }
                        required
                      />
                      <input
                        type="number"
                        placeholder="Consultation Fee"
                        value={formData.consultationFee}
                        onChange={(e) =>
                          setFormData({ ...formData, consultationFee: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-save">
                        {editingDoctor ? "Update Doctor" : "Add Doctor"}
                      </button>
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => setShowAddDoctor(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Doctors List */}
              <div className="doctors-list">
                {filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="doctor-card">
                    <div className="doctor-avatar">{doctor.image}</div>
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p className="specialization">{doctor.specialization}</p>
                      <p className="department">{doctor.department}</p>
                      <p className="experience">Experience: {doctor.experience}</p>
                      <p className="fee">₹{doctor.consultationFee}</p>
                    </div>
                    <div className="doctor-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditDoctor(doctor)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteDoctor(doctor.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && analytics && (
            <div className="analytics-section">
              <h2>📈 Analytics & Reports</h2>

              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Total Revenue (Estimated)</h3>
                  <div className="revenue-summary">
                    {analytics.departmentStats.map((dept, idx) => {
                      const revenue = parseInt(dept.revenue.replace(/₹|,/g, ""));
                      return (
                        <div key={idx} className="revenue-item">
                          <span>{dept.department}</span>
                          <strong>{dept.revenue}</strong>
                        </div>
                      );
                    })}
                    <div className="revenue-total">
                      <span>Total</span>
                      <strong>₹451,650</strong>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>Appointment Status Distribution</h3>
                  <div className="status-distribution">
                    <div className="status-item">
                      <span className="status-badge confirmed">Confirmed</span>
                      <strong>65%</strong>
                    </div>
                    <div className="status-item">
                      <span className="status-badge pending">Pending</span>
                      <strong>25%</strong>
                    </div>
                    <div className="status-item">
                      <span className="status-badge cancelled">Cancelled</span>
                      <strong>10%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
