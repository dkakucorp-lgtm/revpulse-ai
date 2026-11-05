import React, { useState } from 'react';

export default function AppDashboard() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'voice' | 'rules' | 'history'

  // Review Generator Form State
  const [industryKey, setIndustryKey] = useState('hvac');
  const [platform, setPlatform] = useState('Google Business');
  const [rating, setRating] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [reviewText, setReviewText] = useState('Tech showed up fine but charged me $95 just to look at the AC unit!');
  const [tone, setTone] = useState('Professional & Empathetic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draftedResponse, setDraftedResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Voice & Back-Office Partner State
  const [directPrice, setDirectPrice] = useState('$2.80 / lb');
  const [retailPrice, setRetailPrice] = useState('$3.50 / lb');
  const [businessNotes, setBusinessNotes] = useState(
    'We supply #6 x 1-1/4 fine thread bugle head and wafer modified truss head screws. Offer active framing crews in Orange County a free 5-lb bucket drop-off on jobsites.'
  );
  const [testPhoneNumber, setTestPhoneNumber] = useState('');
  const [contractorNameInput, setContractorNameInput] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState('');

  // History State
  const [history, setHistory] = useState([
    {
      id: 1,
      date: 'Today, 2:15 PM',
      platform: 'Google Business',
      rating: 1,
      snippet: 'Charged me $95 just to look at the AC unit...',
      response: 'Dear Valued Customer, Thank you for your feedback. We understand that our $95 diagnostic fee can be surprising; however, this fee is fully credited toward any repairs made during your visit...',
    },
  ]);

  // Handle Review Reply Generation
  const handleGenerateReply = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMessage('');
    setDraftedResponse('');

    try {
      const res = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industryKey,
          platform,
          rating,
          customerName,
          reviewText,
          tone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate AI response.');
      }

      setDraftedResponse(data.reply);
      setHistory((prev) => [
        {
          id: Date.now(),
          date: 'Just now',
          platform,
          rating,
          snippet: reviewText.slice(0, 45) + '...',
          response: data.reply,
        },
        ...prev,
      ]);
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please check your OpenAI setup.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Voice Call Dispatch Trigger
  const handleTriggerVoiceCall = async (e) => {
    e.preventDefault();
    if (!testPhoneNumber) {
      alert('Please enter a phone number to test the outbound voice agent.');
      return;
    }

    setIsCalling(true);
    setCallStatus('Initiating serverless voice agent pipeline...');

    try {
      const res = await fetch('/api/make-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: testPhoneNumber, // Corrected key to match api/make-call.js
          contractorName: contractorNameInput || 'Contractor',
          directPrice,
          retailPrice,
          businessNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Voice dispatch failed.');

      setCallStatus(`Call dispatched successfully! (Call ID: ${data.callId || 'VAPI_LIVE'})`);
    } catch (err) {
      setCallStatus(`Demo Mode: Call dispatch logic ready. (${err.message})`);
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30">
              R
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              RevPulse<span className="text-indigo-400">.tools</span>
            </span>
            <span className="bg-indigo-950 border border-indigo-800 text-indigo-300 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ml-2">
              Back-Office Suite
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 rounded-full px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-300">7-Day Free Trial Active</span>
            </div>
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-semibold text-white">Apex Supply & Services</span>
              <span className="block text-[10px] text-slate-400">Executive Account</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === 'generator'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900/40 border border-slate-800/80'
            }`}
          >
            💬 Review Generator
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center space-x-2 ${
              activeTab === 'voice'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900/40 border border-slate-800/80'
            }`}
          >
            <span>🎙️ Back-Office & Voice Partner</span>
            <span className="bg-indigo-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase">
              New
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === 'rules'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900/40 border border-slate-800/80'
            }`}
          >
            ⚙️ Custom Scenario Rules
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900/40 border border-slate-800/80'
            }`}
          >
            🕒 Response History ({history.length})
          </button>
        </div>

        {/* TAB 1: REVIEW GENERATOR */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Column */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
                <span>Review Input Details</span>
                <span className="text-xs text-indigo-400 font-normal">Matrix Integrated</span>
              </h2>

              <form onSubmit={handleGenerateReply} className="space-y-5">
                {/* Industry Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Industry Vertical
                  </label>
                  <select
                    value={industryKey}
                    onChange={(e) => setIndustryKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="hvac">HVAC, Plumbing & Electrical</option>
                    <option value="dental">Dental & Medical Practices</option>
                    <option value="auto">Auto Repair & Body Shops</option>
                    <option value="medspa">MedSpas, Salons & Aesthetics</option>
                    <option value="roofing">Roofing, Solar & Construction</option>
                    <option value="legal">Legal, Financial & Insurance</option>
                    <option value="general">General Local Business</option>
                  </select>
                </div>

                {/* Platform & Star Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    >
                      <option value="Google Business">Google Business</option>
                      <option value="Yelp">Yelp</option>
                      <option value="Facebook Reviews">Facebook Reviews</option>
                      <option value="Direct Feedback">Direct Email / Web</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Star Rating
                    </label>
                    <div className="flex items-center space-x-1 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-xl transition ${
                            star <= rating ? 'text-amber-400 scale-110' : 'text-slate-700 hover:text-slate-500'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Customer Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Review Text Area */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Paste Customer Review
                  </label>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-indigo-500 transition"
                    placeholder="Paste the full customer review here..."
                    required
                  />
                </div>

                {/* Tone Preset */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Tone Preset
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Professional & Empathetic">Professional & Empathetic</option>
                    <option value="Direct & Firm">Direct & Firm (Policy Focused)</option>
                    <option value="Warm & Grateful">Warm & Grateful (For 5-Star Reviews)</option>
                    <option value="De-escalation Executive">De-escalation Executive</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
                >
                  {isGenerating ? 'Drafting Response with Industry Matrix...' : '⚡ Generate AI Response'}
                </button>
              </form>
            </div>

            {/* Response Output Column */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-white">Drafted AI Response</h2>
                  {draftedResponse && (
                    <button
                      onClick={() => navigator.clipboard.writeText(draftedResponse)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-950/60 border border-indigo-800/60 rounded-lg px-3 py-1.5 transition"
                    >
                      📋 Copy Response
                    </button>
                  )}
                </div>

                {errorMessage && (
                  <div className="bg-red-950/50 border border-red-800/80 text-red-200 text-xs p-4 rounded-xl mb-4">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {draftedResponse ? (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-normal">
                    {draftedResponse}
                  </div>
                ) : (
                  <div className="h-64 bg-slate-950/40 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-center p-6">
                    <p className="text-slate-500 text-sm">
                      Select your industry vertical, paste a review, and click <br />
                      <span className="text-indigo-400 font-medium">"Generate AI Response"</span> to see the live output.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-6">
                <p className="text-xs text-slate-500">
                  💡 <span className="text-slate-400 font-medium">Pro-Tip:</span> High-star reviews trigger automated referral requests, while 1-star reviews trigger diagnostic fee policy rules.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BACK-OFFICE & VOICE PARTNER */}
        {activeTab === 'voice' && (
          <div className="space-y-8">
            {/* Executive Partner Digest Banner */}
            <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-800/60 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-indigo-900/60 text-indigo-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                    <span>🤝 Embedded Back-Office Desk</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">Your Dedicated AI Sales & Operations Partner</h2>
                  <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                    We don't just give you a tool—we research your market, craft your high-converting price hooks, and manage automated voice outreach to contractors.
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-right min-w-[200px]">
                  <span className="text-xs text-slate-400 block font-medium">Weekly Time Saved</span>
                  <span className="text-2xl font-black text-indigo-400">14.5 Hours</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">End-of-Week Digest Sent</span>
                </div>
              </div>
            </div>

            {/* Voice & Pricing Matrix Builder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Configuration Inputs */}
              <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                  Contractor Cold Outreach & Price Hook Matrix
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Your Direct Wholesale Price
                    </label>
                    <input
                      type="text"
                      value={directPrice}
                      onChange={(e) => setDirectPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Retail Yard Benchmark Price
                    </label>
                    <input
                      type="text"
                      value={retailPrice}
                      onChange={(e) => setRetailPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Raw Business Details / Voice Intake Notes
                  </label>
                  <textarea
                    rows={4}
                    value={businessNotes}
                    onChange={(e) => setBusinessNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    Our back-office AI ingests these raw notes and generates custom phone call scripts, SMS follow-ups, and objection handlers automatically.
                  </p>
                </div>

                {/* Dispatch Test Call Panel */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-indigo-300 flex items-center space-x-2">
                    <span>📞 Test Live AI Outbound Call Hook</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Contractor Name (e.g. Mike)"
                      value={contractorNameInput}
                      onChange={(e) => setContractorNameInput(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number (+1 407...)"
                      value={testPhoneNumber}
                      onChange={(e) => setTestPhoneNumber(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    onClick={handleTriggerVoiceCall}
                    disabled={isCalling}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
                  >
                    {isCalling ? 'Dispatching Call...' : '🚀 Dispatch AI Voice Call Now'}
                  </button>

                  {callStatus && (
                    <p className="text-xs text-center text-indigo-300 font-mono bg-indigo-950/60 p-2.5 rounded-lg border border-indigo-800/40">
                      {callStatus}
                    </p>
                  )}
                </div>
              </div>

              {/* Script Strategy Preview */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 mb-4">
                    Generated Call Script Strategy
                  </h3>

                  <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                    <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                      <span className="font-bold text-indigo-400 block mb-1">Opening Sentence (Hook):</span>
                      "Hey {contractorNameInput || '[Contractor]'}, quick call from RevPulse Supply—we just brought wholesale framing screws to town at {directPrice} delivered to your site. Want us to drop off a free 5lb test bucket this Thursday?"
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                      <span className="font-bold text-emerald-400 block mb-1">If They Mention Retail Pricing ({retailPrice}):</span>
                      "I hear you! That's why we save local framing crews ~$400/month by shipping direct. We'll leave 5 lbs on site so your crew can test torque before spending a penny."
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                      <span className="font-bold text-amber-400 block mb-1">Automated SMS Action:</span>
                      Fires an immediate text via Twilio with a 1-click delivery drop off request sheet.
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
                  Updated automatically by RevPulse Back-Office Engine.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM SCENARIO RULES */}
        {activeTab === 'rules' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Custom Scenario Rules Builder</h2>
              <p className="text-slate-400 text-sm">
                Fine-tune how AI handles specific operational policies (e.g., diagnostic fees, warranty returns, late arrivals).
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Diagnostic Fee Credit Rule</h4>
                  <p className="text-xs text-slate-400">Always remind negative reviewers that the service fee applies to repairs.</p>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-semibold">Active</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">HIPAA & Medical Compliance Rule</h4>
                  <p className="text-xs text-slate-400">Never confirm or reveal patient health details in dental responses.</p>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-semibold">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RESPONSE HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-5xl mx-auto space-y-6">
            <h2 className="text-lg font-bold text-white">Recent Response & Call Activity</h2>

            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-semibold text-indigo-400">{item.platform}</span>
                    <span>{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic font-mono">"{item.snippet}"</p>
                  <p className="text-sm text-slate-200 bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                    {item.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}