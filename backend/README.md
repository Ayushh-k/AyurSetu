# Backend Directory
Backend server files are organized in this directory.

## Structure
```
backend/
├── server.js              # Main server entry point
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── routes/                # API routes
│   ├── auth.js
│   ├── doctors.js
│   ├── appointments.js
│   ├── patients.js
│   └── analytics.js
├── controllers/           # Request handlers
│   ├── authController.js
│   ├── doctorController.js
│   ├── appointmentController.js
│   ├── patientController.js
│   └── analyticsController.js
├── models/                # Data models
│   ├── User.js
│   ├── Doctor.js
│   ├── Appointment.js
│   └── Patient.js
├── middleware/            # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
└── config/                # Configuration files
    └── database.js
```

## Starting Backend
```bash
npm install
npm run dev
# Server runs on http://localhost:5000
```

## Implemented API Endpoints
- GET /api/doctors
- GET /api/doctors/:id
- GET /api/doctors/:id/slots?date=YYYY-MM-DD
- GET /api/doctors/:id/appointments
- GET /api/appointments
- GET /api/appointments/:id
- POST /api/appointments
- PATCH /api/appointments/:id/status

These use the JSON files in `backend/data` for persistence (simple file-based DB).
