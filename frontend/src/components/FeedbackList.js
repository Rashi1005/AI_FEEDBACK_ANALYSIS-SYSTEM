import React from 'react';

function FeedbackList({ feedbacks }) {
  const getSentimentClass = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'sentiment-positive';
      case 'negative':
        return 'sentiment-negative';
      case 'neutral':
        return 'sentiment-neutral';
      default:
        return '';
    }
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="card feedback-list-card empty-state">
        <p>No feedback submitted yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="feedback-list-container">
      <h3>Recent Feedback</h3>
      {feedbacks.map((fb) => (
        <div key={fb.id} className="card feedback-item">
          <div className="feedback-header">
            <h4>{fb.course}</h4>
            <span className={`sentiment-badge ${getSentimentClass(fb.sentiment)}`}>
              {fb.sentiment}
            </span>
          </div>
          <p className="feedback-message">"{fb.message}"</p>
          <small className="feedback-timestamp">
            Submitted by {fb.user} on {new Date(fb.timestamp).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;