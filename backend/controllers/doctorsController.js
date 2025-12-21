const { readCollection, writeCollection } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

function getAllDoctors(req, res) {
  const doctors = readCollection('doctors');
  const { department, q } = req.query;
  let result = doctors;
  if (department) {
    result = result.filter((d) => d.department === department);
  }
  if (q) {
    const ql = q.toLowerCase();
    result = result.filter(
      (d) => d.name.toLowerCase().includes(ql) || (d.specialization || '').toLowerCase().includes(ql)
    );
  }
  res.json(result);
}

function getDoctorById(req, res) {
  const doctors = readCollection('doctors');
  const doctor = doctors.find((d) => d.id === req.params.id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.json(doctor);
}

// Return available slots for a given date (YYYY-MM-DD)
function getAvailableSlots(req, res) {
  const doctors = readCollection('doctors');
  const appointments = readCollection('appointments');
  const doctor = doctors.find((d) => d.id === req.params.id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

  const date = req.query.date;
  if (!date) return res.status(400).json({ message: 'date query param required (YYYY-MM-DD)' });

  // Map JS weekday names to stored workingDays values (support both Mon/Tue and full names)
  const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dt = new Date(date + 'T00:00:00');
  if (isNaN(dt.getTime())) return res.status(400).json({ message: 'Invalid date' });
  const weekdayShort = weekdayNames[dt.getDay()];

  // If doctor not working that day
  if (!doctor.workingDays || !doctor.workingDays.includes(weekdayShort)) {
    return res.json([]);
  }

  // Generate slots between start and end using 30m slot by default
  const { start, end } = doctor.workingHours || { start: '09:00', end: '17:00' };
  const slotMinutes = doctor.slotMinutes || 30;

  function toMinutes(t) {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }
  function minutesToTime(m) {
    const hh = Math.floor(m / 60).toString().padStart(2, '0');
    const mm = (m % 60).toString().padStart(2, '0');
    return `${hh}:${mm}`; // 24h format
  }

  const startMin = toMinutes(start);
  const endMin = toMinutes(end);
  const slots = [];
  for (let t = startMin; t + slotMinutes <= endMin; t += slotMinutes) {
    const time = minutesToTime(t);
    const taken = appointments.some(
      (a) => a.doctorId === doctor.id && a.date === date && a.time === time && a.status !== 'Cancelled'
    );
    slots.push({ date, time, available: !taken });
  }

  res.json(slots);
}

module.exports = {
  getAllDoctors,
  getDoctorById,
  getAvailableSlots,
};
