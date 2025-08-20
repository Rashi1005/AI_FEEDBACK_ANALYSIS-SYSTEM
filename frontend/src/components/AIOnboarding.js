import React, { useState } from 'react';
import '../App.css';

const AIOnboarding = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // In a real app, you'd call a login API. For the hackathon,
    // we use the mock user data from your backend.
    if (username === 'faculty1' && password === 'pass') {
      onComplete({ id: 1, username: 'faculty1', role: 'faculty', password: 'pass' });
    } else if (username === 'admin1' && password === 'pass') {
      onComplete({ id: 2, username: 'admin1', role: 'admin', password: 'pass' });
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="onboarding-container">
      <div className="card onboarding-card">
        <h2>Login to your FeedbackAI Dashboard</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username (e.g., 'faculty1' or 'admin1')"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (e.g., 'pass')"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AIOnboarding;