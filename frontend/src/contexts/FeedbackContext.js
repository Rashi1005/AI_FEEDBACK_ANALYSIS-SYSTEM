import React, {
  createContext,
  useState,
  useEffect
} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {
  toast
} from 'react-toastify';

export const FeedbackContext = createContext();

export function FeedbackProvider({
  children,
  user
}) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a ref to prevent stale state issues in socket event listeners
  const feedbacksRef = React.useRef([]);
  feedbacksRef.current = feedbacks;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const socket = io('http://localhost:4000');

    // Fetch initial feedbacks
    axios.get('http://localhost:4000/api/feedbacks', {
        headers: {
          username: user.username,
          password: user.password
        },
      })
      .then((res) => {
        setFeedbacks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch feedbacks:', err);
        setError('Failed to load feedbacks. Please try again.');
        setLoading(false);
      });

    // Listen for new feedbacks from the server
    socket.on('new-feedback', (newFb) => {
      setFeedbacks((prev) => [newFb, ...prev]);
      toast.info(`New Feedback on ${newFb.course}: "${newFb.message}"`, {
        autoClose: 5000,
      });
    });

    // Cleanup: disconnect and remove listeners
    return () => {
      socket.off('new-feedback');
      socket.disconnect();
    };
  }, [user]);

  const addFeedback = async (course, message) => {
    if (!user) {
      toast.error('You must be logged in to submit feedback.');
      return;
    }
    try {
      const res = await axios.post(
        'http://localhost:4000/api/feedbacks', {
          course,
          message
        }, {
          headers: {
            username: user.username,
            password: user.password
          },
        },
      );
      toast.success('Feedback submitted successfully!');
      return res.data;
    } catch (err) {
      const msg = err.response ? err.response.data.error : 'Failed to submit feedback.';
      toast.error(msg);
      throw err;
    }
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, loading, error }}>
      {children}
    </FeedbackContext.Provider>
  );
}