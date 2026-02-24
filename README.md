# AyurSetu - Doctor Availability and Ointment Scheduling System

A full-stack web application for optimizing doctor availability and ointment scheduling.

## Project Structure

```
AyurSetu/
├── frontend/              # React + Vite frontend application
│   ├── src/              # React components, pages, services
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.mjs   # Vite configuration
│   ├── vercel.json       # Vercel deployment config
│   └── index.html        # Entry HTML file
│
├── backend/              # Express.js backend API
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── data/             # Mock/JSON data
│   ├── utils/            # Utility functions
│   ├── package.json      # Backend dependencies
│   └── server.js         # Entry point
│
├── README.md             # This file
└── .gitignore            # Git ignore rules
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions

#### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

#### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:5000`

### Build for Production

#### Frontend Build
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

#### Deploy to Vercel
```bash
cd frontend
vercel deploy
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run start` - Start production server
- `npm run dev` - Start development server with hot reload

## Features

- Doctor availability scheduling
- Ointment/appointment booking
- Role-based dashboards (Patient, Doctor, Admin)
- Real-time updates
- Responsive UI design

## Tech Stack

### Frontend
- React 18
- Vite 5
- React Router v6
- Axios for API calls
- CSS3 for styling

### Backend
- Express.js
- Node.js
- JSON data persistence
- Authentication with JWT

## Environment Variables

Check `.env` files in respective folders:
- `frontend/.env` - Frontend environment variables
- `backend/.env` - Backend environment variables (if needed)

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to GitHub
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Author

Ayush Khurana
