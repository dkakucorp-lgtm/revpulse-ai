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
      <nav className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/logo.png" 
              alt="RevPulse Logo" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover bg-indigo-950 flex-shrink-0 shadow-lg shadow-indigo-500/30 border border-indigo-500/30" 
            />
            <span className="font-bold text-base sm:text-xl tracking-tight text-white whitespace-nowrap">
              RevPulse<span className="text-indigo-400">.tools</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Dual Engines</a>
            <a href="#matrix" className="hover:text-white transition">Industry Matrix</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="/manual" className="hover:text-white transition">User Manual</a>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition whitespace-nowrap"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/30 whitespace-nowrap"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section: Dual-Pillar Positioning */}
      <section className="relative pt-24 pb-24 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-sm shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Enterprise AI Review Reputation & Vapi/Twilio Voice Automation Suite</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
            Dominate Local Search & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Automate Outbound Voice Calls
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
            RevPulse.tools equips local contractors, clinics, and service providers with an all-in-one growth engine: instant policy-compliant review replies and autonomous Vapi voice call queues.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-base shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              Start Your 7-Day Free Trial
            </button>
            <a
              href="/app"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl text-base transition text-center shadow-lg"
            >
              Open Live Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Dual Core Engines Section */}
      <section id="features" className="py-24 px-6 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Two Powerful Engines. One Unified Platform.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">Designed specifically for high-ticket local service operators who demand automated scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Engine 1: Review Management */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 border border-indigo-500/30">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Review Response Engine</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Instantly transform negative or positive customer reviews into empathetic, policy-compliant responses tailored exactly to Google and Yelp guidelines. Never violate privacy or platform standards again.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-400 mb-8">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Vertical-specific compliance rules (HVAC, Dental, MedSpas)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Sub-3-second generation speed</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Direct offline resolution channel prompts</span>
                  </li>
                </ul>
              </div>
              <a
                href="/app"
                className="inline-flex items-center justify-center py-3 bg-slate-950 hover:bg-indigo-950 border border-slate-800 text-indigo-300 font-semibold rounded-xl text-xs transition"
              >
                Test Generator in Dashboard &rarr;
              </a>
            </div>

            {/* Engine 2: Outbound Voice Calls */}
            <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-3xl p-8 shadow-2xl relative flex flex-col justify-between">
              <div className="absolute -top-3.5 right-6 bg-indigo-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Vapi / Twilio SIP Powered
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 border border-indigo-500/30">
                  📞
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Outbound Voice Call Queue</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Dispatch automated outbound phone calls through your Vapi and Twilio integration (+13213523645). Follow up with leads instantly, confirm appointments, and drive repeat business on autopilot.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-400 mb-8">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Automated contractor & client follow-up queues</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Real-time serverless call status logging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Custom SIP trunk integration</span>
                  </li>
                </ul>
              </div>
              <a
                href="/app"
                className="inline-flex items-center justify-center py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-indigo-600/30"
              >
                Launch Voice Queue &rarr;
              </a>
            </div>
          </div>

          {/* Kaku AI Strategist Spotlight Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-950 border border-indigo-500/40 overflow-hidden flex-shrink-0 shadow-lg">
                <img src="/kaku-mascot.png" alt="Kaku AI Mascot" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Meet Kaku — Your AI Reputation Strategist</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Embedded right inside your dashboard and floating globally across the platform. Ask Kaku for real-time reputation advice, pricing hooks, and crisis management strategies whenever you need it.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-6 py-3 bg-slate-950 hover:bg-indigo-950 border border-slate-700 text-indigo-300 font-bold rounded-xl text-xs transition whitespace-nowrap shadow-md"
            >
              Chat With Kaku &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Industry Matrix Section */}
      <section id="matrix" className="py-24 px-6 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">Deep Industry Knowledge Matrices</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">Select your business vertical to preview specialized compliance guidelines and terminology enforced by RevPulse AI.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.values(industryKnowledgeData).map((ind) => (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
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
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-3">{industryKnowledgeData[selectedIndustry].name}</h3>
              <div className="mb-6">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">Compliance & Safety Note:</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{industryKnowledgeData[selectedIndustry].complianceNotes}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">Common Industry Terminology:</span>
                <div className="flex flex-wrap gap-2">
                  {industryKnowledgeData[selectedIndustry].commonKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-950 text-slate-300 border border-slate-800 rounded-xl text-xs font-medium">
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
      <section id="pricing" className="py-24 px-6 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">Test drive both review automation and voice call queues completely risk-free for 7 days.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Starter Plan</h3>
                <p className="text-slate-400 text-sm mb-6">Ideal for single-location local service businesses.</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">$29</span>
                  <span className="text-slate-400 text-sm"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>AI Review Generator (All Verticals)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Kaku AI Strategist Access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>50</strong> Vapi Automated Voice Calls / mo</span>
                  </li>
                </ul>
              </div>
              <a
                href={STRIPE_STARTER_LINK}
                className="w-full block text-center py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                Start 7-Day Free Trial
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-950 border-2 border-indigo-500 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3.5 right-6 bg-indigo-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Most Popular
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
                <p className="text-slate-400 text-sm mb-6">For multi-location operations and growing agencies.</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">$79</span>
                  <span className="text-slate-400 text-sm"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Unlimited AI Review Responses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Priority Vapi / Twilio Voice Dispatch</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>500+</strong> Vapi Automated Voice Calls / mo</span>
                  </li>
                </ul>
              </div>
              <a
                href={STRIPE_PRO_LINK}
                className="w-full block text-center py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/30"
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

      {/* Footer with Important Links & Support */}
      <footer className="py-16 border-t border-slate-800/80 bg-slate-950 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="RevPulse Logo" className="w-8 h-8 rounded-xl object-cover bg-indigo-950" />
            <span className="font-bold text-white text-sm">RevPulse<span className="text-indigo-400">.tools</span> &copy; {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <a href="/manual" className="hover:text-white transition">User Manual</a>
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
            <a href="mailto:support@revpulse.tools" className="text-indigo-400 hover:text-indigo-300 transition font-semibold">support@revpulse.tools</a>
          </div>
        </div>
      </footer>
    </div>
  );
}