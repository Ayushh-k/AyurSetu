import React, { useState, useEffect } from "react";
import "../styles/DoctorAvailability.css";

const DoctorAvailability = () => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctorAvailability();
  }, []);

  const fetchDoctorAvailability = async () => {
    try {
      const response = await fetch("/api/doctor-availability");
      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (doctorId) => {
    // Logic for booking an appointment
    console.log(`Booking appointment with doctor ID: ${doctorId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doctor-availability">
      <h2>Doctor Availability</h2>
      <ul>
        {availability.map((doctor) => (
          <li key={doctor.id}>
            <h3>{doctor.name}</h3>
            <p>Available: {doctor.available ? "Yes" : "No"}</p>
            {doctor.available && (
              <button onClick={() => handleBooking(doctor.id)}>Book Appointment</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorAvailability;