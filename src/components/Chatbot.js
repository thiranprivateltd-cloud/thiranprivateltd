'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi, I'm the Thiran AI. How can I help you navigate your educational and career journey today?" }
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
        text: "This is an AI guidance preview. In production, this connects to our NextStep cognitive engine for regional student advisory." 
      }]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full bg-[#D4A54A] hover:bg-[#c3943b] text-[#1A1425] flex items-center justify-center shadow-[0_0_20px_rgba(212,165,74,0.35)] transition-all hover:scale-105 cursor-pointer ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}
          title="Ask Thiran AI"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 left-6 w-80 sm:w-96 h-[480px] glass-panel border border-[#D4A54A]/30 bg-[#1A1425]/95 rounded-2xl flex flex-col overflow-hidden z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#2B1420]/80">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#D4A54A] flex items-center justify-center text-[#1A1425] font-bold text-xs">
                  AI
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Thiran Guidance AI</h3>
                  <p className="text-[#D4A54A] text-[10px] uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#D4A54A] text-[#1A1425] font-medium'
                        : 'bg-[#2B1420] text-[#FDFBF7] border border-[#D4A54A]/20'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/40 flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about careers, courses, admissions..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A]/50"
              />
              <button
                type="submit"
                className="bg-[#D4A54A] hover:bg-[#c3943b] text-[#1A1425] p-2 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
