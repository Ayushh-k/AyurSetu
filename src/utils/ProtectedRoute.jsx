import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
    </div>;
  }

  return children;
}

export function getRoleDashboard(role) {
  switch(role) {
    case 'admin':
      return '/admin';
    case 'doctor':
      return '/doctor-dashboard';
    case 'patient':
      return '/dashboard';
    default:
      return '/';
  }
}

export function canAccessPage(requiredRole) {
  const userRole = localStorage.getItem('userRole');
  return userRole === requiredRole;
}
