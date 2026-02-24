import React from "react";
import "../styles/HomePage.css"; // Assuming you have styles for the landing page
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">
        <h1>Welcome to AyurSetu</h1>
        <p>
          Your one-stop solution for optimizing doctor availability and scheduling ointments.
        </p>
        <p>
          Explore our features to manage your health effectively and efficiently.
        </p>
        <div className="cta-buttons">
          <a href="/signin" className="btn">Sign In</a>
          <a href="/signup" className="btn">Sign Up</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;