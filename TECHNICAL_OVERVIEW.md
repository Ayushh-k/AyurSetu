# AyurSetu - Complete Technical Overview

## 📋 Project Overview

**AyurSetu** is a full-stack hospital management web application designed to:
- Allow patients to book doctor appointments and ointment treatments
- Enable doctors to manage their availability and schedules
- Provide administrators with analytics and system management
- Optimize doctor scheduling and patient management

### Key Features:
✅ User authentication (Sign up, Sign in)
✅ Multi-role system (Patient, Doctor, Admin)
✅ Appointment booking system
✅ Doctor availability management
✅ Real-time scheduling
✅ Dark/Light mode toggle
✅ Profile management
✅ Admin dashboard with analytics
✅ Responsive design for all devices

---

## 🏗️ Architecture: Full-Stack Web Application

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                         │
│              Deployed on Vercel (Serverless)                │
│  User Interface | Routing | State Management | Animations   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                 HTTP/HTTPS Requests
                 (Axios API calls)
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                     │
│           Deployed on Render.com (Server)                   │
│  API Routes | Controllers | Database | Business Logic       │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
             JSON Data (Mock Database)
        ┌─────────────────────────────┐
        │  doctors.json               │
        │  patients.json              │
        │  appointments.json          │
        │  users.json                 │
        └─────────────────────────────┘
```

---

## 💻 Frontend Technology Stack

### Core Framework: **React 18**
- **What it is:** A JavaScript library for building interactive user interfaces
- **Why we use it:** 
  - Reactive components (UI updates automatically when data changes)
  - Reusable components (code reusability)
  - Large ecosystem and community support

### Build Tool: **Vite 5**
- **What it is:** A lightning-fast build tool for modern web applications
- **Why we use it:**
  - ⚡ Extremely fast development server (instant hot reload)
  - 📦 Optimized production bundles (smaller file sizes)
  - 🚀 Better performance than Webpack
  - Zero config out of the box

### Routing: **React Router v6**
- **What it is:** Client-side routing library
- **Features:**
  ```
  Routes handled:
  / → Landing Page
  /signin → Sign In page
  /signup → Sign Up page
  /home → Home page
  /dashboard → Patient Dashboard
  /profile → User Profile
  /schedule → Scheduling page
  /doctor-dashboard → Doctor's panel
  /admin-dashboard → Admin panel
  ```

### HTTP Client: **Axios**
- **What it is:** Promise-based HTTP client for making API calls
- **Usage:**
  - Fetches data from backend
  - Sends appointment requests
  - Handles authentication requests
  - Example: `axios.get('/api/doctors')`

### Styling
- **CSS3** for modern styling
- **Dark Mode Support** using localStorage
- **Responsive Design** using flexbox and media queries
- **Animations** for smooth UI transitions

### State Management
- **React Hooks:** `useState`, `useEffect`
- **Local Storage:** For persisting dark mode settings
- **Props:** For component communication

### Frontend Folder Structure:
```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LandingPage.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   └── ...
│   ├── pages/             # Full page components
│   │   ├── Dashboard.jsx         (Patient view)
│   │   ├── DoctorDashboard.jsx   (Doctor view)
│   │   ├── AdminDashboard.jsx    (Admin view)
│   │   ├── ProfilePage.jsx
│   │   └── ...
│   ├── services/          # API integration
│   │   ├── api.js         (Axios setup, all API calls)
│   │   ├── doctorService.js
│   │   └── hospitalService.js
│   ├── styles/            # CSS files
│   │   ├── global.css
│   │   ├── App.css
│   │   └── ... (component-specific CSS)
│   ├── context/           # React Context for global state
│   │   └── AuthContext.jsx
│   ├── App.jsx            # Main app component with routing
│   └── main.jsx           # Entry point
├── public/                # Static assets (images, icons)
├── index.html             # Main HTML file
├── package.json           # Dependencies
└── vite.config.mjs        # Vite configuration
```

---

## 🔧 Backend Technology Stack

### Runtime: **Node.js**
- **What it is:** JavaScript runtime for server-side development
- **Why we use it:** Fast, scalable, event-driven, JavaScript everywhere

### Framework: **Express.js**
- **What it is:** Minimal web application framework for Node.js
- **What it handles:**
  - HTTP routing (GET, POST, PUT, DELETE)
  - Request/response handling
  - Middleware processing
  - Error handling

### Database: **JSON Files (Mock Database)**
- **Files used:**
  - `doctors.json` - Doctor information and availability
  - `patients.json` - Patient profiles
  - `appointments.json` - Booked appointments
  - `users.json` - User credentials and auth info

### Middleware & Utilities:
- **CORS:** Allows frontend (Vercel) to communicate with backend (Render)
- **Express JSON:** Parses incoming JSON requests
- **dotenv:** Loads environment variables
- **JWT:** For secure authentication
- **Bcryptjs:** For password hashing
- **uuid:** For generating unique IDs

### Backend Folder Structure:
```
backend/
├── server.js              # Main entry point
│                         # Starts Express server on port 5000
├── routes/               # API endpoint definitions
│   ├── doctors.js        # GET /api/doctors, POST doctor creation
│   ├── appointments.js   # POST /api/appointments (book appointment)
│   ├── patients.js       # GET /api/patients
│   ├── auth.js           # POST /api/auth/login, /signup
│   └── analytics.js      # GET /api/analytics
├── controllers/          # Business logic for routes
│   ├── doctorsController.js
│   └── appointmentsController.js
├── middleware/           # Custom middleware
│   └── auth.js          # Authentication checks
├── data/                # Mock database (JSON files)
│   ├── doctors.json
│   ├── patients.json
│   ├── appointments.json
│   └── users.json
├── utils/               # Helper functions
│   └── db.js           # Database helper functions
└── package.json         # Dependencies
```

---

## 🔄 How Data Flows Through the System

### Example: Booking an Appointment

**Step 1: User Action (Frontend)**
```
User fills appointment form and clicks "Book"
↓
React component calls appointmentService.bookAppointment(data)
```

**Step 2: API Call (Frontend → Backend)**
```
Axios sends POST request to:
http://backend-url/api/appointments
Body: { doctorId, patientId, date, time, symptoms }
```

**Step 3: Server Processing (Backend)**
```
Express receives POST request
↓
Route handler in routes/appointments.js executes
↓
Controller logic validates data
↓
New appointment written to appointments.json
↓
Success response sent back: { id, status: "booked", ... }
```

**Step 4: Frontend Receives Response**
```
React updates state
↓
UI shows confirmation message
↓
Appointment details displayed to user
```

---

## 📡 API Endpoints

### Doctor Endpoints
```
GET /api/doctors              → Get all doctors
GET /api/doctors/:id          → Get specific doctor
GET /api/doctors/:id/availability → Get doctor's available slots
POST /api/doctors             → Create new doctor profile
PUT /api/doctors/:id          → Update doctor information
```

### Appointment Endpoints
```
GET /api/appointments         → Get all appointments
GET /api/appointments/:id     → Get specific appointment
POST /api/appointments        → Book new appointment
PUT /api/appointments/:id     → Update appointment status
DELETE /api/appointments/:id  → Cancel appointment
```

### Patient Endpoints
```
GET /api/patients             → Get all patients
GET /api/patients/:id         → Get patient profile
POST /api/patients            → Create patient profile
PUT /api/patients/:id         → Update patient info
```

### Authentication Endpoints
```
POST /api/auth/signup         → Register new user
POST /api/auth/login          → User login
POST /api/auth/logout         → User logout
```

### Analytics Endpoints
```
GET /api/analytics            → Get system analytics
GET /api/analytics/doctors    → Doctor statistics
GET /api/analytics/appointments → Appointment statistics
```

---

## 🧬 Key Components Breakdown

### Frontend Components:

**1. LandingPage.jsx**
- Hero section with welcome message
- Features showcase
- Call-to-action buttons
- Hero animations

**2. SignIn.jsx & SignUp.jsx**
- User authentication forms
- Form validation
- Password strength indicators
- JWT token handling

**3. Dashboard.jsx (Patient view)**
- Shows patient's upcoming appointments
- Appointment history
- Quick stats (total booked, completed)
- Cancel appointment options

**4. DoctorDashboard.jsx**
- Doctor's schedule management
- Available time slots
- Appointments for the day
- Patient details
- Update availability

**5. AdminDashboard.jsx**
- System analytics
- Doctor management
- Appointment statistics
- User reports
- Data visualizations

**6. Navbar.jsx**
- Navigation links
- User authentication status
- Dark/Light mode toggle
- Profile menu

### Backend Controllers:

**1. doctorsController.js**
```javascript
- getDoctors()           → Fetch all doctors from JSON
- getDoctorById()        → Find specific doctor
- getAvailability()      → Get available time slots
- createDoctor()         → Add new doctor
- updateAvailability()   → Modify doctor schedule
```

**2. appointmentsController.js**
```javascript
- getAppointments()      → Fetch appointments
- bookAppointment()      → Create new appointment
- cancelAppointment()    → Remove appointment
- getPatientAppointments() → Get user's bookings
```

---

## 🔐 Authentication & Security

### How Authentication Works:

```
1. User Signup
   ├── User enters email, password, name
   ├── Password is HASHED using bcryptjs
   ├── User data stored in users.json
   └── Frontend redirected to login

2. User Login
   ├── User enters email, password
   ├── Backend checks users.json
   ├── Password is COMPARED (not stored version)
   ├── JWT token generated if match
   ├── Token sent to frontend
   └── Token stored in localStorage

3. Protected Routes
   ├── Each request includes JWT token in header
   ├── Backend verifies token in auth middleware
   ├── If valid → Request allowed
   └── If expired/invalid → Redirect to login
```

---

## 🚀 Deployment Architecture

```
Development Environment
├── Frontend: http://localhost:3000 (Vite dev server)
└── Backend: http://localhost:5000 (Node.js)

Production Environment
├── Frontend: https://ayursetu.vercel.app (Vercel - Serverless)
│   ├── Automatic deployments from GitHub
│   ├── Global CDN for fast loading
│   ├── Environment: Node 18.x
│   └── Build: npm run build → dist/ folder
│
└── Backend: https://ayursetu-backend.onrender.com (Render - Server)
    ├── Automatic deployments from GitHub
    ├── Node.js runtime
    ├── Persistent server (can put to sleep on free tier)
    └── Environment: Port 5000, NODE_ENV=production
```

### CORS Configuration:
```
Frontend (Vercel domain) makes requests to Backend (Render domain)
Backend is configured to accept requests from ALL origins (*)
```

---

## 📊 Data Structure Examples

### Doctor Object
```json
{
  "id": "u_doctor_1765876514950",
  "name": "Dr. Harsh Kumar",
  "specialization": "Cardiology",
  "email": "kumarharsh8477@gmail.com",
  "phone": "9876543210",
  "bio": "Expert in heart diseases",
  "workingDays": ["Mon", "Tue", "Wed", "Thu", "Fri"],
  "workingHours": {
    "start": "09:00",
    "end": "17:00"
  },
  "qualifications": ["MBBS", "MD Cardiology"],
  "availability": {
    "2026-02-25": ["09:00", "10:00", "11:00"],
    "2026-02-26": ["14:00", "15:00", "16:00"]
  }
}
```

### Appointment Object
```json
{
  "id": "APT_12345",
  "patientId": "u_patient_1234",
  "doctorId": "u_doctor_1765876514950",
  "date": "2026-02-25",
  "time": "10:00",
  "status": "booked",
  "symptoms": "Chest pain, shortness of breath",
  "createdAt": "2026-02-24T10:30:00Z",
  "notes": ""
}
```

---

## 🔄 Request/Response Flow Example

### Example: Fetching All Doctors

**Frontend Code:**
```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchDoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    return response.data;  // Array of doctors
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// In a React component:
useEffect(() => {
  fetchDoctors().then(doctors => setDoctors(doctors));
}, []);
```

**Backend Code:**
```javascript
// routes/doctors.js
router.get('/', (req, res) => {
  try {
    const doctors = db.getDoctors();  // Reads from doctors.json
    res.json(doctors);  // Sends array back
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// server.js
app.use(API_PREFIX + '/doctors', require('./routes/doctors'));
```

**Network Request:**
```
GET http://backend-url/api/doctors

Response:
[
  { id: "...", name: "Dr. Kumar", ... },
  { id: "...", name: "Dr. Singh", ... }
]
```

---

## 📈 Performance Optimizations

### Frontend:
- ✅ Vite's fast bundling and code splitting
- ✅ React lazy loading for components
- ✅ CSS minification in production
- ✅ Gzip compression for assets
- ✅ CDN delivery via Vercel

### Backend:
- ✅ Express middleware optimization
- ✅ CORS configuration
- ✅ JSON parsing middleware
- ✅ Error handling middleware
- ✅ Connection pooling

---

## 🔄 Development Workflow

### Making Changes:

**1. Edit Frontend:**
```bash
cd frontend
npm run dev           # Start dev server
# Make changes to components
# Changes auto-reload in browser
```

**2. Edit Backend:**
```bash
cd backend
npm run dev           # Start with nodemon (auto-reload)
# Make changes to routes/controllers
# Changes auto-reload when you save
```

**3. Test API:**
```bash
curl http://localhost:5000/api/doctors
# Test endpoints before pushing
```

**4. Deploy:**
```bash
git add .
git commit -m "Feature description"
git push              # Vercel & Render auto-deploy
```

### Build for Production:

**Frontend:**
```bash
cd frontend
npm run build         # Creates optimized dist/ folder
```

**Backend:**
```bash
cd backend
npm install           # Installs dependencies (done by Render)
npm start             # Starts server on port 5000
```

---

## 📋 Technology Summary Table

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend UI** | React 18 | Component-based UI framework |
| **Build Tool** | Vite 5 | Fast bundling and dev server |
| **Routing** | React Router v6 | Client-side navigation |
| **HTTP Client** | Axios | API communication |
| **Styling** | CSS3 | UI styling and animations |
| **State** | React Hooks | Component state management |
| **Runtime** | Node.js | Server-side JavaScript |
| **Server** | Express.js | REST API framework |
| **Database** | JSON Files | Mock data persistence |
| **Auth** | JWT + bcryptjs | Secure authentication |
| **Deployment (Frontend)** | Vercel | Serverless hosting |
| **Deployment (Backend)** | Render.com | Server hosting |

---

## ✨ Key Features Explained

### 1. **Multi-Role System**
- **Patients:** Can book appointments with doctors
- **Doctors:** Can manage availability and see appointments
- **Admins:** Can view analytics and manage system

### 2. **Dark Mode**
- Toggled via navbar button
- Preference saved to localStorage
- Applied globally to entire app

### 3. **Real-Time Scheduling**
- Doctors provide available time slots
- Patients can see and book available slots
- Appointments prevent double-booking

### 4. **Responsive Design**
- Mobile, tablet, and desktop support
- Flexbox-based layout
- Media queries for responsive styling

### 5. **API Integration**
- Frontend communicates with backend via REST API
- Axios handles all HTTP requests
- Automatic error handling and retry logic

---

## 🎯 How to Use This Application

### As a Patient:
1. Sign up with email and password
2. Login to dashboard
3. Browse available doctors
4. Check doctor availability
5. Book an appointment
6. View appointment history
7. Cancel if needed

### As a Doctor:
1. Login to doctor dashboard
2. Manage availability (set working hours)
3. View scheduled appointments
4. See patient details
5. Update appointment status

### As an Admin:
1. Login to admin dashboard
2. View system analytics
3. See appointment statistics
4. View doctor and patient data
5. Generate reports

---

