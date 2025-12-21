# AyurSetu - Bridge to Wellness 🏥

A comprehensive healthcare management system built with modern web technologies that connects patients with healthcare professionals for seamless appointment booking, doctor availability management, and patient care coordination.

## 🌟 Features

- **User Authentication**: Secure sign-up and sign-in with role-based access control
- **Appointment Booking**: Easy-to-use interface for patients to book appointments with doctors
- **Doctor Management**: Doctors can manage their availability and schedules
- **Admin Dashboard**: Comprehensive admin panel for managing doctors, patients, and appointments
- **Doctor Dashboard**: Personalized dashboard for healthcare professionals
- **Patient Dashboard**: User-friendly interface for patients to view their appointments and profile
- **Payment Integration**: Secure payment processing for appointments
- **Profile Management**: Users can update and manage their profiles
- **Analytics**: Track healthcare metrics and appointment statistics
- **Responsive Design**: Mobile-friendly interface for all devices

## 🛠️ Tech Stack

### Frontend
- **React 18+**: Modern UI library
- **Vite**: Fast build tool and development server
- **Context API**: State management
- **CSS3**: Styling with responsive design

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **JSON-based Storage**: Data persistence
- **JWT Authentication**: Secure token-based authentication

## 📋 Project Structure

```
AyurSetu/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   ├── context/           # Context for state management
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # CSS stylesheets
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── backend/
│   ├── server.js          # Express server entry point
│   ├── controllers/       # Business logic controllers
│   ├── routes/            # API endpoints
│   ├── middleware/        # Express middleware
│   ├── data/              # JSON data storage
│   └── utils/             # Utility functions
├── index.html             # HTML template
├── package.json           # Frontend dependencies
└── vite.config.mjs        # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-.git
cd AyurSetu
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../
npm install
```

### Configuration

1. Create a `.env` file in the backend directory (if needed):
```env
PORT=5000
NODE_ENV=development
```

2. Ensure the backend data files are in place:
   - `backend/data/users.json`
   - `backend/data/doctors.json`
   - `backend/data/patients.json`
   - `backend/data/appointments.json`

## 📦 Running the Application

### Start the Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### Start the Frontend Development Server
```bash
npm run dev
# Frontend runs on http://localhost:5173 (or as shown in terminal)
```

### Build for Production
```bash
npm run build
# Creates optimized build in dist/
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- User credentials are stored securely
- Tokens are issued upon login
- Protected routes require valid tokens
- Role-based access control for Admin, Doctor, and Patient roles

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/doctors` - Create new doctor (Admin)
- `PUT /api/doctors/:id` - Update doctor info
- `DELETE /api/doctors/:id` - Delete doctor (Admin)

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Book new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Patients
- `GET /api/patients` - Get all patients (Admin)
- `GET /api/patients/:id` - Get patient details
- `PUT /api/patients/:id` - Update patient info

### Analytics
- `GET /api/analytics` - Get healthcare analytics data

## 🎨 Components Overview

### Key Frontend Components
- **HomePage**: Landing page with key features
- **SignUp/SignIn**: User authentication pages
- **AppointmentBooking**: Interface for booking appointments
- **DoctorAvailability**: Manage doctor schedules
- **AdminDashboard**: Administrative control panel
- **DoctorDashboard**: Doctor's personal dashboard
- **Dashboard**: Patient's personal dashboard
- **PaymentPage**: Payment processing interface
- **ProfilePage**: User profile management

## 🗄️ Data Models

### User
```json
{
  "id": "unique-id",
  "name": "User Name",
  "email": "user@example.com",
  "password": "hashed-password",
  "role": "patient|doctor|admin",
  "phoneNumber": "1234567890",
  "createdAt": "2025-12-21"
}
```

### Doctor
```json
{
  "id": "unique-id",
  "name": "Doctor Name",
  "specialization": "Cardiology",
  "email": "doctor@example.com",
  "availability": [],
  "rating": 4.5
}
```

### Appointment
```json
{
  "id": "unique-id",
  "patientId": "patient-id",
  "doctorId": "doctor-id",
  "appointmentDate": "2025-12-25",
  "time": "10:00 AM",
  "status": "scheduled|completed|cancelled",
  "notes": "Patient notes"
}
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Harsh Kumar**
- GitHub: [HarshKumar84](https://github.com/HarshKumar84)
- Project: [AyurSetu-Bridge-to-Wellness-](https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-)

## 📞 Support

For support, please open an issue on GitHub or contact the project maintainer.

## 🙏 Acknowledgments

- React and Vite communities for excellent tools
- Express.js for robust backend framework
- All contributors who have helped with bug fixes and features

---

**Status**: Active Development 🔄

**Last Updated**: December 21, 2025

**Version**: 1.0.0
