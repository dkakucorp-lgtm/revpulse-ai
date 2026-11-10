import React, { useState } from 'react';

export default function RevPulsePlatform() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedVertical, setSelectedVertical] = useState('hvac');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [sampleReview, setSampleReview] = useState("Terrible experience! Called for an AC repair on Tuesday, technician arrived 3 hours late, and the bill was double the estimate. Never using them again!");
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const verticalData = {
    hvac: {
      name: "HVAC & Mechanical",
      review: "Tech came out 3 hours late for our AC repair and the invoice was higher than quoted.",
      response: "Hello. Thank you for sharing your feedback. We regret that your service timing and billing clarity did not meet our standard. Please reach out to our service manager directly at our office so we can review your account details and resolve this privately."
    },
    dental: {
      name: "Dental Practices",
      review: "Wait time in the lobby was over 45 minutes past my scheduled appointment slot.",
      response: "Hello, thank you for your feedback. We strive to respect your time and apologize for the delay during your visit. Please contact our practice manager so we can ensure a smoother experience at your next appointment."
    },
    auto: {
      name: "Auto Repair",
      review: "Repairs took two days longer than promised and communication was lacking.",
      response: "Hello. We understand how important your vehicle is and regret the delay in completing your service. Please reach out to our service desk directly so we can discuss your experience and make it right."
    },
    contractors: {
      name: "General Contractors",
      review: "Cleanup after the kitchen remodel was messy and debris was left behind.",
      response: "Hello. Thank you for bringing this to our attention. We hold our job sites to a high standard of cleanliness and apologize for the oversight. Please contact our project lead so we can address this immediately."
    }
  };

  const handleGenerateResponse = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiResponse(verticalData[selectedVertical].response);
      setIsGenerating(false);
    }, 800);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    alert(`Successfully ${authMode === 'signin' ? 'signed in' : 'registered'} as ${email}! Redirecting to workspace...`);
    setShowAuthModal(false);
    setActiveTab('app');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans relative">
      {/* Navigation Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="https://www.revpulse.tools" className="flex items-center space-x-3 group">
              <img src="/logo.PNG" alt="RevPulse Logo" className="w-8 h-8 rounded-lg object-contain shadow-md" />
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition">RevPulse</span>
            </a>
            <nav className="hidden md:flex space-x-6 text-sm text-gray-300">
              <button onClick={() => setActiveTab('landing')} className={`hover:text-white transition ${activeTab === 'landing' ? 'text-blue-400 font-semibold' : ''}`}>Features</button>
              <button onClick={() => setActiveTab('pricing')} className={`hover:text-white transition ${activeTab === 'pricing' ? 'text-blue-400 font-semibold' : ''}`}>Pricing & Channels</button>
              <button onClick={() => setActiveTab('compliance')} className={`hover:text-white transition ${activeTab === 'compliance' ? 'text-blue-400 font-semibold' : ''}`}>Trust & Compliance</button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* European & Global Multilingual Selector */}
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="hidden sm:block bg-gray-800 text-gray-300 text-xs rounded-lg px-2.5 py-1.5 border border-gray-700 focus:outline-none">
              <option value="en">🌐 English (US)</option>
              <option value="fr">🇫🇷 Français (France)</option>
              <option value="it">🇮🇹 Italiano (Italy)</option>
              <option value="nl">🇳🇱 Nederlands (Dutch)</option>
              <option value="es">🇪🇸 Español</option>
              <option value="ar">🇦🇪 العربية (MENA)</option>
              <option value="ur">🇵🇰 اردو</option>
            </select>

            <button 
              onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }}
              className="text-sm text-gray-300 hover:text-white transition font-medium px-3 py-2">
              Sign In
            </button>

            <button 
              onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition shadow-lg shadow-blue-600/20">
              Get Started Free
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Switcher */}
      {activeTab === 'landing' && (
        <main>
          <section className="py-20 px-6 text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-3 py-1 bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              Omnichannel Reputation & Messaging Engine
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Respond Well Before One Review Becomes Your Story.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Draft calm, privacy-conscious review replies and route regional customer follow-ups across SMS, WhatsApp, and Email.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setActiveTab('app')}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-xl">
                Explore Live Demo Sandbox
              </button>
              <button 
                onClick={() => setActiveTab('pricing')}
                className="px-8 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition">
                View Itemized Pricing
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              🔒 Month-to-month flexibility • Zero cancellation penalties • <span className="text-blue-400 font-medium">Cancel Anytime</span>
            </p>
          </section>

          {/* Interactive Demo with Kaku Mascot */}
          <section className="py-12 px-6 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl relative mt-6">
              
              {/* Properly Positioned Kaku Mascot Badge */}
              <div className="absolute -top-10 left-6 flex items-center space-x-3 bg-gray-900 border border-blue-500/50 px-4 py-2 rounded-2xl shadow-xl z-10">
                <img src="/kaku-mascot.png" alt="Kaku AI Mascot" className="w-9 h-9 rounded-xl object-cover shadow-md border border-blue-400/40" />
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-1">
                    <span>Kaku Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div className="text-[11px] text-gray-400">Switch industries below to test live drafts!</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 pt-4">
                <h3 className="text-lg font-bold text-white">⚡ Interactive Review Safeguard Demo</h3>
                
                <div className="flex flex-wrap gap-2">
                  {Object.keys(verticalData).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedVertical(key);
                        setSampleReview(verticalData[key].review);
                        setAiResponse('');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        selectedVertical === key 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      {verticalData[key].name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Simulated Customer Complaint ({verticalData[selectedVertical].name})
                  </label>
                  <textarea 
                    value={sampleReview} 
                    onChange={(e) => setSampleReview(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-blue-500 h-24 resize-none"
                  />
                </div>

                <button 
                  onClick={handleGenerateResponse}
                  disabled={isGenerating}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition flex items-center justify-center space-x-2">
                  {isGenerating ? <span>Drafting Professional Response...</span> : <span>Generate Calm, Private-Resolution Draft</span>}
                </button>
              </div>

              {aiResponse && (
                <div className="bg-gray-950 border border-blue-900/50 rounded-xl p-4 animate-fadeIn">
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Approved AI Output (Private Resolution First)</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{aiResponse}</p>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button onClick={() => alert("Copied to clipboard!")} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs rounded-lg font-medium">Copy Text</button>
                    <button onClick={() => alert("Approved for publishing!")} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs rounded-lg font-medium">Approve & Publish</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {activeTab === 'pricing' && (
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-white mb-4">Transparent Unit Pricing & Plans</h1>
            <p className="text-gray-400">Predictable monthly software tiers paired with pay-as-you-go itemized channel costs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Starter Plan</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-4">Single Location</h3>
                <div className="text-4xl font-extrabold text-white mb-6">$29<span className="text-sm text-gray-400 font-normal"> / month</span></div>
                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  <li className="flex items-center">✓ Assisted review-response workflow</li>
                  <li className="flex items-center">✓ Strict human approval controls</li>
                  <li className="flex items-center">✓ Multi-industry prompt matrices</li>
                </ul>
              </div>
              <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition">
                Start 7-Day Trial
              </button>
            </div>

            <div className="bg-gradient-to-b from-blue-950/40 to-gray-900 border border-blue-600/50 p-8 rounded-2xl flex flex-col justify-between relative shadow-2xl">
              <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">Most Popular</div>
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Pro Plan</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-4">Multi-Location & Scale</h3>
                <div className="text-4xl font-extrabold text-white mb-6">$79<span className="text-sm text-gray-400 font-normal"> / month</span></div>
                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  <li className="flex items-center">✓ Up to 3 active locations</li>
                  <li className="flex items-center">✓ Omnichannel SMS, WhatsApp & Email suite</li>
                  <li className="flex items-center">✓ Priority support & template playbooks</li>
                </ul>
              </div>
              <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/25">
                Start Pro Trial
              </button>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'compliance' && (
        <section className="py-20 px-6 max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-4">Trust & Compliance Standards</h1>
            <p className="text-gray-400 leading-relaxed">
              RevPulse is engineered with strict operational safeguards to protect your brand, maintain customer privacy, and ensure alignment with platform best practices.
            </p>
          </div>
        </section>
      )}

      {activeTab === 'app' && (
        <main className="py-10 px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Customer & Reputation Management</h1>
              <p className="text-sm text-gray-400">Secure Admin Workspace • Active Location #1</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-gray-300 font-medium">Secure Session Active</span>
            </div>
          </div>
        </main>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm">✕</button>
            
            <h3 className="text-xl font-bold text-white mb-2">
              {authMode === 'signin' ? 'Sign In to RevPulse' : 'Create Your RevPulse Account'}
            </h3>
            <form onSubmit={handleAuthSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Work Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@yourcompany.com" className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg">
                {authMode === 'signin' ? 'Sign In to Dashboard' : 'Start 7-Day Free Trial'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6 mt-20 text-center text-xs text-gray-400 space-y-2">
        <p>© 2026 RevPulse. All rights reserved. For assistance and inquiries, contact <a href="mailto:support@revpulse.tools" className="text-blue-400 hover:underline">support@revpulse.tools</a></p>
        <p className="text-gray-500">Month-to-month flexibility • Zero cancellation penalties • Cancel Anytime</p>
      </footer>
    </div>
  );
}