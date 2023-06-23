import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function FacultyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestBody = {
      username,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/faculty/auth/login", requestBody);

      if (response.status === 200) {
        console.log('User logged in:', response.data);
        setErrorMessage('');
        // Redirect to the dashboard or desired page upon successful login
        history.push('/dashboard');
      } else {
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage('Invalid username or password');
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

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-group">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
