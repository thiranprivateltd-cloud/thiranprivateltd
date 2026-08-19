'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi, I'm the Thiran AI. How can I help you navigate your career today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages([...messages, { role: 'user', text: inputValue }]);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "This is a placeholder response. In production, this will be connected to our NextStep cognitive engine." 
      }]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-teal-500 hover:bg-teal-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(29,158,117,0.5)] transition-transform hover:scale-110 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] glass-panel border border-white/20 rounded-2xl flex flex-col overflow-hidden z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-black font-bold text-xs">
                  AI
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Thiran AI</h3>
                  <p className="text-teal-400 text-[10px] uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-xl p-3 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-teal-500 text-black rounded-tr-sm' 
                        : 'bg-white/10 text-white rounded-tl-sm border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1.5 w-9 h-9 bg-teal-500 hover:bg-teal-400 rounded-full flex items-center justify-center text-black transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
