import React, { useState, useContext } from 'react';
import { FeedbackContext } from '../contexts/FeedbackContext';

function FeedbackForm() {
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addFeedback } = useContext(FeedbackContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course || !message) {
      alert('Please fill out both fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addFeedback(course, message);
      // Reset form after successful submission
      setCourse('');
      setMessage('');
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card feedback-form-card">
      <h3>Submit New Feedback</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Course Name (e.g., 'CS101')"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Your message here..."
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;