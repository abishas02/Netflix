import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
// Import the same local image from the assets folder
import netflixBg from './assets/netflix.jpg'; 

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens here if you have them later
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper" style={{ '--bg-image': `url(${netflixBg})` }}>
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <img 
          className="logo" 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
        />
        <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
      </header>

      <main className="dashboard-content">
        <div className="welcome-message">
          <h1>Welcome to Netflix</h1>
          <p>You have successfully logged in!</p>
          <button className="browse-btn">Browse Movies</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;