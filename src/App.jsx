import React, { useState } from 'react';
import { supabase } from './components/supabaseClient';

export default function RevPulsePlatform() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedVertical, setSelectedVertical] = useState('hvac');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showSituationRoom, setShowSituationRoom] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [dashboardSubTab, setDashboardSubTab] = useState('overview');

  // Knowledge Center State
  const [knowledgeSearch, setKnowledgeSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const knowledgeArticles = [
    // 1. HVAC & Trades
    {
      id: 1,
      category: 'hvac',
      title: 'Handling Severe 1-Star Billing & Delay Disputes (HVAC)',
      summary: 'Framework for intercepting arrival delays and invoice disputes before they impact local search rankings.',
      content: 'When an HVAC customer leaves a low rating regarding arrival timing or pricing, Kaku instantly intercepts the public post. Acknowledge friction privately, offer a manager callback within 15 minutes, and provide a direct secure resolution link via SMS.'
    },
    {
      id: 2,
      category: 'hvac',
      title: 'Extreme Weather Dispatch & Safety Hazard Triage',
      summary: 'Managing high-panic heatwave/freeze breakdowns and communicating safety findings transparently.',
      content: 'During weather extremes, homeowners face high vulnerability. Frame safety discoveries (like cracked heat exchangers) with transparent documentation, photos, and clear explanation to avoid accusations of manufactured sales.'
    },
    // 2. Dental & Healthcare
    {
      id: 3,
      category: 'dental',
      title: 'Managing Lobby Wait Times & Patient Sentiment (Dental)',
      summary: 'Automating apology workflows and re-booking appointments when clinical delays exceed 30 minutes.',
      content: 'When lobby wait times exceed 30 minutes, automated SMS notifications should offer complimentary parking vouchers or priority scheduling while maintaining a calm, empathetic tone.'
    },
    {
      id: 4,
      category: 'dental',
      title: 'Surprise Billing & Insurance Opacity Resolution',
      summary: 'Providing transparent, plain-language financial estimates prior to major procedures to prevent chargebacks.',
      content: 'Proactively clarify out-of-network costs and coding breakdowns. Transparent communication before treatment drastically reduces patient anxiety and post-procedure billing disputes.'
    },
    // 3. General Contractors & Municipalities
    {
      id: 5,
      category: 'contractors',
      title: 'Navigating Red-Tag Stop-Work Orders & Permitting',
      summary: 'Immediate action plan when code enforcement halts construction due to permit or setback issues.',
      content: 'Address red tags immediately by coordinating directly with county plan reviewers, pulling required permits as the licensed contractor (avoiding owner-builder liability), and communicating timelines transparently to the property owner.'
    },
    {
      id: 6,
      category: 'contractors',
      title: 'Managing Hidden Condition Code Upgrades & Change Orders',
      summary: 'Handling unexpected structural rot, outdated wiring, or plumbing code traps mid-project.',
      content: 'Use digital change-order documentation with photo evidence before opening walls or performing code-mandated upgrades, ensuring the homeowner approves costs before work proceeds.'
    },
    // 4. Restaurants & Hospitality
    {
      id: 7,
      category: 'hospitality',
      title: 'Preventing the Silent Churn & Off-Premise Order Errors',
      summary: 'Resolving missing takeout items and long table wait times before guests quietly stop returning.',
      content: 'Implement double-check packing protocols for delivery/takeout and rapid manager table visits when wait times exceed quotes to salvage guest retention.'
    },
    {
      id: 8,
      category: 'hospitality',
      title: 'Severe Allergy Protocols & Dietary Mishap Recovery',
      summary: 'Immediate crisis response when cross-contamination or allergen oversights occur during service.',
      content: 'Mandate immediate kitchen accountability, direct general manager involvement, and immediate medical assistance if necessary. Follow up within 2 hours with a sincere, documented apology.'
    },
    // 5. Hotels & Short-Term Rentals
    {
      id: 9,
      category: 'hotels',
      title: 'Short-Term Rental Midnight Lockouts & Cleanliness Recovery',
      summary: 'Resolving smart-lock failures and cleaning discrepancies within the critical 15-minute window.',
      content: 'Keep emergency locksmith contacts on standby, maintain backup key lockboxes, and provide instant partial refunds or amenity credits within 15 minutes of reported cleaning lapses to secure 5-star reviews.'
    },
    {
      id: 10,
      category: 'hotels',
      title: 'Transparency in Resort Fees & Direct Booking Retention',
      summary: 'Eliminating hidden fee shock through upfront disclosure across all digital booking channels.',
      content: 'Disclose all parking, resort, and cleaning fees transparently prior to checkout to eliminate negative reviews driven by fee shock and increase direct repeat bookings.'
    },
    // 6. E-Commerce & Online Retail
    {
      id: 11,
      category: 'ecommerce',
      title: 'Proactive Fulfillment Communication & Return Fee Management',
      summary: 'Mitigating ghost tracking, delivery delays, and return friction to protect customer lifetime value.',
      content: 'Notify customers proactively via automated SMS/email when carriers experience transit bottlenecks. Offer transparent, effortless return portals to drive long-term brand loyalty.'
    },
    // 7. Automotive Repair & Dealerships
    {
      id: 12,
      category: 'automotive',
      title: 'Digital Inspections & Eliminating the "Ghost Repair" Stigma',
      summary: 'Using high-resolution photo and video text links to build absolute transparency in auto repair.',
      content: 'Send visual inspection links of worn brake pads or leaking gaskets directly to customers before beginning repairs. Complete transparency eliminates customer skepticism and boosts approval rates.'
    },
    // 8. Financial Services & CPAs
    {
      id: 13,
      category: 'financial',
      title: 'Tax Season Communication Cadence & Loan Underwriting Updates',
      summary: 'Preventing the black-hole client experience through structured weekly status reporting.',
      content: 'Implement automated weekly progress updates during loan underwriting or tax filing season so clients never experience radio silence regarding their capital or filings.'
    },
    // 9. Legal & Professional Services
    {
      id: 14,
      category: 'legal',
      title: 'Billable Hour Transparency & Proactive Client Check-Ins',
      summary: 'Eliminating cryptic invoices and communication blackouts in law firms and advisory consultancies.',
      content: 'Send detailed, value-focused itemized invoices alongside a brief Friday afternoon status summary email, ensuring clients understand the tangible progress being delivered.'
    },
    // 10. Health, Beauty & Wellness
    {
      id: 15,
      category: 'wellness',
      title: 'Managing Result Discrepancies & Cancellation Fee Disputes',
      summary: 'Handling color corrections, med-spa skin reactions, and strict cancellation policies professionally.',
      content: 'Maintain signed pre-treatment consent forms, clear patch-testing protocols, and compassionate, flexible conflict resolution for genuine personal emergencies.'
    },
    // 11. Veterinary & Pet Care
    {
      id: 16,
      category: 'veterinary',
      title: 'Itemized Treatment Estimates & ER Triage Empathy',
      summary: 'Eliminating veterinary bill shock and soothing panicked pet owners during emergency visits.',
      content: 'Always provide written, itemized treatment estimates and obtain explicit approval before running diagnostic tests. Pair medical care with profound emotional validation.'
    }
  ];

  const filteredArticles = knowledgeArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(knowledgeSearch.toLowerCase()) || art.summary.toLowerCase().includes(knowledgeSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sandbox State
  const [sandboxChannel, setSandboxChannel] = useState('sms');
  const [sandboxPhone, setSandboxPhone] = useState('+13212763473');
  const [sandboxReviewRating, setSandboxReviewRating] = useState('1');
  const [sandboxLog, setSandboxLog] = useState(null);
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);

  const [twilioConfig, setTwilioConfig] = useState({
    accountSid: '',
    authToken: '',
    phoneNumber: '',
    isLive: false
  });

  const [connectingPlatform, setConnectingPlatform] = useState(null);
  const [credentialInput, setCredentialInput] = useState('');
  
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    google: { connected: true, details: 'Google Business Profile #8821' },
    yelp: { connected: false, details: '' },
    facebook: { connected: false, details: '' }
  });

  const [chatMessage, setChatMessage] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { sender: 'kaku', text: 'Hello! I am Kaku, your AI reputation and multi-industry assistant. Ask me anything across HVAC, Medical, Legal, Veterinary, Restaurant, or E-Commerce operations!' }
  ]);

  const [sampleReview, setSampleReview] = useState("Called for an AC repair on Tuesday, technician arrived late, and the bill was higher than quoted.");
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const verticalData = {
    hvac: {
      name: "HVAC & Trades",
      review: "Tech came out late for our AC repair and the invoice was higher than quoted.",
      response: "Hello. Thank you for sharing your feedback. We regret that your service timing and billing clarity did not meet our standard. Please reach out to our service manager directly so we can review your account."
    },
    dental: {
      name: "Dental Practices",
      review: "Wait time in the lobby was over 45 minutes past my scheduled appointment slot.",
      response: "Hello, thank you for your feedback. We strive to respect your time and apologize for the delay during your visit. Please contact our practice manager so we can assist you."
    },
    contractors: {
      name: "General Contractors",
      review: "County inspector flagged our project for an unpermitted patio enclosure. Very stressed!",
      response: "Hello. We take building compliance seriously and are coordinating directly with the county office to resolve this permit inspection item immediately. Let's review the paperwork together today."
    },
    hospitality: {
      name: "Restaurants & Dining",
      review: "Ordered takeout online, drove home, and realized two entrees were completely missing.",
      response: "Hello. We apologize for the missing items in your takeout order. Please reach out to our manager directly so we can issue an immediate refund and arrange a complimentary meal for your next visit."
    },
    hotels: {
      name: "Hotels & Rentals",
      review: "Arrived at the rental property and the smart lock code didn't work for 30 minutes in the cold.",
      response: "Hello. We sincerely apologize for the lockbox delay upon your arrival. That is not the seamless experience we strive for. Please contact us directly so we can make this right."
    },
    ecommerce: {
      name: "E-Commerce Retail",
      review: "My package tracking number has been stuck on 'Label Created' for 5 days with no update.",
      response: "Hello. Thank you for bringing this fulfillment delay to our attention. We are investigating with the carrier immediately and will send you a priority replacement or tracking update today."
    },
    automotive: {
      name: "Auto Repair",
      review: "Brought my car in for a squeak, and was told I needed $1,200 in extra unneeded flushes.",
      response: "Hello. We want you to feel completely confident in our recommendations. Let's review the digital inspection photos together so we can clarify what service is truly necessary right now."
    },
    financial: {
      name: "Financial Services / CPA",
      review: "Dropped off my corporate tax documents two months ago and haven't heard a single update.",
      response: "Hello. We apologize for the communication gap during our filing queue. Your return is currently in final review, and our senior partner will call you by 2 PM today with a complete status update."
    },
    legal: {
      name: "Legal & Consulting",
      review: "My attorney hasn't returned my phone calls in three weeks regarding my case status.",
      response: "Hello. We understand how critical timely communication is for your peace of mind. Our team is pulling your case file right now to provide a comprehensive update before end of business today."
    },
    wellness: {
      name: "Health & Beauty",
      review: "Booked a balayage appointment and left with hair that turned out bright orange and damaged.",
      response: "Hello. We take your hair health and satisfaction extremely seriously. Please come back into the salon this week so our master stylist can perform a complimentary corrective treatment."
    },
    veterinary: {
      name: "Veterinary & Pets",
      review: "Was hit with a massive surprise bill at discharge without anyone discussing costs beforehand.",
      response: "Hello. We regret the lack of financial clarity regarding your pet's treatment charges. Please speak with our practice director directly so we can review the itemized statement together."
    }
  };

  const handleGenerateResponse = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiResponse(verticalData[selectedVertical]?.response || "Hello. Thank you for your feedback. We take your experience seriously and want to resolve this for you privately.");
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
        alert(`Account created successfully! 📧 Welcome confirmation email sent to ${email}. Your 7-Day Free Trial is now active.`);
        setAuthMode('signin');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setCurrentUser(data.user);
        setShowAuthModal(false);
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

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (!credentialInput.trim()) {
      alert("Please enter your page link or ID.");
      return;
    }
    setConnectedPlatforms(prev => ({
      ...prev,
      [connectingPlatform]: { connected: true, details: credentialInput }
    }));
    setConnectingPlatform(null);
    setCredentialInput('');
  };

  const handleRunSandboxTest = (e) => {
    e.preventDefault();
    setIsSandboxRunning(true);
    setSandboxLog(null);

    setTimeout(() => {
      setIsSandboxRunning(false);
      setSandboxLog({
        status: "SUCCESS (SANDBOX SIMULATION)",
        channel: sandboxChannel.toUpperCase(),
        recipient: sandboxPhone,
        ratingSimulated: `${sandboxReviewRating} Stars`,
        timestamp: new Date().toLocaleTimeString(),
        payload: sandboxChannel === 'sms' 
          ? `[Twilio Sandbox] Sent to ${sandboxPhone}: "Hi! We saw your ${sandboxReviewRating}-star feedback. Our manager wants to resolve this privately. Tap to connect: https://revpulse.tools/resolve/sandbox-token"`
          : `[WhatsApp Sandbox Template] Dispatched to ${sandboxPhone}: Template #REV_RECOVERY_V2 rendered successfully with business variables.`
      });
    }, 900);
  };

  const handleSaveTwilioConfig = (e) => {
    e.preventDefault();
    setTwilioConfig(prev => ({ ...prev, isLive: true }));
    alert("Twilio & WhatsApp API credentials saved! Your workspace is now operating in Live Production Mode.");
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
        text: `I've cross-referenced your query across our multi-industry Knowledge Center (spanning Trades, Healthcare, Legal, Retail, Veterinary, and Hospitality). Here is the verified operational framework.` 
      }]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans relative selection:bg-blue-600 selection:text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full"></div>

      <header className="border-b border-gray-800/80 bg-gray-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button onClick={() => setActiveTab('landing')} className="flex items-center space-x-2.5 group py-2 text-left bg-transparent border-none cursor-pointer">
              <img 
                src="/logo.png" 
                alt="RevPulse Logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain shadow-lg border border-purple-500/30 bg-purple-950/40" 
                onError={(e)=>{
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 rounded-xl bg-purple-600 border border-purple-400/40 items-center justify-center text-white font-bold hidden shadow-md">✨</div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition">RevPulse</span>
            </button>
            <nav className="hidden lg:flex space-x-5 text-sm text-gray-300 font-medium">
              <button onClick={() => setActiveTab('landing')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'landing' ? 'text-blue-400 font-semibold' : ''}`}>Overview</button>
              <button onClick={() => setActiveTab('pricing')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'pricing' ? 'text-blue-400 font-semibold' : ''}`}>Pricing</button>
              {currentUser && (
                <button onClick={() => setActiveTab('dashboard')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'dashboard' ? 'text-blue-400 font-semibold' : ''}`}>Customer Dashboard</button>
              )}
              <button onClick={() => setActiveTab('knowledge')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'knowledge' ? 'text-blue-400 font-semibold' : ''}`}>Knowledge Center</button>
              <button onClick={() => setActiveTab('legal')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'legal' ? 'text-blue-400 font-semibold' : ''}`}>Terms & Privacy</button>
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
                className="text-xs sm:text-sm text-red-400 hover:text-red-300 transition font-medium px-2.5 py-2 bg-transparent border-none cursor-pointer">
                Sign Out ({currentUser.email})
              </button>
            ) : (
              <>
                <button 
                  onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }}
                  className="text-xs sm:text-sm text-gray-300 hover:text-white transition font-medium px-2.5 py-2 whitespace-nowrap bg-transparent border-none cursor-pointer">
                  Sign In
                </button>
                <button 
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="px-3.5 py-2 sm:px-4.5 sm:py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-lg shadow-blue-600/25 whitespace-nowrap border-none cursor-pointer">
                  Start 7-Day Free Trial — No Card Required
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {activeTab === 'landing' && (
        <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 space-y-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>Multi-Industry AI Reputation & Omnichannel Suite</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Manage Customer Feedback Before Small Issues Escalate.
              </h1>
              
              <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Protect your reputation across trades, healthcare, legal, retail, hospitality, and professional services. Generate professional draft responses and organize follow-ups with full human oversight.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 border-none cursor-pointer">
                  <span>Start 7-Day Free Trial — No Card Required</span>
                  <span>→</span>
                </button>
                <button 
                  onClick={() => setActiveTab('knowledge')}
                  className="px-6 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 font-semibold rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer">
                  <span>📚 Explore Knowledge Center</span>
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
                    <span className="text-xs font-bold text-white">Secure Workspace Active</span>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold">Human-in-the-Loop</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Step Simple Workflow */}
          <section className="space-y-8 pt-8 border-t border-gray-800/80">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">How It Works</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Simple 3-Step Multi-Industry Workflow</h2>
              <p className="text-xs text-gray-400 max-w-lg mx-auto">Designed for operators across all sectors to maintain absolute control over every customer touchpoint.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4 relative">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 font-extrabold flex items-center justify-center text-sm">1</div>
                <h3 className="text-lg font-bold text-white">Review & Feedback Intercept</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Incoming ratings, client inquiries, and platform feedback are gathered into your unified multi-channel dashboard.</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4 relative">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-extrabold flex items-center justify-center text-sm">2</div>
                <h3 className="text-lg font-bold text-white">Human-Approved AI Drafting</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Kaku drafts professional replies tailored to your specific industry guidelines. You retain final approval before publishing.</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4 relative">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-400 font-extrabold flex items-center justify-center text-sm">3</div>
                <h3 className="text-lg font-bold text-white">Omnichannel Follow-Up</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Route private resolution links or recovery sequences via SMS, WhatsApp, or Email to resolve client concerns efficiently.</p>
              </div>
            </div>
          </section>

          {/* Interactive Demo Section with Kaku Mascot */}
          <section id="sandbox-demo" className="max-w-4xl mx-auto pt-4">
            <div className="bg-gray-900/90 border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative mt-8">
              <div className="absolute -top-10 left-6 flex items-center space-x-3 bg-gray-900 border border-blue-500/50 px-4 py-2.5 rounded-2xl shadow-2xl z-20">
                <img 
                  src="/kaku-mascot.png" 
                  alt="Kaku AI Mascot" 
                  className="w-10 h-10 rounded-xl object-cover shadow-md border border-blue-400/40 bg-gray-950"
                  onError={(e)=>{e.target.onerror=null; e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239333ea'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E";}} 
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <span>Kaku Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div className="text-[11px] text-gray-400">Test industry response templates below</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 pt-6">
                <div>
                  <h3 className="text-lg font-bold text-white">⚡ Interactive Multi-Industry Demo</h3>
                  <p className="text-xs text-gray-400">Select your industry and test how Kaku drafts professional private replies.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 max-w-md justify-end">
                  {Object.keys(verticalData).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedVertical(key);
                        setSampleReview(verticalData[key].review);
                        setAiResponse('');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
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
                    Sample Feedback ({verticalData[selectedVertical]?.name})
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
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 border-none cursor-pointer">
                  {isGenerating ? <span>Drafting Response...</span> : <span>Generate Professional Private-Resolution Draft</span>}
                </button>
              </div>

              {aiResponse && (
                <div className="bg-gray-950 border border-blue-900/50 rounded-2xl p-5 animate-fadeIn">
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Approved AI Output (Requires Human Review)</span>
                    <span className="text-emerald-400 text-[11px]">Ready for Approval</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{aiResponse}</p>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {activeTab === 'knowledge' && (
        <section className="py-20 px-6 max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Comprehensive Enterprise Hub</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">RevPulse Multi-Industry Knowledge Center</h1>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">Search across HVAC, Healthcare, Construction, Hospitality, E-Commerce, Automotive, Finance, Legal, Wellness, and Veterinary research articles.</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <input 
              type="text" 
              value={knowledgeSearch}
              onChange={(e) => setKnowledgeSearch(e.target.value)}
              placeholder="🔍 Search HVAC, dental wait times, permit red tags, medical aesthetic reactions, veterinary bills..."
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-xs text-white focus:outline-none focus:border-blue-500 shadow-inner"
            />
            
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { id: 'all', label: 'All Industries' },
                { id: 'hvac', label: 'HVAC & Trades' },
                { id: 'dental', label: 'Dental & Healthcare' },
                { id: 'contractors', label: 'Contractors & Permits' },
                { id: 'hospitality', label: 'Restaurants & Dining' },
                { id: 'hotels', label: 'Hotels & Rentals' },
                { id: 'ecommerce', label: 'E-Commerce' },
                { id: 'automotive', label: 'Auto Repair' },
                { id: 'financial', label: 'Finance & CPAs' },
                { id: 'legal', label: 'Legal & Consulting' },
                { id: 'wellness', label: 'Health & Beauty' },
                { id: 'veterinary', label: 'Veterinary & Pets' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                    selectedCategory === cat.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <div key={article.id} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-3 hover:border-blue-500/50 transition">
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">{article.category}</span>
                  <h3 className="text-base font-bold text-white">{article.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{article.summary}</p>
                  <div className="pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed bg-gray-950 p-4 rounded-2xl">
                    {article.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 text-center py-16 text-gray-500 text-xs bg-gray-900 border border-gray-800 rounded-3xl">
                No matching articles found. Try searching with different keywords or ask Kaku in the Situation Room!
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'legal' && (
        <section className="py-20 px-6 max-w-4xl mx-auto space-y-12 text-sm text-gray-300 leading-relaxed">
          <div className="border-b border-gray-800 pb-6">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Legal & Compliance</span>
            <h1 className="text-3xl font-extrabold text-white mt-1">RevPulse — Terms of Use & Privacy Policy</h1>
            <p className="text-xs text-gray-400 mt-2">Effective Date: November 11, 2026 | Operator: Imran Mateen (support@revpulse.tools)</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Part 1: Privacy Policy</h2>
            <p className="text-gray-400">
              RevPulse is operated by Imran Mateen (“RevPulse,” “we,” “us,” or “our”). This Privacy Policy explains how we collect, use, share, retain, and protect information when you visit www.revpulse.tools, create an account, use the RevPulse workspace, or contact us.
            </p>
            <h3 className="text-base font-bold text-white">1. Information We Collect</h3>
            <p className="text-gray-400">
              We collect information you provide directly (name, email, telephone number, business name, credentials, billing info, review text, and support requests). We also collect automatic technical telemetry and integration metadata when you connect business profiles.
            </p>
            <h3 className="text-base font-bold text-white">2. How We Use Information</h3>
            <p className="text-gray-400">
              We use information to operate the Service, administer your account and 7-day trial, generate AI-assisted review response drafts, process authorized communication workflows, and send service notices. We do not sell personal information or customer contact lists.
            </p>
            <h3 className="text-base font-bold text-white">3. AI-Assisted Features & Human Responsibility</h3>
            <p className="text-gray-400">
              AI-generated suggestions can be imperfect. You are solely responsible for reviewing all drafts before publication, verifying legal compliance, and ensuring no sensitive information is exposed.
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white">Part 2: Terms of Use</h2>
            <p className="text-gray-400">
              These Terms of Use govern your access to the RevPulse platform provided by Imran Mateen. By creating an account or starting a trial, you agree to these terms.
            </p>
            <h3 className="text-base font-bold text-white">1. Trial, Paid Plans & Billing</h3>
            <p className="text-gray-400">
              RevPulse offers an unrestricted 7-day free trial without requiring a payment card upfront. Paid subscription plans are billed monthly ($29/mo Starter, $79/mo Pro). You may cancel anytime through your account settings or by emailing support@revpulse.tools.
            </p>
            <h3 className="text-base font-bold text-white">2. Responsible Communications & Consent</h3>
            <p className="text-gray-400">
              If you use RevPulse for SMS, WhatsApp, or email messaging, you are the sender and are solely responsible for obtaining proper recipient consent, honoring opt-outs, and complying with carrier guidelines and applicable laws.
            </p>
            <h3 className="text-base font-bold text-white">3. Contact Information</h3>
            <p className="text-gray-400">
              For any questions regarding these terms or privacy inquiries, contact Imran Mateen directly at <strong>support@revpulse.tools</strong>.
            </p>
          </div>

          <button onClick={() => setActiveTab('landing')} className="px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold rounded-xl transition border-none cursor-pointer">
            ← Back to Overview
          </button>
        </section>
      )}

      {activeTab === 'dashboard' && (
        <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gray-900 border border-gray-800 p-8 rounded-3xl">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Active 7-Day Free Trial — No Card Required</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${twilioConfig.isLive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                  {twilioConfig.isLive ? '🟢 Live Production Mode' : '🟡 Sandbox Testing Mode'}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">Customer & Admin Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">Welcome back, {currentUser ? currentUser.email : 'Operator'}.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setDashboardSubTab('overview')} 
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition border-none cursor-pointer ${dashboardSubTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>
                📊 Overview
              </button>
              <button 
                onClick={() => setDashboardSubTab('sandbox')} 
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition border-none cursor-pointer ${dashboardSubTab === 'sandbox' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>
                🧪 Testing & Sandbox Lab
              </button>
              <button 
                onClick={() => setDashboardSubTab('trial-lifecycle')} 
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition border-none cursor-pointer ${dashboardSubTab === 'trial-lifecycle' ? 'bg-amber-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>
                📧 Trial & Email Lifecycle
              </button>
              <button 
                onClick={() => setDashboardSubTab('settings')} 
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition border-none cursor-pointer ${dashboardSubTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>
                ⚙️ Integrations & Gateway
              </button>
            </div>
          </div>

          {dashboardSubTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-gray-900 border border-gray-800 px-6 py-4 rounded-2xl">
                <div className="text-xs text-gray-300">Need to link more business profiles or test your messaging sequences?</div>
                <div className="flex space-x-3">
                  <button onClick={() => setShowConnectModal(true)} className="px-3.5 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl border-none cursor-pointer">
                    🔗 Connect Business Pages
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                  <div className="text-xs font-semibold text-gray-400 uppercase">Monitored Locations</div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    {Object.values(connectedPlatforms).filter(p => p.connected).length} Active
                  </div>
                  <div className="text-xs text-blue-400 mt-2">Google, Yelp & FB Channels Linked</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                  <div className="text-xs font-semibold text-gray-400 uppercase">Feedback Items Pending</div>
                  <div className="text-3xl font-extrabold text-white mt-2">0 Pending</div>
                  <div className="text-xs text-emerald-400 mt-2">All pipelines protected</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                  <div className="text-xs font-semibold text-gray-400 uppercase">Trial Status</div>
                  <div className="text-3xl font-extrabold text-white mt-2">7 Days Free</div>
                  <div className="text-xs text-amber-400 mt-2">Automated email nudges active</div>
                </div>
              </div>
            </div>
          )}

          {dashboardSubTab === 'sandbox' && (
            <div className="bg-gray-900 border border-purple-500/40 p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Safe Testing Window</span>
                <h3 className="text-xl font-bold text-white mt-1">Omnichannel Sandbox & Simulation Lab</h3>
                <p className="text-xs text-gray-400 mt-1">Test your SMS recovery texts and WhatsApp templates in a sandbox environment.</p>
              </div>

              <form onSubmit={handleRunSandboxTest} className="grid md:grid-cols-2 gap-6 bg-gray-950 p-6 rounded-2xl border border-gray-800">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Select Channel to Test</label>
                    <select 
                      value={sandboxChannel}
                      onChange={(e) => setSandboxChannel(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer">
                      <option value="sms">💬 Twilio SMS Recovery Text</option>
                      <option value="whatsapp">📗 WhatsApp Business Template</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Test Recipient Phone / SIM</label>
                    <input 
                      type="text" 
                      value={sandboxPhone} 
                      onChange={(e) => setSandboxPhone(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSandboxRunning}
                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition shadow-lg border-none cursor-pointer">
                    {isSandboxRunning ? 'Simulating Dispatch...' : '🧪 Run Sandbox Simulation'}
                  </button>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">Sandbox Terminal Log</div>
                    {sandboxLog ? (
                      <div className="space-y-3 text-xs font-mono">
                        <div className="text-emerald-400 font-bold">{sandboxLog.status}</div>
                        <div className="p-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-300 mt-2">
                          {sandboxLog.payload}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 italic py-12 text-center">
                        Configure your test parameters on the left and click "Run Sandbox Simulation".
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}

          {dashboardSubTab === 'trial-lifecycle' && (
            <div className="bg-gray-900 border border-amber-500/40 p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Automated Conversion Funnel</span>
                <h3 className="text-xl font-bold text-white mt-1">7-Day Free Trial & Email Lifecycle Automation</h3>
                <p className="text-xs text-gray-400 mt-1">Manage the automated welcome confirmation and Days 4, 5, and 6 trial reminder emails.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-3">
                  <span className="text-xs font-bold text-white">📧 Day 0: Account Setup Confirmation</span>
                  <p className="text-xs text-gray-400 leading-relaxed">Dispatched instantly upon registration with unrestricted 7-day trial access.</p>
                </div>
                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-3">
                  <span className="text-xs font-bold text-white">📧 Days 4, 5 & 6: Trial Nudge Sequence</span>
                  <p className="text-xs text-gray-400 leading-relaxed">Automated reminders highlighting plan options ($29 Starter or $79 Pro).</p>
                </div>
              </div>
            </div>
          )}

          {dashboardSubTab === 'settings' && (
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Production Setup</span>
                <h3 className="text-xl font-bold text-white mt-1">Twilio & WhatsApp API Gateway Credentials</h3>
              </div>

              <form onSubmit={handleSaveTwilioConfig} className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Twilio Account SID</label>
                  <input 
                    type="text" 
                    value={twilioConfig.accountSid} 
                    onChange={(e) => setTwilioConfig({...twilioConfig, accountSid: e.target.value})} 
                    placeholder="ACxxxxxxxxxxxxxxxx"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Twilio Auth Token</label>
                  <input 
                    type="password" 
                    value={twilioConfig.authToken} 
                    onChange={(e) => setTwilioConfig({...twilioConfig, authToken: e.target.value})} 
                    placeholder="••••••••••••••••"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Twilio Phone Number</label>
                  <input 
                    type="text" 
                    value={twilioConfig.phoneNumber} 
                    onChange={(e) => setTwilioConfig({...twilioConfig, phoneNumber: e.target.value})} 
                    placeholder="+1 (321) 000-0000"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition shadow-lg border-none cursor-pointer">
                    Save Gateway Credentials
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      )}

      {activeTab === 'pricing' && (
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-white mb-4">Transparent Pricing & Plans</h1>
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
              <button onClick={() => handleStripeCheckout('starter')} className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg border-none cursor-pointer">
                Start 7-Day Free Trial — No Card Required
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
                  <li className="flex items-center">✓ Built-in Testing & Sandbox Lab</li>
                </ul>
              </div>
              <button onClick={() => handleStripeCheckout('pro')} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg border-none cursor-pointer">
                Start 7-Day Free Trial — No Card Required
              </button>
            </div>
          </div>
        </section>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-blue-500/40 rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-sm font-bold bg-transparent border-none cursor-pointer">✕</button>
            <h3 className="text-xl font-bold text-white mb-2">{authMode === 'signin' ? 'Sign In to RevPulse' : 'Start 7-Day Free Trial — No Card Required'}</h3>
            <p className="text-xs text-gray-400 mb-6">Unrestricted workspace access. No payment card required upfront.</p>
            
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
              <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg text-xs border-none cursor-pointer">
                {authMode === 'signin' ? 'Sign In' : 'Activate 7-Day Free Trial'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showConnectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-purple-500/40 rounded-3xl max-w-md w-full p-8 shadow-2xl relative space-y-6">
            <button onClick={() => setShowConnectModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-sm font-bold bg-transparent border-none cursor-pointer">✕</button>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Connect Business Profiles</h3>
              <p className="text-xs text-gray-400">Link your review channels via secure API token & URL handshake.</p>
            </div>

            {connectingPlatform ? (
              <form onSubmit={handleSaveCredentials} className="space-y-4">
                <input 
                  type="text"
                  value={credentialInput}
                  onChange={(e) => setCredentialInput(e.target.value)}
                  placeholder={`https://${connectingPlatform}.com/your-business`}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
                <button type="submit" className="w-full py-3 bg-purple-600 text-white text-xs font-semibold rounded-xl border-none cursor-pointer shadow-lg">Verify & Link</button>
              </form>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-950 border border-gray-800 rounded-2xl">
                  <span className="text-xs font-bold text-white">Google Business Profile</span>
                  <button onClick={() => setConnectingPlatform('google')} className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-xl border-none cursor-pointer">Connect</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showSituationRoom && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-blue-500/40 rounded-3xl max-w-2xl w-full h-[650px] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-950/60">
              <div className="flex items-center space-x-3">
                <img 
                  src="/kaku-mascot.png" 
                  alt="Kaku" 
                  className="w-8 h-8 rounded-lg object-cover border border-blue-400/40 bg-gray-950" 
                  onError={(e)=>{e.target.onerror=null; e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239333ea'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E";}} 
                />
                <span className="text-sm font-bold text-white">Kaku Assistant & Situation Room</span>
              </div>
              <button onClick={() => setShowSituationRoom(false)} className="text-gray-400 hover:text-white text-sm font-bold px-2.5 py-1 bg-gray-800 rounded-lg border-none cursor-pointer">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatLogs.map((log, idx) => (
                <div key={idx} className={`flex ${log.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${log.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200 border border-gray-700'}`}>
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
                  placeholder="Ask Kaku anything across HVAC, Dental, Legal, Retail, Veterinary..." 
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition border-none cursor-pointer">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Kaku Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setShowSituationRoom(true)}
          className="flex items-center space-x-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl transition transform hover:scale-105 border border-blue-400/40 group cursor-pointer">
          <img 
            src="/kaku-mascot.png" 
            alt="Kaku" 
            className="w-10 h-10 rounded-xl object-cover border border-white/30 bg-gray-950 shadow-md" 
            onError={(e)=>{e.target.onerror=null; e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239333ea'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E";}} 
          />
          <div className="text-left">
            <div className="text-xs font-extrabold flex items-center space-x-1.5">
              <span>Ask Kaku / Situation Room</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-blue-100 font-medium">Multi-Industry AI Ready</div>
          </div>
        </button>
      </div>

      <footer className="border-t border-gray-800/80 py-10 px-6 mt-28 text-center text-xs text-gray-400 space-y-3 bg-gray-950">
        <div className="flex justify-center space-x-6 font-medium pb-2">
          <button onClick={() => setActiveTab('landing')} className="hover:text-white transition bg-transparent border-none cursor-pointer">Overview</button>
          <button onClick={() => setActiveTab('pricing')} className="hover:text-white transition bg-transparent border-none cursor-pointer">Pricing</button>
          <button onClick={() => setActiveTab('knowledge')} className="hover:text-white transition bg-transparent border-none cursor-pointer">Knowledge Center</button>
          <button onClick={() => setActiveTab('legal')} className="hover:text-white transition bg-transparent border-none cursor-pointer">Terms & Privacy</button>
        </div>
        <p>© 2026 RevPulse. All rights reserved. Operator: Imran Mateen (support@revpulse.tools)</p>
      </footer>
    </div>
  );
}