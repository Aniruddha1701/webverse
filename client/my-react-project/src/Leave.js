import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LeavePage() {
  const [leaveData, setLeaveData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    const fetchLeaveData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/leave", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLeaveData(response.data.data.leave);
        } else {
          setErrorMessage("Failed to fetch leave data");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      }
    };

    fetchLeaveData();
  }, []);

  return (
    <div>
      <h1>Leave Page</h1>
      {/* Display leave data */}
      {leaveData.map((leave) => (
        <div key={leave.id}>
          <p>Leave Type: {leave.leaveType}</p>
          <p>Leave Date: {leave.leaveDate}</p>
          {/* Add more leave data fields here */}
        </div>
      ))}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
