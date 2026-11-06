import React, { useState } from 'react';

export default function KakuAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'kaku', text: "Hello! I'm Kaku, your AI reputation strategist. How can I help you optimize your customer reviews or draft a policy-compliant response today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const query = input;
    setInput('');

    setTimeout(() => {
      let replyText = "I've logged that strategy note. For best results on Google and Yelp, keep responses empathetic, acknowledge specific details without violating privacy, and offer an offline resolution channel.";
      
      const lower = query.toLowerCase();
      if (lower.includes('hvac') || lower.includes('temperature') || lower.includes('ac')) {
        replyText = "For HVAC reviews, always emphasize safety, NATE certification, and transparent diagnostic fees.";
      } else if (lower.includes('dental') || lower.includes('patient') || lower.includes('clinic')) {
        replyText = "Remember HIPAA compliance: never mention specific clinical treatments or patient diagnoses in public review responses.";
      } else if (lower.includes('price') || lower.includes('expensive') || lower.includes('cost')) {
        replyText = "When handling pricing complaints, refocus the response on the value of guaranteed workmanship and transparent upfront estimates.";
      }

      setMessages(prev => [...prev, { sender: 'kaku', text: replyText }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-2xl shadow-indigo-600/50 transition transform hover:scale-105 border-2 border-indigo-400/50 overflow-hidden"
          title="Chat with Kaku AI"
        >
          <img 
            src="/logo.png" 
            alt="Kaku AI Mascot" 
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300" 
          />
          <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse"></span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[500px]">
          {/* Header */}
          <div className="bg-slate-950 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-950 overflow-hidden border border-indigo-500/40 flex-shrink-0 shadow-md">
                <img src="/logo.png" alt="Kaku" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Kaku AI Advisor</h4>
                <p className="text-[10px] text-emerald-400 font-medium">Online & Ready</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask Kaku for review strategy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}