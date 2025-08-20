import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

export const FeedbackContext = createContext();

const socket = io('http://localhost:4000');

export function FeedbackProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [user, setUser] = useState({ username: 'faculty1', password: 'pass' }); // mock login

  useEffect(() => {
    if (!user) return;
    axios.get('http://localhost:4000/api/feedbacks', {
      headers: { username: user.username, password: user.password }
    }).then(res => setFeedbacks(res.data)).catch(console.error);
  }, [user]);

  useEffect(() => {
    socket.on('new-feedback', newFb => {
      setFeedbacks(prev => [newFb, ...prev]);
    });
    return () => socket.off('new-feedback');
  }, []);

  const addFeedback = async (course, message) => {
    try {
      await axios.post('http://localhost:4000/api/feedbacks', { course, message }, {
        headers: { username: user.username, password: user.password }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, user }}>
      {children}
    </FeedbackContext.Provider>
  );
}
