const express = require('express');
const router = express.Router();
const { readCollection } = require('../utils/db');

// Get analytics data
router.get('/', (req, res) => {
  const doctors = readCollection('doctors');
  const appointments = readCollection('appointments');
  const patients = readCollection('patients');

  // Basic stats
  const stats = {
    totalDoctors: doctors.length,
    totalPatients: patients.length,
    totalAppointments: appointments.length,
    appointmentsByStatus: {
      Pending: appointments.filter((a) => a.status === 'Pending').length,
      Confirmed: appointments.filter((a) => a.status === 'Confirmed').length,
      Completed: appointments.filter((a) => a.status === 'Completed').length,
      Cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
    },
    appointmentsByDepartment: doctors.reduce((acc, doc) => {
      const count = appointments.filter((a) => a.doctorId === doc.id).length;
      if (!acc[doc.department]) acc[doc.department] = 0;
      acc[doc.department] += count;
      return acc;
    }, {}),
  };

  res.json(stats);
});

module.exports = router;
