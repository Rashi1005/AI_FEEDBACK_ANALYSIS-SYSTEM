import React, { useContext, useEffect, useState } from 'react';
import { FeedbackContext } from '../contexts/FeedbackContext';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import SentimentSummary from './SentimentSummary';
import axios from 'axios';

function MainDashboard({ user }) {
  const { feedbacks, loading, error } = useContext(FeedbackContext);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (user && feedbacks.length > 0) {
      axios.get('http://localhost:4000/api/reports/summary', {
        headers: { username: user.username, password: user.password },
      })
      .then(res => setSummary(res.data))
      .catch(err => console.error("Failed to fetch summary:", err));
    } else {
      setSummary(null);
    }
  }, [user, feedbacks]); // Re-fetch summary when feedbacks change

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome, {user.username}. Analyze your feedback in real-time. {user.role === 'admin' ? 'Admin View' : 'Faculty View'}.</p>
      </header>

      {/* Main content area */}
      <section className="dashboard-content">
        <div className="summary-section">
          {summary && <SentimentSummary summary={summary} />}
        </div>
        
        <div className="feedback-form-section">
          <FeedbackForm user={user} />
        </div>
        
        <div className="feedback-list-section">
          <FeedbackList feedbacks={feedbacks} />
        </div>
      </section>
    </div>
  );
}

export default MainDashboard;