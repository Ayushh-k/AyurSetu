import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage on mount and when it changes
    const checkAuth = () => {
      const role = localStorage.getItem('userRole');
      const name = localStorage.getItem('userName');
      setUserRole(role);
      setUserName(name);
    };

    checkAuth();

    // Listen for storage changes (for when login happens in different tab/window)
    window.addEventListener('storage', checkAuth);
    
    // Also check every second for real-time updates
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navbar-container') && !event.target.closest('.navbar-links')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDarkModeToggle = () => {
    toggleDarkMode(!isDarkMode);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
    
    // Reset state
    setUserRole(null);
    setUserName(null);
    setShowLogoutConfirm(false);
    setIsOpen(false);
    
    // Navigate to home
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit" }}>
              <span className="brand-icon">⚕️</span>
              <div>
                <span className="brand-text">AyurSetu</span>
                <span className="brand-subtitle">Bridge to wellness</span>
              </div>
            </Link>
          </div>
          
          <button className={`hamburger ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
            <li>
              <Link to="/" className="nav-link" onClick={handleLinkClick}>
                <span className="link-icon">🏠</span>
                <span>Home</span>
              </Link>
            </li>
            {!userRole && (
              <>
                <li>
                  <Link to="/signin" className="nav-link" onClick={handleLinkClick}>
                    <span className="link-icon">🔐</span>
                    <span>Sign In</span>
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="nav-link" onClick={handleLinkClick}>
                    <span className="link-icon">✍️</span>
                    <span>Sign Up</span>
                  </Link>
                </li>
              </>
            )}
            {userRole === 'patient' && (
              <>
                <li>
                  <Link to="/dashboard" className="nav-link" onClick={handleLinkClick}>
                    <span className="link-icon">📊</span>
                    <span>My Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="nav-link" onClick={handleLinkClick}>
                    <span className="link-icon">👤</span>
                    <span>Profile</span>
                  </Link>
                </li>
              </>
            )}
            {userRole === 'doctor' && (
              <>
                <li>
                  <Link to="/doctor-dashboard" className="nav-link" onClick={handleLinkClick}>
                    <span className="link-icon">👨‍⚕️</span>
                    <span>Doctor Portal</span>
                  </Link>
                </li>
              </>
            )}
            {userRole === 'admin' && (
              <li>
                <Link to="/admin" className="nav-link" onClick={handleLinkClick}>
                  <span className="link-icon">⚙️</span>
                  <span>Admin Panel</span>
                </Link>
              </li>
            )}
            {userRole && (
              <li>
                <button onClick={handleLogoutClick} className="nav-link logout-btn">
                  <span className="link-icon">🚪</span>
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>

          <div className="navbar-right">
            {userRole && userName && (
              <span className="user-info">
                👤 {userName} ({userRole})
              </span>
            )}
            <button className="dark-mode-toggle" onClick={handleDarkModeToggle} title={isDarkMode ? "Light Mode" : "Dark Mode"}>
              <span className="toggle-icon">{isDarkMode ? "☀️" : "🌙"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className={`logout-modal ${isDarkMode ? "dark" : "light"}`}>
            <div className="logout-modal-content">
              <div className="logout-modal-icon">🚪</div>
              <h2>Confirm Logout</h2>
              <p>Are you sure you want to logout from your account?</p>
              <div className="logout-modal-actions">
                <button onClick={confirmLogout} className="logout-confirm-btn">
                  Yes, Logout
                </button>
                <button onClick={cancelLogout} className="logout-cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;