  AI Feedback Analysis System
     Team CodeXplorers
Team Members: Rashi Gupta, Kamishka Parveen
##Project Overview:##
The AI Feedback Analysis System is a real-time platform designed to streamline the process of collecting, analyzing, and visualizing feedback. This application is particularly useful for educational institutions, businesses, or any organization that needs to quickly gauge sentiment from user input.

This project is a work in progress (WIP), showcasing a proof-of-concept for a powerful, real-time feedback system. Our current implementation demonstrates key functionalities while laying the groundwork for future enhancements.

Key Features
Real-time Feedback Submission: Users can submit feedback through a simple, intuitive form.

Live Sentiment Analysis: Each message is automatically processed by an AI to determine its sentiment (positive, neutral, or negative).

Live Dashboard: A dynamic dashboard updates in real-time, showing new feedback as it arrives without requiring a page refresh.

User Authentication: Simple role-based authentication (faculty and admin) protects API endpoints, ensuring data is accessible only to authorized users.

Data Visualization: A doughnut chart provides a quick visual summary of sentiment distribution.

Technologies Used
Backend
Node.js & Express.js: To build a robust and scalable server.

Socket.io: For real-time, bidirectional communication between the server and the client.

Axios: To make HTTP requests to the external sentiment analysis API.

CORS: To handle cross-origin requests from the frontend.

Frontend
React.js: A powerful JavaScript library for building the user interface.

React Context API: For global state management, allowing real-time data to be shared across components.

Axios: To make API calls to the backend.

react-toastify: For non-intrusive, live notifications.

Chart.js & react-chartjs-2: For creating the interactive data visualization chart.

CSS: For styling the modern and responsive user interface.

How to Run the Project
Prerequisites
Node.js (v14 or higher) and npm installed.

Step 1: Backend Setup
Open your terminal and navigate to the backend folder.

Bash

cd backend
Install the required Node.js packages.

Bash

npm install
Start the backend server.

Bash

node index.js
The server will run on http://localhost:4000.

Step 2: Frontend Setup
Open a new terminal window and navigate to the frontend folder.

Bash

cd frontend
Install the required React packages.

Bash

npm install
Start the React development server.

Bash

npm start
Your application will open in your browser at http://localhost:3000.

Future Enhancements (WIP)
AI-Powered Feedback Summaries: Implement more advanced natural language processing (NLP) to generate concise summaries of large volumes of feedback.

Database Integration: Replace the in-memory array with a database (e.g., MongoDB, PostgreSQL) to persist feedback data.

Improved User Roles: Expand the user authentication system to include more granular permissions for different roles (e.g., student, course manager, admin).

Advanced Analytics: Add features like trend analysis over time, keyword extraction, and filtering by course or sentiment.

User Profiles: Allow users to manage their profiles and view their own feedback history.

This project is a strong foundation demonstrating our ability to build a robust, full-stack application that leverages AI and real-time technology to solve a practical problem.
