import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SentimentSummary({ summary }) {
  if (!summary || !summary.sentimentCounts) {
    return null;
  }

  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          summary.sentimentCounts.positive,
          summary.sentimentCounts.neutral,
          summary.sentimentCounts.negative,
        ],
        backgroundColor: [
          '#62F88C', // Positive: Green
          '#FFC700', // Neutral: Yellow
          '#FF625D', // Negative: Red
        ],
        hoverBackgroundColor: [
          '#87E1A2',
          '#FFDE6B',
          '#FF8986',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e0e7ff',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="card sentiment-summary-card">
      <h3>Sentiment Overview</h3>
      <p className="total-feedback-count">Total Feedback: {summary.totalFeedback}</p>
      <div className="chart-container">
        {summary.totalFeedback > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p>No data to display yet.</p>
        )}
      </div>
    </div>
  );
}

export default SentimentSummary;