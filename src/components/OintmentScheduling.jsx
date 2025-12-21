import React, { useState } from "react";
import "../styles/OintmentScheduling.css";

const OintmentScheduling = () => {
  const [ointment, setOintment] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle scheduling the ointment
    setMessage(`Ointment ${ointment} scheduled for ${scheduleTime}`);
    setOintment("");
    setScheduleTime("");
  };

  return (
    <div className="ointment-scheduling-container">
      <h2>Ointment Scheduling</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ointment">Select Ointment:</label>
          <select
            id="ointment"
            value={ointment}
            onChange={(e) => setOintment(e.target.value)}
            required
          >
            <option value="">--Select Ointment--</option>
            <option value="Ointment A">Ointment A</option>
            <option value="Ointment B">Ointment B</option>
            <option value="Ointment C">Ointment C</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="scheduleTime">Schedule Time:</label>
          <input
            type="datetime-local"
            id="scheduleTime"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Schedule Ointment</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default OintmentScheduling;