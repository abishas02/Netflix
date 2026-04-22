import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const location = useLocation();
  // FIXED: showAlert must be defined here
  const [showAlert, setShowAlert] = useState(false);
  const email = location.state?.email || "your email";

  const handleSendLink = () => {
    setShowAlert(true);
  };

  return (
    <div className="signup-page-container">
      {/* Navbar with working link to your Sign In page */}
      <header className="signup-header-nav">
        <img 
          className="signup-brand-logo" 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
        />
        <Link to="/login" className="signup-nav-signin">Sign In</Link>
      </header>

      <div className="signup-content-body">
        <div className="signup-icon-wrapper">
          <img src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png" alt="Devices" />
        </div>
        
        <h1 className="signup-heading">Finish setting up your account</h1>
        <p className="signup-subtext">
          We will send a sign-up link to <b>{email}</b> so you can use Netflix without a password.
        </p>

        <button className="signup-submit-btn" onClick={handleSendLink}>
          Send Link
        </button>
      </div>

      {/* Themed Alert Modal */}
      {showAlert && (
        <div className="themed-alert-overlay">
          <div className="themed-alert-box">
            <div className="alert-mail-icon">✉️</div>
            <h2 className="alert-title">Check your Inbox</h2>
            <p className="alert-msg">A sign-up link has been sent to <b>{email}</b>. Please confirm it.</p>
            <button className="alert-close-btn" onClick={() => setShowAlert(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;