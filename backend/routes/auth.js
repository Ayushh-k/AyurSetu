const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readCollection, writeCollection } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Register user (doctor or patient)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, specialization, department, qualifications } = req.body;
    
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'email, password and role (doctor/patient) required' });
    }

    if (!['doctor', 'patient'].includes(role)) {
      return res.status(400).json({ message: 'role must be doctor or patient' });
    }

    const users = readCollection('users');
    if (users.find((u) => u.email === email)) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `u_${role}_${Date.now()}`;
    
    const newUser = {
      id: userId,
      email,
      name: name || email,
      passwordHash: hashedPassword,
      role,
      createdAt: new Date().toISOString(),
    };

    // If doctor, also create doctor profile
    if (role === 'doctor') {
      if (!specialization || !department) {
        return res.status(400).json({ message: 'specialization and department required for doctors' });
      }
      
      const doctors = readCollection('doctors');
      const doctorProfile = {
        id: userId,
        userId: userId,
        name: name,
        email: email,
        specialization: specialization,
        department: department,
        qualifications: qualifications || [],
        phone: '',
        bio: '',
        workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        workingHours: { start: '09:00', end: '17:00' },
        slotMinutes: 30,
        appointments: [],
        status: 'Available',
        rating: 5.0,
        createdAt: new Date().toISOString(),
      };
      doctors.push(doctorProfile);
      writeCollection('doctors', doctors);
    }

    // If patient, create patient profile
    if (role === 'patient') {
      const { phone, age, gender, address } = req.body;
      const patients = readCollection('patients');
      const patientProfile = {
        id: userId,
        userId: userId,
        name: name,
        email: email,
        phone: phone || '',
        age: age || null,
        gender: gender || '',
        address: address || '',
        medicalHistory: [],
        allergies: [],
        emergencyContact: {},
        appointments: [],
        createdAt: new Date().toISOString(),
      };
      patients.push(patientProfile);
      writeCollection('patients', patients);
    }

    users.push(newUser);
    writeCollection('users', users);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name, 
      role: newUser.role,
      token 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const users = readCollection('users');
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password required' });
    }
    
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      role: user.role,
      token 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
