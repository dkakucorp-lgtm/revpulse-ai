import React from 'react';

// REPLACE THESE WITH YOUR COPIED STRIPE PAYMENT LINKS FROM YOUR DASHBOARD
const STRIPE_STARTER_LINK = "https://buy.stripe.com/your_actual_starter_link";
const STRIPE_PRO_LINK = "https://buy.stripe.com/your_actual_pro_link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="RevPulse Logo" 
              className="w-10 h-10 rounded-xl object-contain shadow-lg shadow-indigo-500/30" 
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
            <a
              href="/app"
              className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/20"
            >
              Start 7-Day Free Trial
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI Review Management Built for Local Service Businesses</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Turn Frustrating Reviews Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              5-Star Local Reputation
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Automate policy-compliant, empathetic responses to Google and Yelp customer reviews in seconds. Embedded with deep industry intelligence for HVAC, Dental, Auto Repair, MedSpas, and Contractors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-base shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              Start Your 7-Day Free Trial
            </a>
            <a
              href="/app"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl text-base transition"
            >
              Try Live Demo
            </a>
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center">
              <svg className="w-4 h-4 text-emerald-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              7-Day Free Trial
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-emerald-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Cancel Anytime
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-emerald-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Instant Setup
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              Test drive RevPulse AI completely risk-free for 7 days. Select the plan that fits your business footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between relative hover:border-slate-700 transition">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Starter Plan</h3>
                  <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full">Single Location</span>
                </div>
                <p className="text-slate-400 text-sm mb-6">Perfect for independent local service businesses looking to protect their brand reputation.</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">$29</span>
                  <span className="text-slate-400 text-sm font-medium"> / month</span>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">7 Days Free Trial included</p>
                </div>

                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 60 AI Response Generations / mo
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Access to All Industry Knowledge Matrices
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Google & Yelp Tone Customization
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom Policy Rule Builder
                  </li>
                </ul>
              </div>

              <a
                href={STRIPE_STARTER_LINK}
                className="w-full block text-center py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                Start 7-Day Free Trial
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-950 border-2 border-indigo-500 rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl shadow-indigo-600/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Most Popular
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                  <span className="text-xs font-semibold px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800/60 rounded-full">Multi-Location</span>
                </div>
                <p className="text-slate-400 text-sm mb-6">Designed for growing service operations, multi-unit clinics, and agencies.</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">$79</span>
                  <span className="text-slate-400 text-sm font-medium"> / month</span>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">7 Days Free Trial included</p>
                </div>

                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-emerald-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold text-white">Unlimited</span> AI Response Generations
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom Brand Voice Profiles
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Multi-location Business Management
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Priority Serverless API Processing
                  </li>
                </ul>
              </div>

              <a
                href={STRIPE_PRO_LINK}
                className="w-full block text-center py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-600/40"
              >
                Start 7-Day Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} RevPulse AI. All rights reserved.</p>
      </footer>
    </div>
  );
}