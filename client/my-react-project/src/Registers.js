import React, { useState } from 'react';
import axios from 'axios';
import './Registers.css';

export default function Registers() {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [block, setBlock] = useState('');
  const [password, setPassword] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginRegNo, setLoginRegNo] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      regNo,
      block,
      password,
      roomNo,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/student/auth/register", requestBody);

      console.log(response);

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

  const handleLogin = () => {
    setShowLoginForm(true);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const loginRequestBody = {
      regNo: loginRegNo,
      password: loginPassword,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/student/auth/login", loginRequestBody);

      if (response.status === 200) {
        console.log('User successfully logged in:', response.data);
        setLoginErrorMessage('User successfully logged in');
      } else {
        setLoginErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setLoginErrorMessage('Bad Request');
        } else if (error.response.status === 404) {
          setLoginErrorMessage('Not Found');
        } else {
          setLoginErrorMessage('An error occurred. Please try again.');
        }
      } else if (error.request) {
        setLoginErrorMessage('No response received. Please check your internet connection and try again.');
      } else {
        setLoginErrorMessage('An error occurred. Please try again.');
      }
    }
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
            <input type="text" id="regNo" name="regNo" placeholder="Registration Number" value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="text" id="block" name="block" placeholder="Block" value={block} onChange={(e) => setBlock(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="text" id="roomNo" name="roomNo" placeholder="Room Number" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} required />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-group">
            <button type="submit">Register</button>
            <br></br>
            <br></br>
            <button type="button" onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
      {showLoginForm && (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLoginFormSubmit}>
            <div className="input-group">
              <input type="text" id="loginRegNo" name="loginRegNo" placeholder="Registration Number" value={loginRegNo} onChange={(e) => setLoginRegNo(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="password" id="loginPassword" name="loginPassword" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            </div>
            {loginErrorMessage && <p className="error-message">{loginErrorMessage}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}
