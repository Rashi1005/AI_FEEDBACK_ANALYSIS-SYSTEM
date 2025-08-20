import React, { useState, useEffect, createContext, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { MessageCircle, TrendingUp, Users, Brain, Zap, Star, Send, Filter, Search, Download, Bell, Settings, ChevronRight, Sparkles, Target, AlertTriangle } from 'lucide-react';

// Mock data for demo
const mockFeedbacks = [
  { id: 1, course: 'React Development', message: 'The course content is amazing and well structured!', sentiment: 'positive', timestamp: '2024-01-15T10:30:00Z', rating: 5 },
  { id: 2, course: 'Machine Learning', message: 'Could use more practical examples', sentiment: 'neutral', timestamp: '2024-01-15T11:45:00Z', rating: 3 },
  { id: 3, course: 'Data Science', message: 'Instructor explains concepts very poorly', sentiment: 'negative', timestamp: '2024-01-15T12:15:00Z', rating: 2 },
  { id: 4, course: 'React Development', message: 'Love the hands-on projects and real-world examples!', sentiment: 'positive', timestamp: '2024-01-15T13:20:00Z', rating: 5 },
  { id: 5, course: 'Machine Learning', message: 'Excellent course material and great support', sentiment: 'positive', timestamp: '2024-01-15T14:30:00Z', rating: 4 }
];

const mockUsers = [
  { id: 1, username: 'faculty1', role: 'faculty', password: 'pass' },
  { id: 2, username: 'admin1', role: 'admin', password: 'pass' }
];

// Context
const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');

  const login = (username, password) => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setShowLogin(false);
      return true;
    }
    return false;
  };

  const addFeedback = (course, message) => {
    const newFeedback = {
      id: feedbacks.length + 1,
      course,
      message,
      sentiment: Math.random() > 0.6 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative',
      timestamp: new Date().toISOString(),
      rating: Math.floor(Math.random() * 5) + 1
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  if (showLogin) {
    return <LoginScreen onLogin={login} />;
  }

  // Properly URL-encode the SVG content for use in CSS `url()`
  const svgBackground = encodeURIComponent(`
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <g fill="#ffffff" fill-opacity="0.02">
          <circle cx="30" cy="30" r="2"/>
        </g>
      </g>
    </svg>
  `)
  .replace(/'/g, '%27') // Replace single quotes
  .replace(/"/g, '%22'); // Replace double quotes

  return (
    <AppContext.Provider value={{ user, feedbacks, addFeedback, searchTerm, setSearchTerm, filterCourse, setFilterCourse }}>
      {/* Main container for the application */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background pattern for visual appeal - Corrected SVG encoding */}
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml;utf8,${svgBackground}')] opacity-20`}></div>
        
        {/* Sidebar navigation component */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main content area, positioned to the right of the sidebar */}
        <div className="ml-80 min-h-screen relative">
          {/* Top navigation bar */}
          <TopBar />
          {/* Main content area for different tabs */}
          <main className="p-8">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'feedback' && <FeedbackView />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'submit' && <SubmitFeedback />}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(username, password)) {
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  // Properly URL-encode the SVG content for use in CSS `url()`
  const svgBackground = encodeURIComponent(`
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <g fill="#ffffff" fill-opacity="0.02">
          <circle cx="30" cy="30" r="2"/>
        </g>
      </g>
    </svg>
  `)
  .replace(/'/g, '%27') // Replace single quotes
  .replace(/"/g, '%22'); // Replace double quotes

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background pattern for visual appeal - Corrected SVG encoding */}
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml;utf8,${svgBackground}')] opacity-20`}></div>
      
      {/* Login form container */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          {/* App logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FeedbackAI</h1>
          <p className="text-gray-300">Your Voice, Amplified by AI</p>
        </div>
        
        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username (try: faculty1 or admin1)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password (try: pass)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Sign In
          </button>
        </form>
        
        {/* Demo credentials display */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Demo Credentials:</p>
          <p>faculty1/pass • admin1/pass</p>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab }) {
  const { user } = useContext(AppContext);
  
  // Menu items for the sidebar
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'submit', label: 'Submit Feedback', icon: Send }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 z-10">
      <div className="p-8">
        {/* App logo and title in sidebar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">FeedbackAI</h1>
            <p className="text-xs text-gray-400">AI-Powered Analysis</p>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon; // Dynamic icon component
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* User info at the bottom of the sidebar */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.username}</p>
              <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  const { searchTerm, setSearchTerm } = useContext(AppContext);
  
  return (
    <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Search input */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search feedback, courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-80"
            />
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { feedbacks } = useContext(AppContext);
  
  // Data for sentiment pie chart
  const sentimentData = [
    { name: 'Positive', value: feedbacks.filter(f => f.sentiment === 'positive').length, color: '#10B981' },
    { name: 'Neutral', value: feedbacks.filter(f => f.sentiment === 'neutral').length, color: '#F59E0B' },
    { name: 'Negative', value: feedbacks.filter(f => f.sentiment === 'negative').length, color: '#EF4444' }
  ];
  
  // Aggregate feedback by course for bar chart
  const courseData = feedbacks.reduce((acc, feedback) => {
    acc[feedback.course] = (acc[feedback.course] || 0) + 1;
    return acc;
  }, {});
  
  const chartData = Object.entries(courseData).map(([course, count]) => ({
    course: course.split(' ')[0], // Use first word for brevity in chart
    count
  }));

  return (
    <div className="space-y-8">
      {/* Dashboard header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">AI-powered feedback insights at a glance</p>
        </div>
        <div className="flex items-center gap-2 text-purple-400">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Live Analytics</span>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Feedback"
          value={feedbacks.length}
          icon={MessageCircle}
          color="from-blue-500 to-blue-600"
          trend="+12%"
        />
        <StatCard
          title="Positive Rate"
          value={`${Math.round((feedbacks.filter(f => f.sentiment === 'positive').length / feedbacks.length) * 100)}%`}
          icon={TrendingUp}
          color="from-green-500 to-green-600"
          trend="+8%"
        />
        <StatCard
          title="Active Courses"
          value={new Set(feedbacks.map(f => f.course)).size}
          icon={Target}
          color="from-purple-500 to-purple-600"
          trend="+3"
        />
        <StatCard
          title="AI Accuracy"
          value="94.2%"
          icon={Brain}
          color="from-pink-500 to-pink-600"
          trend="+2.1%"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sentiment Analysis Pie Chart */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">Sentiment Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                stroke="none"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Feedback by Course Bar Chart */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">Feedback by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="course" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Feedback section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Feedback</h3>
        <div className="space-y-4">
          {feedbacks.slice(0, 3).map(feedback => (
            <div key={feedback.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-white">{feedback.course}</span>
                    <SentimentBadge sentiment={feedback.sentiment} />
                  </div>
                  <p className="text-gray-300 text-sm">{feedback.message}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(feedback.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, trend }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-green-400 text-sm font-medium">{trend}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  );
}

function SentimentBadge({ sentiment }) {
  const colors = {
    positive: 'bg-green-500/20 text-green-400 border-green-500/30',
    neutral: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    negative: 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[sentiment]}`}>
      {sentiment}
    </span>
  );
}

function FeedbackView() {
  const { feedbacks, searchTerm, filterCourse, setFilterCourse } = useContext(AppContext);
  
  const courses = [...new Set(feedbacks.map(f => f.course))];
  
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || feedback.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Feedback Analysis</h1>
        <div className="flex items-center gap-3">
          {/* Course filter dropdown */}
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select a course</option>
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* List of filtered feedbacks */}
      <div className="grid gap-6">
        {filteredFeedbacks.map(feedback => (
          <div key={feedback.id} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/8 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-white">{feedback.course}</h3>
                <SentimentBadge sentiment={feedback.sentiment} />
              </div>
              <div className="text-right">
                {/* Star rating display */}
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(feedback.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{feedback.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Analytics() {
  const { feedbacks } = useContext(AppContext);
  
  // Mock weekly data for sentiment trends line chart
  const weeklyData = [
    { week: 'W1', positive: 12, negative: 3, neutral: 5 },
    { week: 'W2', positive: 18, negative: 2, neutral: 7 },
    { week: 'W3', positive: 15, negative: 4, neutral: 6 },
    { week: 'W4', positive: 22, negative: 1, neutral: 8 }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Advanced Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sentiment Trends Line Chart */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">Sentiment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={3} />
              <Line type="monotone" dataKey="neutral" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* AI Insights section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">AI Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <h4 className="font-semibold text-green-400 mb-2">Key Strength</h4>
              <p className="text-gray-300 text-sm">Students appreciate hands-on projects and real-world examples</p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <h4 className="font-semibold text-yellow-400 mb-2">Improvement Area</h4>
              <p className="text-gray-300 text-sm">More practical examples needed in theoretical courses</p>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">Action Required</h4>
              <p className="text-gray-300 text-sm">Instructor training recommended for Data Science course</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitFeedback() {
  const { addFeedback } = useContext(AppContext);
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addFeedback(course, message);
      setCourse('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Submit Feedback</h1>
        <p className="text-gray-300">Share your thoughts and help improve the learning experience</p>
      </div>
      
      {/* Feedback submission form */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a course</option>
              <option value="React Development">React Development</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Data Science">Data Science</option>
              <option value="Web Development">Web Development</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Your Feedback</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts, suggestions, or concerns..."
              required
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Feedback
              </>
            )}
          </button>
        </form>
        
        {/* AI Analysis information */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">AI-Powered Analysis</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Your feedback will be automatically analyzed for sentiment, topics, and actionable insights 
            using advanced natural language processing. This helps administrators quickly identify 
            trends and areas for improvement.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
