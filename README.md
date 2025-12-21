# AyurSetu - Bridge to Wellness 🏥

A comprehensive, full-stack healthcare management and appointment booking system that bridges the gap between patients and healthcare professionals. AyurSetu optimizes doctor availability, streamlines appointment allocation, and reduces patient waiting times through intelligent scheduling and workflow management.

**Live Repository**: [GitHub - AyurSetu-Bridge-to-Wellness-](https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-)

## 🌟 Features

### Patient Features
- ✅ User Registration & Authentication
- ✅ Browse and view doctor profiles and specializations
- ✅ Check real-time doctor availability and schedules
- ✅ Book appointments with preferred doctors
- ✅ Receive booking confirmations
- ✅ View appointment history and status
- ✅ Update personal profile and health information
- ✅ Manage appointment cancellations
- ✅ Secure payment integration for appointments
- ✅ Personal health dashboard

### Doctor Features
- ✅ Doctor registration and profile management
- ✅ Manage availability and working hours
- ✅ View scheduled appointments
- ✅ Accept or reschedule patient appointments
- ✅ Mark appointments as completed
- ✅ Track patient records and medical history
- ✅ View performance analytics and ratings
- ✅ Personalized doctor dashboard

### Admin Features
- ✅ Complete user management (Add/Edit/Delete users)
- ✅ Doctor directory management
- ✅ Patient management and verification
- ✅ Appointment monitoring and analytics
- ✅ System-wide statistics and reports
- ✅ User role and permission management
- ✅ Payment and billing reports
- ✅ Admin dashboard with comprehensive controls

### General Features
- ✅ Role-Based Access Control (RBAC)
- ✅ Secure JWT Authentication
- ✅ Responsive Design (Desktop, Tablet, Mobile)
- ✅ Real-time appointment updates
- ✅ Email notifications (ready for implementation)
- ✅ Payment processing
- ✅ Analytics and reporting
- ✅ Data persistence with JSON storage

## 🛠️ Tech Stack

### Frontend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library for building user interfaces | 18+ |
| **Vite** | Fast build tool and dev server | Latest |
| **Context API** | State management without Redux | Built-in |
| **CSS3** | Styling and responsive design | Latest |
| **JavaScript (ES6+)** | Programming language | ES6+ |
| **Axios/Fetch** | HTTP client for API requests | Latest |
| **React Router** | Client-side routing | Latest |

### Backend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime environment | 14+ |
| **Express.js** | Web application framework | 4.x |
| **JSON** | Data storage format | Native |
| **JWT** | Token-based authentication | jsonwebtoken |
| **Middleware** | Express custom middleware | Custom |
| **CORS** | Cross-Origin Resource Sharing | Latest |

### Architecture
- **Frontend**: Single Page Application (SPA)
- **Backend**: RESTful API with Express.js
- **Database**: JSON file-based storage (No external DB needed)
- **Authentication**: JWT (JSON Web Tokens)
- **Communication**: HTTP/HTTPS REST API

## � Detailed Project Structure

```
AyurSetu/
│
├── 📄 index.html                 # Main HTML entry point for the application
├── 📄 package.json               # Frontend dependencies and scripts
├── 📄 vite.config.mjs            # Vite configuration for bundling
├── 📄 README.md                  # Project documentation
├── 📄 setup.sh                   # Setup script for installation
│
├── 📂 public/                    # Static assets served as-is
│   └── index.html
│
├── 📂 src/                       # Frontend source code
│   ├── 📄 main.jsx               # React application entry point
│   ├── 📄 App.jsx                # Main application component with routing
│   │
│   ├── 📂 components/            # Reusable React components
│   │   ├── AppointmentBooking.jsx      # Component for booking appointments
│   │   ├── BookingConfirmation.jsx     # Appointment confirmation display
│   │   ├── DoctorAvailability.jsx      # Doctor schedule management
│   │   ├── Footer.jsx                  # Footer component
│   │   ├── HomePage.jsx                # Home page display
│   │   ├── LandingPage.jsx             # Initial landing page
│   │   ├── LandingPageEnhanced.jsx     # Enhanced landing page variant
│   │   ├── Navbar.jsx                  # Navigation bar component
│   │   ├── OintmentScheduling.jsx      # Appointment scheduling interface
│   │   ├── SignIn.jsx                  # User login component
│   │   └── SignUp.jsx                  # User registration component
│   │
│   ├── 📂 pages/                 # Page-level components
│   │   ├── AdminDashboard.jsx         # Admin panel for system management
│   │   ├── Dashboard.jsx               # Patient dashboard
│   │   ├── DoctorDashboard.jsx         # Doctor dashboard
│   │   ├── LandingPage.jsx             # Landing page
│   │   ├── PaymentPage.jsx             # Payment processing page
│   │   ├── ProfilePage.jsx             # User profile management
│   │   └── SchedulePage.jsx            # Appointment scheduling page
│   │
│   ├── 📂 context/               # React Context for state management
│   │   └── AuthContext.jsx             # Authentication context (user, token, etc.)
│   │
│   ├── 📂 hooks/                 # Custom React hooks
│   │   └── useAuth.js                  # Custom hook for auth context
│   │
│   ├── 📂 services/              # API service layer
│   │   ├── api.js                      # Base API configuration and axios setup
│   │   ├── doctorService.js            # Doctor-related API calls
│   │   └── hospitalService.js          # Hospital/general API calls
│   │
│   ├── 📂 styles/                # CSS stylesheets
│   │   ├── AdminDashboard.css          # Admin dashboard styles
│   │   ├── App.css                     # Main app styles
│   │   ├── AppointmentBooking.css      # Appointment booking styles
│   │   ├── BookingConfirmation.css     # Confirmation page styles
│   │   ├── Dashboard.css               # Patient dashboard styles
│   │   ├── DashboardFeatures.css       # Dashboard feature styles
│   │   ├── DoctorAvailability.css      # Doctor availability styles
│   │   ├── DoctorDashboard.css         # Doctor dashboard styles
│   │   ├── Footer.css                  # Footer styles
│   │   ├── global.css                  # Global styles
│   │   ├── HomePage.css                # Home page styles
│   │   ├── LandingPage.css             # Landing page styles
│   │   ├── LandingPageEnhanced.css     # Enhanced landing page styles
│   │   ├── Navbar.css                  # Navigation bar styles
│   │   ├── OintmentScheduling.css      # Appointment scheduling styles
│   │   ├── PaymentPage.css             # Payment page styles
│   │   ├── ProfilePage.css             # Profile page styles
│   │   ├── SchedulePage.css            # Schedule page styles
│   │   ├── SignIn.css                  # Sign in page styles
│   │   └── SignUp.css                  # Sign up page styles
│   │
│   └── 📂 utils/                 # Utility functions
│       └── ProtectedRoute.jsx          # Route protection for authenticated users
│
└── 📂 backend/                   # Backend source code
    ├── 📄 server.js              # Express server entry point
    ├── 📄 package.json           # Backend dependencies
    ├── 📄 README.md              # Backend documentation
    │
    ├── 📂 controllers/           # Business logic controllers
    │   ├── appointmentsController.js   # Appointment operations
    │   └── doctorsController.js        # Doctor operations
    │
    ├── 📂 routes/                # API endpoint routes
    │   ├── analytics.js          # Analytics endpoints (GET /api/analytics)
    │   ├── appointments.js       # Appointment endpoints (CRUD operations)
    │   ├── auth.js               # Authentication endpoints (login, register, logout)
    │   ├── doctors.js            # Doctor endpoints (profile, availability)
    │   └── patients.js           # Patient endpoints (profile, records)
    │
    ├── 📂 middleware/            # Express middleware
    │   └── auth.js               # JWT verification and role-based access control
    │
    ├── 📂 data/                  # JSON data storage (acts as database)
    │   ├── users.json            # User accounts with encrypted passwords
    │   ├── doctors.json          # Doctor profiles and specializations
    │   ├── patients.json         # Patient medical records
    │   └── appointments.json     # Appointment bookings and schedules
    │
    └── 📂 utils/                 # Utility functions
        └── db.js                 # Database operations (read/write JSON files)
```

### Frontend Component Hierarchy
```
App
├── Navbar
├── Routes
│   ├── LandingPage
│   ├── HomePage
│   ├── SignUp
│   ├── SignIn
│   ├── ProtectedRoute
│   │   ├── Dashboard (Patient)
│   │   ├── DoctorDashboard
│   │   ├── AdminDashboard
│   │   ├── ProfilePage
│   │   ├── AppointmentBooking
│   │   ├── SchedulePage
│   │   └── PaymentPage
│   └── 404 Page
└── Footer
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v14 or higher ([Download](https://nodejs.org/))
- **npm**: v6+ (comes with Node.js) or **yarn**
- **Git**: For version control
- **Code Editor**: VS Code, WebStorm, or similar
- **Terminal/Command Prompt**: For running commands

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-.git
cd AyurSetu
```

#### 2. Backend Setup

Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

**Backend Dependencies:**
- `express`: Web framework
- `cors`: Enable cross-origin requests
- `jsonwebtoken`: JWT authentication
- `dotenv`: Environment variables

#### 3. Frontend Setup

Return to root and install frontend dependencies:
```bash
cd ../
npm install
```

**Frontend Dependencies:**
- `react`: UI library
- `react-dom`: React DOM rendering
- `react-router-dom`: Client-side routing
- `axios`: HTTP client

#### 4. Configuration

**Backend Configuration (Optional):**
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
API_BASE_URL=http://localhost:5000
```

**Frontend Configuration:**
The frontend automatically connects to `http://localhost:5000/api` by default.

If you need to change the API endpoint, update [backend/server.js](backend/server.js#L1):
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

#### 5. Data Initialization

Ensure the following JSON files exist in `backend/data/`:
- [backend/data/users.json](backend/data/users.json) - User accounts
- [backend/data/doctors.json](backend/data/doctors.json) - Doctor profiles
- [backend/data/patients.json](backend/data/patients.json) - Patient records
- [backend/data/appointments.json](backend/data/appointments.json) - Appointments

These will be created automatically on first run if they don't exist.

## 📦 Running the Application

### Development Mode

#### Option 1: Run Backend and Frontend Separately (Recommended for Development)

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

Output:
```
✓ Server is running on port 5000
✓ Ready to accept requests
```

**Terminal 2 - Start Frontend Development Server:**
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

Output:
```
VITE v4.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

#### Option 2: Using Concurrently (Run Both from Root)

Install concurrently:
```bash
npm install --save-dev concurrently
```

Add to main `package.json`:
```json
"scripts": {
  "dev": "concurrently \"npm --prefix backend start\" \"vite\""
}
```

Then run:
```bash
npm run dev
```

### Production Build

#### Build Frontend
```bash
npm run build
# Creates optimized build in dist/
```

#### Build for Deployment
```bash
# Build frontend
npm run build

# Backend is already production-ready with Node.js
# Deploy both frontend (dist/) and backend/ to your server
```

### Testing the Application

1. **Open Browser:**
   - Navigate to `http://localhost:5173`

2. **Test User Registration:**
   - Click "Sign Up"
   - Fill in user details
   - Select role: Patient/Doctor/Admin
   - Create account

3. **Test User Login:**
   - Click "Sign In"
   - Enter credentials
   - Verify role-based dashboard access

4. **Test Appointment Booking (As Patient):**
   - Login as patient
   - Go to "Book Appointment"
   - Select doctor and time slot
   - Confirm booking

5. **Test Doctor Dashboard:**
   - Login as doctor
   - View scheduled appointments
   - Manage availability
   - Accept/Decline appointments

6. **Test Admin Dashboard:**
   - Login as admin
   - Manage users, doctors, and appointments
   - View analytics and reports

## 🔐 Authentication & Authorization

### Authentication Flow

```
User Input → Sign Up/Sign In → Backend Validation → JWT Token Generated
                                                          ↓
                                                    Stored in localStorage
                                                          ↓
                                                    Sent in API requests
                                                          ↓
                                                    JWT Verification
                                                          ↓
                                                    Access Granted/Denied
```

### JWT Token Structure
```
Header.Payload.Signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjYxYzU2YzQ0MGZmYjJlZmYzNGY0NTYiLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTYxNjI2MzMyMn0.signature
```

### Role-Based Access Control (RBAC)

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Patient** | User-level | View personal appointments, book appointments, update profile, view doctors |
| **Doctor** | Professional-level | Manage schedule, view appointments, update availability, manage patients |
| **Admin** | System-level | Full system access, manage users, generate reports, system configuration |

### Protected Routes

Protected routes are managed by [src/utils/ProtectedRoute.jsx](src/utils/ProtectedRoute.jsx):

```javascript
<ProtectedRoute path="/dashboard" component={Dashboard} requiredRole="patient" />
<ProtectedRoute path="/doctor-dashboard" component={DoctorDashboard} requiredRole="doctor" />
<ProtectedRoute path="/admin-dashboard" component={AdminDashboard} requiredRole="admin" />
```

### Security Features
- ✅ JWT Token-based authentication
- ✅ Password hashing (recommended: bcrypt in production)
- ✅ CORS protection
- ✅ Role-based route protection
- ✅ Secure token storage
- ✅ Middleware-based request validation

## 📱 Complete API Endpoints Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phoneNumber": "1234567890",
  "role": "patient"  // patient, doctor, admin
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "userId": "unique-user-id"
}
```

#### User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "unique-user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

#### User Logout
```http
POST /auth/logout
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Doctors Endpoints

#### Get All Doctors
```http
GET /doctors

Response: 200 OK
{
  "success": true,
  "doctors": [
    {
      "id": "doc-001",
      "name": "Dr. Smith",
      "specialization": "Cardiology",
      "email": "smith@hospital.com",
      "experience": 10,
      "rating": 4.8,
      "availability": {
        "monday": ["09:00-17:00"],
        "tuesday": ["09:00-17:00"],
        ...
      }
    }
  ]
}
```

#### Get Doctor Details
```http
GET /doctors/{doctorId}

Response: 200 OK
{
  "success": true,
  "doctor": { ... }
}
```

#### Create Doctor (Admin Only)
```http
POST /doctors
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "name": "Dr. Johnson",
  "specialization": "Neurology",
  "email": "johnson@hospital.com",
  "experience": 8
}

Response: 201 Created
```

#### Update Doctor Info
```http
PUT /doctors/{doctorId}
Authorization: Bearer <DOCTOR_TOKEN>
Content-Type: application/json

{
  "availability": {
    "monday": ["09:00-18:00"],
    ...
  }
}

Response: 200 OK
```

#### Delete Doctor (Admin Only)
```http
DELETE /doctors/{doctorId}
Authorization: Bearer <ADMIN_TOKEN>

Response: 200 OK
```

### Appointments Endpoints

#### Get User Appointments
```http
GET /appointments
Authorization: Bearer <USER_TOKEN>

Response: 200 OK
{
  "success": true,
  "appointments": [
    {
      "appointmentId": "appt-001",
      "doctorId": "doc-001",
      "doctorName": "Dr. Smith",
      "patientId": "pat-001",
      "appointmentDate": "2025-12-25",
      "time": "10:00 AM",
      "status": "scheduled",
      "notes": "Regular checkup"
    }
  ]
}
```

#### Book New Appointment
```http
POST /appointments
Authorization: Bearer <PATIENT_TOKEN>
Content-Type: application/json

{
  "doctorId": "doc-001",
  "appointmentDate": "2025-12-25",
  "time": "10:00 AM",
  "notes": "Consultation for cardiac checkup"
}

Response: 201 Created
{
  "success": true,
  "appointmentId": "appt-001",
  "message": "Appointment booked successfully"
}
```

#### Update Appointment
```http
PUT /appointments/{appointmentId}
Authorization: Bearer <USER_TOKEN>
Content-Type: application/json

{
  "status": "completed"  // or "cancelled", "rescheduled"
}

Response: 200 OK
```

#### Cancel Appointment
```http
DELETE /appointments/{appointmentId}
Authorization: Bearer <USER_TOKEN>

Response: 200 OK
{
  "success": true,
  "message": "Appointment cancelled"
}
```

### Patients Endpoints

#### Get All Patients (Admin Only)
```http
GET /patients
Authorization: Bearer <ADMIN_TOKEN>

Response: 200 OK
{
  "success": true,
  "patients": [ ... ]
}
```

#### Get Patient Details
```http
GET /patients/{patientId}
Authorization: Bearer <USER_TOKEN>

Response: 200 OK
{
  "success": true,
  "patient": {
    "patientId": "pat-001",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 35,
    "medicalHistory": [],
    "allergies": []
  }
}
```

#### Update Patient Info
```http
PUT /patients/{patientId}
Authorization: Bearer <PATIENT_TOKEN>
Content-Type: application/json

{
  "medicalHistory": ["Diabetes"],
  "allergies": ["Penicillin"]
}

Response: 200 OK
```

### Analytics Endpoints

#### Get Dashboard Analytics
```http
GET /analytics
Authorization: Bearer <ADMIN_TOKEN>

Response: 200 OK
{
  "success": true,
  "analytics": {
    "totalPatients": 150,
    "totalDoctors": 25,
    "totalAppointments": 500,
    "appointmentsThisMonth": 45,
    "appointmentCompletion": 92,
    "averageRating": 4.6
  }
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid input data"
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "error": "Invalid token or authentication failed"
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "error": "Insufficient permissions for this action"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## 🎨 Frontend Components Detailed Guide

### Layout Components

#### Navbar.jsx
- **Purpose**: Main navigation bar visible on all pages
- **Features**: Links to Home, Services, Login, Register
- **Props**: None (uses Context for auth status)
- **Styling**: [Navbar.css](src/styles/Navbar.css)

#### Footer.jsx
- **Purpose**: Footer displayed on all pages
- **Features**: Contact info, links, copyright
- **Styling**: [Footer.css](src/styles/Footer.css)

### Page Components

#### LandingPage.jsx / LandingPageEnhanced.jsx
- **Purpose**: First impression and marketing page
- **Features**: Hero section, features showcase, CTA buttons
- **Route**: `/`
- **Styling**: [LandingPage.css](src/styles/LandingPage.css), [LandingPageEnhanced.css](src/styles/LandingPageEnhanced.css)

#### HomePage.jsx
- **Purpose**: Main dashboard after login
- **Features**: Quick links, recent appointments, notifications
- **Route**: `/home`
- **Styling**: [HomePage.css](src/styles/HomePage.css)

#### SignUp.jsx
- **Purpose**: User registration interface
- **Features**: Form validation, role selection, password confirmation
- **Route**: `/signup`
- **Styling**: [SignUp.css](src/styles/SignUp.css)

#### SignIn.jsx
- **Purpose**: User login interface
- **Features**: Email/password input, remember me, forgot password link
- **Route**: `/signin`
- **Styling**: [SignIn.css](src/styles/SignIn.css)

### Role-Specific Dashboard Components

#### Dashboard.jsx (Patient Dashboard)
- **Purpose**: Patient's main control center
- **Features**:
  - View upcoming appointments
  - View past appointments
  - Quick stats (Total appointments, pending, completed)
  - Profile management link
- **Route**: `/dashboard` (Protected - Patient only)
- **Styling**: [Dashboard.css](src/styles/Dashboard.css)
- **Context**: AuthContext

#### DoctorDashboard.jsx
- **Purpose**: Doctor's main control center
- **Features**:
  - View scheduled appointments
  - Manage availability
  - Patient list
  - Performance analytics
  - Rating display
- **Route**: `/doctor-dashboard` (Protected - Doctor only)
- **Styling**: [DoctorDashboard.css](src/styles/DoctorDashboard.css)

#### AdminDashboard.jsx
- **Purpose**: System administration center
- **Features**:
  - User management (Add/Edit/Delete)
  - Doctor management
  - Appointment monitoring
  - System-wide analytics
  - Reports generation
- **Route**: `/admin-dashboard` (Protected - Admin only)
- **Styling**: [AdminDashboard.css](src/styles/AdminDashboard.css)

### Functional Components

#### AppointmentBooking.jsx
- **Purpose**: Allow patients to book appointments
- **Features**:
  - Doctor selection from list
  - Date/time picker
  - Notes input
  - Confirmation
- **Route**: `/book-appointment`
- **Styling**: [AppointmentBooking.css](src/styles/AppointmentBooking.css)
- **API Calls**: POST `/api/appointments`

#### BookingConfirmation.jsx
- **Purpose**: Display appointment confirmation details
- **Features**:
  - Booking details summary
  - Confirmation number
  - Calendar integration
  - Cancel/Reschedule options
- **Styling**: [BookingConfirmation.css](src/styles/BookingConfirmation.css)

#### DoctorAvailability.jsx
- **Purpose**: Show doctor availability and manage schedules
- **Features**:
  - Weekly availability calendar
  - Edit working hours
  - Add/remove time slots
- **Route**: `/doctor/availability` (Protected - Doctor only)
- **Styling**: [DoctorAvailability.css](src/styles/DoctorAvailability.css)

#### OintmentScheduling.jsx
- **Purpose**: Enhanced appointment scheduling with visual calendar
- **Features**:
  - Calendar view
  - Time slot visualization
  - Drag-and-drop scheduling
- **Styling**: [OintmentScheduling.css](src/styles/OintmentScheduling.css)

### User Management Components

#### ProfilePage.jsx
- **Purpose**: User profile editing and management
- **Features**:
  - Edit personal information
  - Update password
  - Profile picture upload
  - Medical history (for patients)
  - Qualifications (for doctors)
- **Route**: `/profile` (Protected)
- **Styling**: [ProfilePage.css](src/styles/ProfilePage.css)

#### PaymentPage.jsx
- **Purpose**: Payment processing for appointments
- **Features**:
  - Payment method selection
  - Amount display
  - Transaction processing
  - Receipt generation
- **Route**: `/payment` (Protected)
- **Styling**: [PaymentPage.css](src/styles/PaymentPage.css)

#### SchedulePage.jsx
- **Purpose**: View and manage appointment schedules
- **Features**:
  - Calendar view of appointments
  - Filter by status
  - Reschedule options
  - Cancel appointment
- **Route**: `/schedule` (Protected)
- **Styling**: [SchedulePage.css](src/styles/SchedulePage.css)

## 🗄️ Database Schema & Data Models

### User Schema
```javascript
{
  "userId": "unique-user-id",           // UUID
  "name": "John Doe",                   // Full name
  "email": "john@example.com",          // Unique email
  "password": "hashed-password",        // bcrypt hash
  "phoneNumber": "1234567890",          // Phone contact
  "role": "patient",                    // patient | doctor | admin
  "profilePicture": "url-to-image",     // Optional profile photo
  "isVerified": true,                   // Email verification status
  "createdAt": "2025-12-21T10:30:00Z",  // Registration timestamp
  "updatedAt": "2025-12-21T15:45:00Z"   // Last update timestamp
}
```

### Doctor Schema
```javascript
{
  "doctorId": "doc-001",
  "userId": "user-id",                  // Reference to User
  "name": "Dr. Smith",
  "specialization": "Cardiology",       // Medical specialty
  "email": "smith@hospital.com",
  "phoneNumber": "1234567890",
  "experience": 10,                     // Years of experience
  "qualifications": [
    "MBBS",
    "MD - Cardiology",
    "Fellowship - American College"
  ],
  "about": "Experienced cardiologist...",
  "rating": 4.8,                        // Average patient rating
  "consultationFee": 500,               // Fee in currency units
  "availability": {
    "monday": ["09:00-12:00", "14:00-17:00"],
    "tuesday": ["09:00-12:00", "14:00-17:00"],
    "wednesday": ["09:00-12:00", "14:00-17:00"],
    "thursday": ["09:00-12:00", "14:00-17:00"],
    "friday": ["09:00-12:00", "14:00-17:00"],
    "saturday": ["10:00-12:00"],
    "sunday": []
  },
  "profilePicture": "url-to-image",
  "hospitalAffiliation": "City Hospital",
  "languages": ["English", "Hindi"],
  "isActive": true,
  "createdAt": "2025-12-21T10:30:00Z",
  "updatedAt": "2025-12-21T15:45:00Z"
}
```

### Patient Schema
```javascript
{
  "patientId": "pat-001",
  "userId": "user-id",                  // Reference to User
  "name": "John Doe",
  "email": "john@example.com",
  "age": 35,
  "gender": "Male",                     // Male | Female | Other
  "phoneNumber": "1234567890",
  "address": "123 Main Street, City",
  "city": "City Name",
  "state": "State Name",
  "bloodGroup": "O+",
  "medicalHistory": [
    {
      "condition": "Diabetes",
      "diagnosedYear": 2020,
      "status": "Active"
    },
    {
      "condition": "Hypertension",
      "diagnosedYear": 2022,
      "status": "Controlled"
    }
  ],
  "allergies": [
    {
      "allergen": "Penicillin",
      "reaction": "Severe rash"
    }
  ],
  "medications": [
    {
      "name": "Metformin",
      "dosage": "500mg",
      "frequency": "Twice daily"
    }
  ],
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phoneNumber": "9876543210"
  },
  "insuranceProvider": "Health Insurance Co.",
  "insurancePolicyNumber": "HIC123456",
  "profilePicture": "url-to-image",
  "createdAt": "2025-12-21T10:30:00Z",
  "updatedAt": "2025-12-21T15:45:00Z"
}
```

### Appointment Schema
```javascript
{
  "appointmentId": "appt-001",
  "patientId": "pat-001",               // Reference to Patient
  "doctorId": "doc-001",                // Reference to Doctor
  "patientName": "John Doe",            // Denormalized for easy access
  "doctorName": "Dr. Smith",
  "specialization": "Cardiology",
  "appointmentDate": "2025-12-25",      // YYYY-MM-DD format
  "time": "10:00 AM",                   // HH:MM AM/PM format
  "duration": 30,                       // Duration in minutes
  "status": "scheduled",                // scheduled | completed | cancelled | rescheduled
  "appointmentType": "In-Person",       // In-Person | Telemedicine | Follow-up
  "notes": "Regular cardiac checkup",   // Appointment notes
  "symptoms": "Chest pain, shortness of breath",
  "diagnosis": "Pending",               // Set after consultation
  "prescription": null,                 // Prescription details if any
  "consultationFee": 500,
  "paymentStatus": "Pending",           // Pending | Completed | Failed
  "transactionId": null,
  "cancelledBy": null,                  // patient | doctor | admin
  "cancellationReason": null,
  "rescheduleHistory": [],
  "createdAt": "2025-12-20T14:22:00Z",
  "updatedAt": "2025-12-21T10:00:00Z",
  "scheduledAt": "2025-12-25T10:00:00Z"
}
```

### JSON File Storage Structure

```
backend/data/
├── users.json
│   └── [{ user objects }]
├── doctors.json
│   └── [{ doctor objects }]
├── patients.json
│   └── [{ patient objects }]
└── appointments.json
    └── [{ appointment objects }]
```

Example `users.json`:
```json
[
  {
    "userId": "usr-001",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2b$10$...",
    "role": "patient",
    "createdAt": "2025-12-21T10:30:00Z"
  },
  {
    "userId": "usr-002",
    "name": "Dr. Smith",
    "email": "smith@hospital.com",
    "password": "$2b$10$...",
    "role": "doctor",
    "createdAt": "2025-12-21T10:30:00Z"
  }
]
```

## � Testing the Application

### Manual Testing Checklist

#### Authentication Testing
- [ ] Register new user with valid data
- [ ] Prevent registration with duplicate email
- [ ] Login with correct credentials
- [ ] Reject login with wrong credentials
- [ ] Logout successfully
- [ ] Token expires after logout

#### Patient Features Testing
- [ ] View list of available doctors
- [ ] Search/filter doctors by specialization
- [ ] Book appointment with available time slot
- [ ] Prevent booking on same date/doctor
- [ ] View own appointments
- [ ] Cancel appointment
- [ ] Update patient profile
- [ ] View appointment status

#### Doctor Features Testing
- [ ] View assigned appointments
- [ ] Update availability schedule
- [ ] Accept/reject appointments
- [ ] Mark appointment as completed
- [ ] View patient medical history
- [ ] Update doctor profile
- [ ] View performance ratings

#### Admin Features Testing
- [ ] View all users
- [ ] Add new doctor/patient
- [ ] Edit user information
- [ ] Delete user
- [ ] View system analytics
- [ ] Generate reports
- [ ] Monitor appointments

### API Testing with Postman/Curl

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get doctors (with token)
curl -X GET http://localhost:5000/api/doctors \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## 🚀 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Create Heroku App**
```bash
heroku create ayursetu-app
```

3. **Add Procfile**
```
web: cd backend && npm start
```

4. **Deploy**
```bash
git push heroku main
```

### Deploy to Vercel (Frontend)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-production-api.com
JWT_SECRET=your-secure-secret-key
NODE_ENV=production
PORT=5000
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes before submitting
- Update documentation as needed
- Ensure no console errors or warnings

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Harsh Kumar**
- GitHub: [HarshKumar84](https://github.com/HarshKumar84)
- Project: [AyurSetu-Bridge-to-Wellness-](https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-)

## ❓ Troubleshooting

### Common Issues & Solutions

#### Issue: "Cannot find module 'express'"
**Solution:**
```bash
cd backend
npm install
# or if using yarn
yarn install
```

#### Issue: "CORS error" or "Access-Control-Allow-Origin"
**Solution:** Ensure backend server is running and CORS is configured:
```javascript
// In backend/server.js
const cors = require('cors');
app.use(cors());
```

#### Issue: "Port 5000 already in use"
**Solution:** Kill the process using the port or use a different port:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

#### Issue: "JWT token expired"
**Solution:** Clear localStorage and login again:
```javascript
localStorage.clear();
// Redirect to login
```

#### Issue: Frontend not connecting to backend
**Solution:** Check if backend is running and correct API URL is set:
```bash
# Check backend
curl http://localhost:5000/api/doctors
# If not working, restart backend
cd backend
npm start
```

#### Issue: Data not persisting after page refresh
**Solution:** Ensure you're storing data in localStorage:
```javascript
localStorage.setItem('token', token);
localStorage.getItem('token');
```

#### Issue: Cannot read property 'data' of undefined
**Solution:** Add error handling in API calls:
```javascript
try {
  const response = await api.get('/endpoint');
  setData(response.data);
} catch (error) {
  console.error('API Error:', error);
}
```

### Debug Mode

Enable debug logging:
```bash
# Backend
DEBUG=* npm start

# Frontend
VITE_DEBUG=true npm run dev
```

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Vite Documentation](https://vitejs.dev)
- [JWT Introduction](https://jwt.io)
- [RESTful API Design](https://restfulapi.net)

### Useful Libraries
- **Frontend**: axios, react-router-dom, date-fns
- **Backend**: express, cors, jsonwebtoken, dotenv
- **Database**: Consider upgrading to MongoDB/PostgreSQL for production

## 📞 Support & Contact

### Getting Help

1. **GitHub Issues**: [Open an issue](https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-/issues)
2. **Email**: harshkumar@example.com
3. **Check Documentation**: Review this README first
4. **Check Troubleshooting**: See the troubleshooting section above

### Report a Bug

To report a bug, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages/screenshots
- Your system information

### Feature Requests

Feel free to suggest new features by opening an issue with the label "enhancement".

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Harsh Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👨‍💻 Author

**Harsh Kumar**
- **GitHub**: [@HarshKumar84](https://github.com/HarshKumar84)
- **Project Repository**: [AyurSetu-Bridge-to-Wellness-](https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-)
- **Email**: harshkumar@example.com

## 🙏 Acknowledgments

- **React & Vite Communities** - For excellent frontend tools and framework
- **Express.js Team** - For the robust and minimal web framework
- **Open Source Community** - For continuous support and inspiration
- **Contributors** - Everyone who has helped with bug fixes and feature suggestions

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Frontend Components** | 15+ |
| **API Endpoints** | 20+ |
| **User Roles** | 3 (Patient, Doctor, Admin) |
| **Data Models** | 4 (User, Doctor, Patient, Appointment) |
| **Lines of Code** | 5000+ |
| **CSS Stylesheets** | 15+ |

## 🎯 Future Enhancements

- [ ] Integration with real payment gateway (Stripe, PayPal)
- [ ] Email/SMS notifications
- [ ] Video consultation capability
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting
- [ ] AI-based doctor recommendation system
- [ ] Prescription management system
- [ ] Medical lab integration
- [ ] Insurance claim processing
- [ ] Multi-language support
- [ ] Dark mode UI
- [ ] Real-time chat with doctors
- [ ] Appointment reminders
- [ ] Patient health tracking
- [ ] Medicine ordering integration

## 📅 Changelog

### Version 1.0.0 (December 21, 2025)
- Initial release
- User authentication system
- Appointment booking functionality
- Doctor and Patient management
- Admin dashboard
- Role-based access control
- Payment integration setup
- Analytics dashboard

---

**Status**: 🟢 Active Development

**Last Updated**: December 21, 2025

**Current Version**: 1.0.0

**Repository**: [GitHub](https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-)

---

## 📝 Quick Reference

### Commands Cheat Sheet

```bash
# Setup
git clone https://github.com/HarshKumar84/AyurSetu-Bridge-to-Wellness-.git
cd AyurSetu
npm install
cd backend && npm install && cd ..

# Development
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
npm run dev

# Build
npm run build

# Deployment
npm run build
# Deploy frontend (dist/) to Vercel/Netlify
# Deploy backend to Heroku/Railway

# Git operations
git add .
git commit -m "commit message"
git push origin main
```

### Environment Setup Template

**.env (Backend)**
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
API_URL=http://localhost:5000
```

**Frontend API Config (src/services/api.js)**
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

**Made with ❤️ by Harsh Kumar**

*For healthcare delivery that works for everyone.*
