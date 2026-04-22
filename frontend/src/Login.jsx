import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
// Import your local image from the assets folder
import netflixBg from './assets/netflix.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Connects to your Node.js server on port 5000
      // Change this:
      const response = await axios.post('/api/login', { email, password });

      if (response.data.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      // Shows the error message from the backend
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="login-wrapper" style={{ '--bg-image': `url(${netflixBg})` }}>
      {/* Netflix Logo Top Left */}
      <div className="login-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
        />
      </div>

      <div className="login-content">
        <div className="login-form-box">
          <h2>Sign In</h2>

          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email or phone number"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-button">Sign In</button>

            <div className="form-options">
              <div className="remember">
                <input type="checkbox" id="rem" />
                <label htmlFor="rem">Remember me</label>
              </div>
              <a href="#">Need help?</a>
            </div>
          </form>

          <div className="login-footer">
            <p>New to Netflix? <a href="#">Sign up now.</a></p>
            <p className="recaptcha">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
              <a href="#"> Learn more.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;