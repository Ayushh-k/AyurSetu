const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/appointmentsController');

router.get('/', ctrl.listAppointments);
router.get('/:id', ctrl.getAppointmentById);
router.post('/', ctrl.createAppointment);
router.patch('/:id/status', ctrl.updateAppointmentStatus);
router.delete('/:id', ctrl.deleteAppointment);

module.exports = router;
