import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

export const getDoctorAvailability = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors/availability`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor availability:', error);
    throw error;
  }
};

export const scheduleAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments/schedule`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    throw error;
  }
};

export const getOintmentSchedule = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ointments/schedule`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ointment schedule:', error);
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