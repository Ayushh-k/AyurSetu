import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to AyurSetu</h1>
        <p>Your one-stop solution for doctor availability and ointment scheduling.</p>
      </header>
      <section className="homepage-features">
        <h2>Features</h2>
        <ul>
          <li>✅ Check doctor availability in real-time.</li>
          <li>✅ Schedule appointments effortlessly.</li>
          <li>✅ Manage your ointment allocations with ease.</li>
          <li>✅ Receive booking confirmations instantly.</li>
        </ul>
      </section>
      <section className="homepage-call-to-action">
        <h2>Get Started</h2>
        <p>Join us today to optimize your healthcare experience.</p>
        <div className="button-group">
          <button className="cta-button primary" onClick={() => navigate("/signin")}>Log In</button>
          <button className="cta-button secondary" onClick={() => navigate("/signup")}>Sign Up</button>
          <button className="cta-button tertiary" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;