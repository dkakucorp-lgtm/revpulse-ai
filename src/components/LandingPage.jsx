import React, { useState } from 'react';
import AuthModal from './AuthModal';
import { industryKnowledgeData } from '../data/industryKnowledge';

const STRIPE_STARTER_LINK = "https://buy.stripe.com/bJeaEWauvcphcfVaA02cg04";
const STRIPE_PRO_LINK = "https://buy.stripe.com/9B6fZgbyz0GzbbR7nO2cg03";

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('hvac');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="RevPulse Logo" 
              className="w-10 h-10 rounded-xl object-cover bg-indigo-950 flex-shrink-0 shadow-lg shadow-indigo-500/30" 
            />
            <span className="font-bold text-xl tracking-tight text-white">
              RevPulse<span className="text-indigo-400">.tools</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#matrix" className="hover:text-white transition">Industry Matrix</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/20"
            >
              Start 7-Day Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI Review Management & Outbound Voice Built for Local Service Businesses</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Turn Frustrating Reviews Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              5-Star Local Reputation
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Automate policy-compliant, empathetic responses to Google and Yelp customer reviews and dispatch automated Vapi/Twilio voice calls in seconds. Embedded with deep industry intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-base shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              Start Your 7-Day Free Trial
            </button>
            <a
              href="/app"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl text-base transition text-center"
            >
              Open Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-900/20 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Built for Local Service Dominance</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">Everything local contractors and clinics need to maintain stellar online ratings and automate outreach.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold mb-4">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">Instant AI Responses</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Generate empathetic, policy-compliant review replies tailored to Google and Yelp guidelines in under 3 seconds.</p>
            </div>
            
            <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-2xl p-6 shadow-xl relative">
              <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Vapi / Twilio</div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold mb-4">📞</div>
              <h3 className="text-lg font-bold text-white mb-2">Automated Voice Calls</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Dispatch automated Vapi voice call queues to follow up with clients or prospects instantly using your custom phone numbers.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold mb-4">🤖</div>
              <h3 className="text-lg font-bold text-white mb-2">Kaku AI Strategist</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Chat with Kaku right inside your dashboard for real-time reputation advice and custom pricing hooks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Matrix Section */}
      <section id="matrix" className="py-20 px-6 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">Industry Knowledge Matrices</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">Select your vertical to preview specialized compliance notes, keywords, and response templates.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.values(industryKnowledgeData).map((ind) => (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedIndustry === ind.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          {industryKnowledgeData[selectedIndustry] && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">{industryKnowledgeData[selectedIndustry].name}</h3>
              <div className="mb-4">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Compliance Note:</span>
                <p className="text-xs text-slate-300 mt-1">{industryKnowledgeData[selectedIndustry].complianceNotes}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Key Terminology:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {industryKnowledgeData[selectedIndustry].commonKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-950 text-slate-300 border border-slate-800 rounded-lg text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">Test drive RevPulse AI completely risk-free for 7 days.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Starter Plan</h3>
                <p className="text-slate-400 text-sm mb-6">Single Location local service businesses.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">$29</span>
                  <span className="text-slate-400 text-sm"> / month</span>
                </div>
              </div>
              <a
                href={STRIPE_STARTER_LINK}
                className="w-full block text-center py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg"
              >
                Start 7-Day Free Trial
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-950 border-2 border-indigo-500 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
                <p className="text-slate-400 text-sm mb-6">Multi-location operations and agencies.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">$79</span>
                  <span className="text-slate-400 text-sm"> / month</span>
                </div>
              </div>
              <a
                href={STRIPE_PRO_LINK}
                className="w-full block text-center py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl transition shadow-lg"
              >
                Start 7-Day Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={() => {
          window.location.href = '/app';
        }} 
      />

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} RevPulse AI. All rights reserved.</p>
      </footer>
    </div>
  );
}