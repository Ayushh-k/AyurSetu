const { readCollection, writeCollection } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

function listAppointments(req, res) {
  const appointments = readCollection('appointments');
  const { patientId, doctorId } = req.query;
  let result = appointments;
  if (patientId) result = result.filter((a) => a.patientId === patientId);
  if (doctorId) result = result.filter((a) => a.doctorId === doctorId);
  res.json(result);
}

function getAppointmentById(req, res) {
  const appointments = readCollection('appointments');
  const apt = appointments.find((a) => a.id === req.params.id);
  if (!apt) return res.status(404).json({ message: 'Appointment not found' });
  res.json(apt);
}

function getAppointmentsByDoctor(req, res) {
  const appointments = readCollection('appointments');
  const doctorId = req.params.id;
  const result = appointments.filter((a) => a.doctorId === doctorId);
  res.json(result);
}

function createAppointment(req, res) {
  const appointments = readCollection('appointments');
  const doctors = readCollection('doctors');
  const patients = readCollection('patients');

  const { patientId, patientName, patientEmail, patientPhone, doctorId, doctorName, department, date, time, reason, notes, fee } = req.body;
  if (!patientId || !patientName || !doctorId || !date || !time) {
    return res.status(400).json({ message: 'Missing required appointment fields' });
  }

  // Check doctor exists
  const doctor = doctors.find((d) => d.id === doctorId);
  if (!doctor) return res.status(400).json({ message: 'Doctor not found' });

  // Check for conflict: same doctor, same date and time and not cancelled
  const conflict = appointments.some(
    (a) => a.doctorId === doctorId && a.date === date && a.time === time && a.status !== 'Cancelled'
  );
  if (conflict) {
    return res.status(409).json({ message: 'Time slot already booked' });
  }

  // Ensure patient exists, if not create minimal record
  let patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    patient = {
      id: patientId,
      name: patientName,
      email: patientEmail || '',
      phone: patientPhone || '',
      appointments: [],
    };
    patients.push(patient);
  }

  const newAppointment = {
    id: `a_${Date.now()}`,
    patientId: patient.id,
    patientName: patientName,
    patientEmail: patientEmail || '',
    patientPhone: patientPhone || '',
    doctorId,
    doctorName: doctorName || doctor.name,
    department: department || doctor.department,
    date,
    time,
    reason: reason || '',
    notes: notes || '',
    fee: fee || doctor.consultationFee || 0,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  appointments.push(newAppointment);
  patient.appointments = patient.appointments || [];
  patient.appointments.push(newAppointment.id);

  // Also add to doctor's appointments list
  doctor.appointments = doctor.appointments || [];
  doctor.appointments.push(newAppointment.id);

  writeCollection('appointments', appointments);
  writeCollection('patients', patients);
  writeCollection('doctors', doctors);

  res.status(201).json(newAppointment);
}

function updateAppointmentStatus(req, res) {
  const appointments = readCollection('appointments');
  const apt = appointments.find((a) => a.id === req.params.id);
  if (!apt) return res.status(404).json({ message: 'Appointment not found' });
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'status required' });
  apt.status = status;
  writeCollection('appointments', appointments);
  res.json(apt);
}

function deleteAppointment(req, res) {
  const appointments = readCollection('appointments');
  const patients = readCollection('patients');
  const doctors = readCollection('doctors');
  
  const appointmentId = req.params.id;
  const appointmentIndex = appointments.findIndex((a) => a.id === appointmentId);
  
  if (appointmentIndex === -1) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  
  const appointment = appointments[appointmentIndex];
  
  // Remove appointment from patients list
  const patient = patients.find((p) => p.id === appointment.patientId);
  if (patient && patient.appointments) {
    patient.appointments = patient.appointments.filter((id) => id !== appointmentId);
  }
  
  // Remove appointment from doctors list
  const doctor = doctors.find((d) => d.id === appointment.doctorId);
  if (doctor && doctor.appointments) {
    doctor.appointments = doctor.appointments.filter((id) => id !== appointmentId);
  }
  
  // Remove appointment from appointments list
  appointments.splice(appointmentIndex, 1);
  
  writeCollection('appointments', appointments);
  writeCollection('patients', patients);
  writeCollection('doctors', doctors);
  
  res.json({ message: 'Appointment deleted successfully' });
}

module.exports = {
  listAppointments,
  getAppointmentById,
  getAppointmentsByDoctor,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
};
