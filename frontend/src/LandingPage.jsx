import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
// Import your local image from the assets folder
import netflixBg from './assets/netflix.jpg'; 

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState('en'); 
  const [showCustomAlert, setShowCustomAlert] = useState(false); // Added for custom alert
  const navigate = useNavigate();

  const translations = {
    en: {
      title: "Unlimited movies, shows, and more",
      subtitle: "Starts at ₹149. Cancel at any time.",
      readyText: "Ready to watch? Enter your email to create or restart your membership.",
      placeholder: "Email address",
      buttonText: "Get Started",
      signIn: "Sign In",
      alertMsg: "Please enter an email address."
    },
    hi: {
      title: "अनलिमिटेड फ़िल्में, टीवी शो, और बहुत कुछ",
      subtitle: "₹149 से शुरू होता है. कभी भी कैंसिल करें.",
      readyText: "देखने के लिए तैयार हैं? अपनी मेंबरशिप बनाने या रीस्टार्ट करने के लिए अपना ईमेल एड्रेस डालें.",
      placeholder: "ईमेल एड्रेस",
      buttonText: "शुरू करें",
      signIn: "साइन इन करें",
      alertMsg: "कृपया अपना ईमेल एड्रेस डालें।"
    }
  };

  const t = translations[language];

  const handleGetStarted = () => {
    if (email) {
      navigate('/signup', { state: { email: email } });
    } else {
      setShowCustomAlert(true); // Trigger custom colorful alert
    }
  };

  return (
    <div className="landing-container" style={{ '--bg-image': `url(${netflixBg})` }}>
      <header className="landing-header">
        <img 
          className="logo" 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix Logo" 
        />
        <div className="header-right">
          <div className="language-selector">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">🌐 English</option>
              <option value="hi">🌐 हिन्दी</option>
            </select>
          </div>
          <Link to="/login" className="signin-btn">{t.signIn}</Link>
        </div>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <h1>{t.title}</h1>
          <h2>{t.subtitle}</h2>
          <p>{t.readyText}</p>
          
          <div className="cta-form">
            <input 
              type="email" 
              placeholder={t.placeholder} 
              className="cta-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="cta-button" onClick={handleGetStarted}>
              {t.buttonText} <span>&gt;</span>
            </button>
          </div>
        </div>
      </main>

      {/* --- COLORFUL CUSTOM ALERT MODAL --- */}
      {showCustomAlert && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            <div className="alert-icon">⚠️</div>
            <h3>{language === 'en' ? "Email Required" : "ईमेल आवश्यक है"}</h3>
            <p>{t.alertMsg}</p>
            <button className="alert-ok-btn" onClick={() => setShowCustomAlert(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;