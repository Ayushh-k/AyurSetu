import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BookingConfirmation.css";

const BookingConfirmation = ({ appointmentDetails }) => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="booking-confirmation">
      <h1>Booking Confirmed!</h1>
      <p>Thank you for your booking. Here are your appointment details:</p>
      <div className="appointment-details">
        <p><strong>Doctor:</strong> {appointmentDetails.doctorName}</p>
        <p><strong>Date:</strong> {appointmentDetails.date}</p>
        <p><strong>Time:</strong> {appointmentDetails.time}</p>
        <p><strong>Ointment:</strong> {appointmentDetails.ointment}</p>
      </div>
      <button onClick={handleReturnToDashboard}>Return to Dashboard</button>
    </div>
  );
};

export default BookingConfirmation;