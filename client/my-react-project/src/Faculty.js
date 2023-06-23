import React, { useState } from 'react';
import axios from 'axios';
import './Registers.css';
import Login from './FacultyLogin';

export default function Registers() {
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [isHOD, setIsHOD] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoginPage, setShowLoginPage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      empId,
      password,
      isHOD,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/faculty/auth/register", requestBody);

      if (response.status === 201) {
        console.log('User successfully registered:', response.data);
        setErrorMessage('Successfully created');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Bad Request');
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      } else if (error.request) {
        setErrorMessage('No response received. Please check your internet connection and try again.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleLoginFaculty = () => {
    setShowLoginPage(true);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="text" id="empId" name="empId" placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="isHOD">Is HOD:</label>
            <input type="checkbox" id="isHOD" name="isHOD" checked={isHOD} onChange={(e) => setIsHOD(e.target.checked)} />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-group">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <div>
        <button onClick={handleLoginFaculty}>Login Faculty</button>
      </div>
      {showLoginPage && <Login />}
    </div>
  );
}
