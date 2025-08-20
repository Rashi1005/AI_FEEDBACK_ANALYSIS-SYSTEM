import React from 'react';

function SplashScreen({ onEnter }) {
  return (
    <div className="splash-screen-container">
      <div className="splash-content">
        <h1 className="logo-text">FeedbackAI</h1>
        <p className="slogan">Your Voice, Amplified by AI</p>
        <button onClick={onEnter}>
          Experience the Future
          <span className="icon">→</span>
        </button>
      </div>
    </div>
  );
}

export default SplashScreen;