import React, { useState } from 'react';
import { supabase } from './components/supabaseClient';

export default function RevPulsePlatform() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedVertical, setSelectedVertical] = useState('hvac');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showSituationRoom, setShowSituationRoom] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { sender: 'kaku', text: 'Hello! I am Kaku, your AI reputation and onboarding assistant. Drop an error screenshot or describe any setup issue below, and I will resolve it.' }
  ]);

  const [sampleReview, setSampleReview] = useState("Terrible experience! Called for an AC repair on Tuesday, technician arrived 3 hours late, and the bill was double the estimate. Never using them again!");
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // State for logged-in user dashboard view
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert(`Registration successful! Please check your email to verify your account, or sign in now.`);
        setAuthMode('signin');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setCurrentUser(data.user);
        setShowAuthModal(false);
        // Automatically route user straight to dashboard view upon successful login!
        setActiveTab('dashboard');
      }
    } catch (error) {
      alert(`Authentication Error: ${error.message}`);
    }
  };

  const handleStripeCheckout = (planType) => {
    const stripeLinks = {
      starter: "https://buy.stripe.com/test_starter_29",
      pro: "https://buy.stripe.com/test_pro_79"
    };
    window.location.href = stripeLinks[planType] || "https://stripe.com";
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userText = chatMessage;
    setChatLogs(prev => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');
    
    setTimeout(() => {
      setChatLogs(prev => [...prev, { 
        sender: 'kaku', 
        text: `I've analyzed your query against our user manual and troubleshooting matrices. Here is the step-by-step resolution.` 
      }]);
    }, 700);
  };

  const handleDownloadManual = () => {
    const manualContent = `REVPULSE OFFICIAL ENTERPRISE USER MANUAL (v2.4)\n===================================================\n\n1. EXECUTIVE SUMMARY & ONBOARDING\n- RevPulse is an advanced AI-driven review safeguard and omnichannel messaging engine designed for local service operators.\n\n2. LOCATION & PROFILE SETUP\n- Connect Google Business Profile via OAuth2 secure token exchange.\n- Sync Yelp and Facebook Graph API connectors for real-time sentiment monitoring.\n\n3. OMNICHANNEL MESSAGING SUITE (SMS, WHATSAPP, EMAIL)\n- Configure Twilio Account SID and Auth Token for automated SMS follow-ups.\n- Register WhatsApp Business API templates to comply with carrier regulations.\n\n4. KAKU AI ASSISTANT & THE SITUATION ROOM\n- Drop error screenshots directly into the Situation Room to receive vision-language AI diagnostics and remediation commands.`;
    
    const blob = new Blob([manualContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'RevPulse_Enterprise_User_Manual.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans relative selection:bg-blue-600 selection:text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full"></div>

      <header className="border-b border-gray-800/80 bg-gray-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button onClick={() => setActiveTab('landing')} className="flex items-center space-x-2.5 group py-2 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-600 border border-purple-400/40 flex items-center justify-center text-white font-bold shadow-md">✨</div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition">RevPulse</span>
            </button>
            <nav className="hidden lg:flex space-x-5 text-sm text-gray-300 font-medium">
              <button onClick={() => setActiveTab('landing')} className={`hover:text-white transition ${activeTab === 'landing' ? 'text-blue-400 font-semibold' : ''}`}>Overview</button>
              <button onClick={() => setActiveTab('pricing')} className={`hover:text-white transition ${activeTab === 'pricing' ? 'text-blue-400 font-semibold' : ''}`}>Pricing</button>
              {currentUser && (
                <button onClick={() => setActiveTab('dashboard')} className={`hover:text-white transition ${activeTab === 'dashboard' ? 'text-blue-400 font-semibold' : ''}`}>Customer Dashboard</button>
              )}
              <button onClick={() => setActiveTab('manual')} className={`hover:text-white transition ${activeTab === 'manual' ? 'text-blue-400 font-semibold' : ''}`}>User Manual</button>
              <button onClick={() => setActiveTab('privacy')} className={`hover:text-white transition ${activeTab === 'privacy' ? 'text-blue-400 font-semibold' : ''}`}>Privacy</button>
              <button onClick={() => setActiveTab('terms')} className={`hover:text-white transition ${activeTab === 'terms' ? 'text-blue-400 font-semibold' : ''}`}>Terms</button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="hidden md:block bg-gray-900 text-gray-300 text-xs rounded-xl px-3 py-2 border border-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer">
              <option value="en">🌐 English (US)</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="es">🇪🇸 Español</option>
              <option value="ar">🇦🇪 العربية</option>
              <option value="ur">🇵🇰 اردو</option>
            </select>

            {currentUser ? (
              <button 
                onClick={() => { supabase.auth.signOut(); setCurrentUser(null); setActiveTab('landing'); }}
                className="text-xs sm:text-sm text-red-400 hover:text-red-300 transition font-medium px-2.5 py-2">
                Sign Out ({currentUser.email})
              </button>
            ) : (
              <>
                <button 
                  onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }}
                  className="text-xs sm:text-sm text-gray-300 hover:text-white transition font-medium px-2.5 py-2 whitespace-nowrap">
                  Sign In
                </button>
                <button 
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="px-3.5 py-2 sm:px-4.5 sm:py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-lg shadow-blue-600/25 whitespace-nowrap">
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {activeTab === 'landing' && (
        <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 space-y-16">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>AI-Powered Review Safeguard & Messaging</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Respond Well Before One Review Becomes Your Story.
              </h1>
              
              <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Protect your local business reputation. Instantly draft calm, privacy-compliant responses and route customer follow-ups across SMS, WhatsApp, and Email.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={() => setActiveTab('pricing')}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2">
                  <span>Get Started ($29/mo)</span>
                  <span>→</span>
                </button>
                <button 
                  onClick={handleDownloadManual}
                  className="px-6 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 font-semibold rounded-xl transition flex items-center justify-center space-x-2">
                  <span>📄 Download User Manual</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-500/30 bg-gray-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
                  alt="RevPulse SaaS Dashboard Preview" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 opacity-90" 
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-white">Live AI Dashboard Active</span>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold">Protected & Real-time</span>
                </div>
              </div>
            </div>
          </div>

          <section id="sandbox-demo" className="max-w-4xl mx-auto pt-4">
            <div className="bg-gray-900/90 border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative mt-8">
              <div className="absolute -top-10 left-6 flex items-center space-x-3 bg-gray-900 border border-blue-500/50 px-4 py-2.5 rounded-2xl shadow-2xl z-20">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">🤖</div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <span>Kaku Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div className="text-[11px] text-gray-400">Switch industries below to test live drafts!</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 pt-6">
                <div>
                  <h3 className="text-lg font-bold text-white">⚡ Interactive Review Safeguard Demo</h3>
                  <p className="text-xs text-gray-400">Select your industry and test how Kaku generates professional private replies.</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {Object.keys(verticalData).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedVertical(key);
                        setSampleReview(verticalData[key].review);
                        setAiResponse('');
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                        selectedVertical === key 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
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
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 text-sm text-gray-200 focus:outline-none focus:border-blue-500 h-28 resize-none shadow-inner"
                  />
                </div>

                <button 
                  onClick={handleGenerateResponse}
                  disabled={isGenerating}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20">
                  {isGenerating ? <span>Drafting Professional Response...</span> : <span>Generate Calm, Private-Resolution Draft</span>}
                </button>
              </div>

              {aiResponse && (
                <div className="bg-gray-950 border border-blue-900/50 rounded-2xl p-5 animate-fadeIn">
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Approved AI Output (Private Resolution First)</span>
                    <span className="text-emerald-400 text-[11px]">Ready to Deploy</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{aiResponse}</p>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {activeTab === 'dashboard' && (
        <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gray-900 border border-gray-800 p-8 rounded-3xl">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Active Workspace</span>
              <h1 className="text-3xl font-extrabold text-white mt-1">Customer & Admin Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">Welcome back, {currentUser ? currentUser.email : 'Operator'}. Monitor incoming reviews and webhook triggers here.</p>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => alert("Webhook test trigger sent successfully!")} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition shadow-lg">
                ⚡ Test Webhook / Twilio SMS
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <div className="text-xs font-semibold text-gray-400 uppercase">Monitored Locations</div>
              <div className="text-3xl font-extrabold text-white mt-2">1 Active</div>
              <div className="text-xs text-blue-400 mt-2">Google Business Profile Connected</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <div className="text-xs font-semibold text-gray-400 uppercase">Negative Reviews Intercepted</div>
              <div className="text-3xl font-extrabold text-white mt-2">0 Pending</div>
              <div className="text-xs text-emerald-400 mt-2">All pipelines protected</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <div className="text-xs font-semibold text-gray-400 uppercase">Twilio SMS Recovery Status</div>
              <div className="text-3xl font-extrabold text-white mt-2">Online</div>
              <div className="text-xs text-emerald-400 mt-2">Webhook listening on port 3000</div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white">Recent Review Activity Stream</h3>
            <div className="border border-gray-800 rounded-2xl p-4 bg-gray-950 text-sm text-gray-400 text-center py-12">
              No negative reviews (&lt; 4 stars) intercepted yet. When a customer leaves a low rating, Kaku will instantly log it here and dispatch a Twilio SMS recovery link.
            </div>
          </div>
        </section>
      )}

      {activeTab === 'pricing' && (
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-white mb-4">Transparent Unit Pricing & Plans</h1>
            <p className="text-gray-400">Select your tier to initialize secure checkout and instant workspace activation.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl flex flex-col justify-between">
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
              <button 
                onClick={() => handleStripeCheckout('starter')} 
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/25">
                Purchase $29 Starter Plan
              </button>
            </div>

            <div className="bg-gradient-to-b from-blue-950/50 to-gray-900 border border-blue-600/50 p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl">
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
              <button 
                onClick={() => handleStripeCheckout('pro')} 
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-600/25">
                Purchase $79 Pro Plan
              </button>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'manual' && (
        <section className="py-20 px-6 max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">RevPulse Official Enterprise User Manual</h1>
              <p className="text-sm text-gray-400">Complete documentation, setup playbooks, and troubleshooting guides (v2.4).</p>
            </div>
            <button onClick={handleDownloadManual} className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg transition flex items-center space-x-2">
              <span>📥 Download Enterprise PDF/TXT Manual</span>
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 space-y-8 text-sm text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-white mb-3 text-blue-400">1. Executive Summary & Onboarding</h3>
              <p className="text-gray-400">RevPulse is an advanced AI-driven review safeguard and omnichannel messaging engine designed for local service operators.</p>
            </div>
          </div>

          <button onClick={() => setActiveTab('landing')} className="px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold rounded-xl transition">
            ← Back to Overview
          </button>
        </section>
      )}

      {activeTab === 'privacy' && (
        <section className="py-20 px-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            At RevPulse, we respect your privacy and protect your business data. We never sell or share user data with third-party advertisers.
          </p>
          <button onClick={() => setActiveTab('landing')} className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl">Back to Overview</button>
        </section>
      )}

      {activeTab === 'terms' && (
        <section className="py-20 px-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-extrabold text-white">Terms of Use</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            By accessing RevPulse, you agree to month-to-month subscription flexibility with zero cancellation penalties. Cancel anytime.
          </p>
          <button onClick={() => setActiveTab('landing')} className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl">Back to Overview</button>
        </section>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-blue-500/40 rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-sm font-bold">✕</button>
            <h3 className="text-xl font-bold text-white mb-2">{authMode === 'signin' ? 'Sign In to RevPulse' : 'Create Your Account'}</h3>
            <p className="text-xs text-gray-400 mb-6">Secure authentication powered by Supabase PostgreSQL.</p>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@company.com"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg text-xs">
                {authMode === 'signin' ? 'Sign In' : 'Register Account'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button 
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-xs text-blue-400 hover:underline">
                {authMode === 'signin' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSituationRoom && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-blue-500/40 rounded-3xl max-w-2xl w-full h-[650px] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-950/60">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">🤖</div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>Kaku Situation Room</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Deep-dive technical diagnostics & error analysis</p>
                </div>
              </div>
              <button onClick={() => setShowSituationRoom(false)} className="text-gray-400 hover:text-white text-sm font-bold px-2.5 py-1 bg-gray-800 rounded-lg">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatLogs.map((log, idx) => (
                <div key={idx} className={`flex ${log.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                    log.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200 border border-gray-700'
                  }`}>
                    {log.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-950/80">
              <form onSubmit={handleSendChatMessage} className="flex space-x-2">
                <input 
                  type="text" 
                  value={chatMessage} 
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask Kaku anything about setup or errors..." 
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setShowSituationRoom(true)}
          className="flex items-center space-x-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl transition transform hover:scale-105 border border-blue-400/40 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md border border-white/30">🤖</div>
          <div className="text-left">
            <div className="text-xs font-extrabold flex items-center space-x-1.5">
              <span>Ask Kaku / Situation Room</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-blue-100 font-medium">Drop error screenshot or ask setup Qs</div>
          </div>
        </button>
      </div>

      <footer className="border-t border-gray-800/80 py-10 px-6 mt-28 text-center text-xs text-gray-400 space-y-3 bg-gray-950">
        <div className="flex justify-center space-x-6 text-gray-400 font-medium pb-2">
          <button onClick={() => setActiveTab('landing')} className="hover:text-white transition">Overview</button>
          <button onClick={() => setActiveTab('pricing')} className="hover:text-white transition">Pricing</button>
          <button onClick={() => setActiveTab('manual')} className="hover:text-white transition">User Manual</button>
          <button onClick={() => setActiveTab('privacy')} className="hover:text-white transition">Privacy Policy</button>
          <button onClick={() => setActiveTab('terms')} className="hover:text-white transition">Terms of Use</button>
        </div>
        <p>© 2026 RevPulse. All rights reserved. Contact <a href="mailto:support@revpulse.tools" className="text-blue-400 hover:underline">support@revpulse.tools</a></p>
      </footer>
    </div>
  );
}