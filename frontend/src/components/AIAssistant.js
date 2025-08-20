import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';

export default function AIAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello! I am ARIA, your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: 'I am analyzing your query. This feature is coming soon!' }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
      <div className="w-full max-w-lg bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl shadow-xl flex flex-col h-96">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Bot className="w-6 h-6" /> ARIA AI Assistant
          </h3>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-white/10">
          {messages.map(m => (
            <div
              key={m.id}
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                m.type === 'user'
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-white/40 text-black'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2 px-6 py-3 border-t border-white/20">
          <input
            type="text"
            className="flex-1 rounded-xl px-4 py-2 bg-white/20 text-white placeholder-white/50 focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
