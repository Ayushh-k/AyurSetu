const express = require('express');
const router = express.Router();
const { readCollection, writeCollection } = require('../utils/db');

// List patients
router.get('/', (req, res) => {
  const patients = readCollection('patients');
  res.json(patients);
});

// Get patient by ID
router.get('/:id', (req, res) => {
  const patients = readCollection('patients');
  const patient = patients.find((p) => p.id === req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  res.json(patient);
});

// Update patient
router.patch('/:id', (req, res) => {
  const patients = readCollection('patients');
  const patient = patients.find((p) => p.id === req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  Object.assign(patient, req.body);
  writeCollection('patients', patients);
  res.json(patient);
});

module.exports = router;
