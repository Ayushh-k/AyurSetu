const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/doctorsController');
const apptCtrl = require('../controllers/appointmentsController');

router.get('/', ctrl.getAllDoctors);
router.get('/:id', ctrl.getDoctorById);
router.get('/:id/slots', ctrl.getAvailableSlots);
// appointments for a doctor
router.get('/:id/appointments', apptCtrl.getAppointmentsByDoctor);

module.exports = router;
