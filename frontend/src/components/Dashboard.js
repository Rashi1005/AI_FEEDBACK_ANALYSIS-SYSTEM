import React, { useContext } from 'react';
import { FeedbackContext } from '../contexts/FeedbackContext';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const { feedbacks } = useContext(FeedbackContext);

  const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
  feedbacks.forEach(fb => {
    sentimentCounts[fb.sentiment] = (sentimentCounts[fb.sentiment] || 0) + 1;
  });

  const data = [
    { name: 'Positive', count: sentimentCounts.positive },
    { name: 'Negative', count: sentimentCounts.negative },
    { name: 'Neutral', count: sentimentCounts.neutral }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white">
      <h1 className="text-4xl font-bold mb-4">FeedbackIQ Dashboard</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Recent Feedbacks</h2>
        <ul className="list-disc list-inside max-h-72 overflow-auto">
          {feedbacks.slice(0, 5).map(({ id, course, message, sentiment }) => (
            <li key={id} className="mb-2">
              <strong>{course}</strong>: {message} <em className="ml-2 text-gray-300">({sentiment})</em>
            </li>
          ))}
          {feedbacks.length === 0 && <li>No feedback yet</li>}
        </ul>
      </div>
    </div>
  );
}
