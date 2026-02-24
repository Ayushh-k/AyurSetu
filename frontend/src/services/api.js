import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Backend API URL

export const fetchDoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const fetchDoctorAvailability = async (doctorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors/${doctorId}/availability`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor availability:', error);
    throw error;
  }
};

export const scheduleAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    throw error;
  }
};

export const fetchOintments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ointments:', error);
    throw error;
  }
};

export const scheduleOintment = async (ointmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ointments/schedule`, ointmentData);
    return response.data;
  } catch (error) {
    console.error('Error scheduling ointment:', error);
    throw error;
  }
};