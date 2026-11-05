import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate user session initialization / trial activation
    const userData = {
      email: email || 'contractor@revpulse.tools',
      businessName: businessName || 'Local Service Pro',
      plan: '7-Day Free Trial Active',
    };
    
    // Save session state locally
    localStorage.setItem('revpulse_user', JSON.stringify(userData));
    
    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="RevPulse Logo" 
              className="w-8 h-8 rounded-lg object-cover bg-indigo-950 flex-shrink-0 shadow-md" 
            />
            <span className="font-bold text-lg text-white">
              RevPulse<span className="text-indigo-400">.tools</span>
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {isSignUp ? 'Start Your 7-Day Free Trial' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400">
            {isSignUp 
              ? 'Automate your customer reviews instantly. No charge for 7 days.' 
              : 'Sign in to access your review management dashboard.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                placeholder="e.g., Apex HVAC & Plumbing"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Work Email
            </label>
            <input
              type="email"
              placeholder="name@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 mt-2"
          >
            {isSignUp ? 'Continue to Secure Checkout' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-slate-400 hover:text-indigo-400 transition"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Start Free Trial"}
          </button>
        </div>
      </div>
    </div>
  );
}