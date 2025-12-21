const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Verify JWT token and attach user to request
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Check if user is admin
function isAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
}

// Check if user is doctor
function isDoctor(req, res, next) {
  if (req.user?.role !== 'doctor') {
    return res.status(403).json({ message: 'Doctor access only' });
  }
  next();
}

// Check if user is patient
function isPatient(req, res, next) {
  if (req.user?.role !== 'patient') {
    return res.status(403).json({ message: 'Patient access only' });
  }
  next();
}

module.exports = { verifyToken, isAdmin, isDoctor, isPatient };
