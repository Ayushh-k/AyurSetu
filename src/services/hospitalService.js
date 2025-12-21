// Hospital Management Service - API Client

const API_BASE = 'http://localhost:5000/api';

// Mock departments (kept locally for UI reference)
export const departments = [
  { id: 1, name: "Cardiology", icon: "❤️", doctors: 4 },
  { id: 2, name: "Neurology", icon: "🧠", doctors: 3 },
  { id: 3, name: "Orthopedics", icon: "🦴", doctors: 5 },
  { id: 4, name: "Pediatrics", icon: "👶", doctors: 3 },
  { id: 5, name: "Surgery", icon: "🔪", doctors: 6 },
  { id: 6, name: "Dermatology", icon: "🩹", doctors: 2 },
  { id: 7, name: "Ophthalmology", icon: "👁️", doctors: 4 },
  { id: 8, name: "ENT", icon: "👂", doctors: 3 },
];

// Mock data for reference (not used - comes from backend)
export const mockDoctors = [];
export const analyticsData = {
  totalAppointments: 0,
  totalPatients: 0,
  totalDoctors: 0,
  appointmentsByStatus: {},
  appointmentsByDepartment: {}
};

// Helper to handle API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      const errorMsg = data.message || data.error || response.statusText;
      console.error(`API Error on ${endpoint}:`, {statusCode: response.status, message: errorMsg, data});
      throw new Error(errorMsg);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error(`Network Error on ${endpoint}: Unable to reach ${url}`);
      throw new Error(`Network Error: Cannot reach server at ${API_BASE}. Is the backend running?`);
    }
    console.error(`API Call Failed on ${endpoint}:`, error.message);
    throw error;
  }
}

// Service Functions
export const hospitalService = {
  // Doctor Management
  getDoctors: () => apiCall('/doctors'),
  getDoctorById: (id) => apiCall(`/doctors/${id}`),
  getDoctorsByDepartment: (department) => apiCall(`/doctors?department=${encodeURIComponent(department)}`),
  searchDoctors: (query) => apiCall(`/doctors?q=${encodeURIComponent(query)}`),
  addDoctor: (doctorData) => apiCall('/doctors', { method: 'POST', body: JSON.stringify(doctorData) }),
  updateDoctor: (id, data) => apiCall(`/doctors/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteDoctor: (id) => apiCall(`/doctors/${id}`, { method: 'DELETE' }),

  // Appointment Management
  getAppointments: () => apiCall('/appointments'),
  getAppointmentsByPatient: (patientId) => apiCall(`/appointments?patientId=${encodeURIComponent(patientId)}`),
  getAppointmentsByDoctor: (doctorId) => apiCall(`/doctors/${doctorId}/appointments`),
  bookAppointment: (appointmentData) => apiCall('/appointments', { method: 'POST', body: JSON.stringify(appointmentData) }),
  updateAppointmentStatus: (id, status) => apiCall(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  cancelAppointment: (id) => apiCall(`/appointments/${id}`, { method: 'DELETE' }),

  // Patient Management
  getPatients: () => apiCall('/patients'),
  getPatientById: (id) => apiCall(`/patients/${id}`),
  addPatient: (patientData) => apiCall('/patients', { method: 'POST', body: JSON.stringify(patientData) }),
  updatePatient: (id, data) => apiCall(`/patients/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Analytics
  getAnalytics: () => apiCall('/analytics'),

  // Doctor Availability
  getAvailableSlots: (doctorId, date) => apiCall(`/doctors/${doctorId}/slots?date=${encodeURIComponent(date)}`),
  updateAvailability: (doctorId, date, slots) => apiCall(`/doctors/${doctorId}/availability`, { method: 'PATCH', body: JSON.stringify({ date, slots }) }),

  // Auth
  register: (email, password, name, role, specialization, department, phone, age, gender, address) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name, role, specialization, department, phone, age, gender, address }) }),
  login: (email, password) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
};

export default hospitalService;
