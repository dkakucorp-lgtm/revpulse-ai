import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Settings, 
  MessageSquare, 
  History, 
  Building2, 
  Star, 
  ArrowLeft,
  Sliders,
  ShieldCheck,
  Zap,
  Trash2
} from 'lucide-react';

export default function AppDashboard() {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'rules' | 'history'
  
  // Generator State
  const [platform, setPlatform] = useState('Google');
  const [rating, setRating] = useState(5);
  const [customerName, setCustomerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [tone, setTone] = useState('Professional & Empathetic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');
  const [copied, setCopied] = useState(false);

  // Custom Scenario Rules State (Pro Feature)
  const [businessName, setBusinessName] = useState('Apex HVAC & Plumbing');
  const [diagnosticFeeRule, setDiagnosticFeeRule] = useState('Our $95 service call fee is 100% credited toward any completed repair work.');
  const [cancellationRule, setCancellationRule] = useState('24-hour notice required for rescheduling without fee.');
  const [contactEmail, setContactEmail] = useState('support@apexhvac.com');

  // History State
  const [history, setHistory] = useState([
    {
      id: 1,
      date: 'Just now',
      platform: 'Google',
      rating: 5,
      customer: 'Sarah J.',
      review: 'Fast service! Technicians fixed our AC in under an hour.',
      reply: 'Hi Sarah! Thank you for the 5-star review. We are glad our team could restore your cooling promptly. We appreciate your trust!'
    }
  ]);

  // Response Generation Handler
  const handleGenerate = () => {
    if (!reviewText.trim()) return;
    
    setIsGenerating(true);
    setGeneratedReply('');

    // Simulated AI response generation with brand rules applied
    setTimeout(() => {
      let response = '';
      const name = customerName.trim() || 'Valued Customer';

      if (rating >= 4) {
        response = `Hi ${name}, thank you so much for the 5-star review on ${platform}! The team at ${businessName} is thrilled to hear about your great experience. We truly appreciate your business and look forward to serving you again!`;
      } else {
        response = `Hi ${name}, thank you for sharing your feedback regarding your experience with ${businessName}. We take all feedback seriously. ${
          diagnosticFeeRule ? `Please note: ${diagnosticFeeRule} ` : ''
        }We would love the opportunity to make things right for you—please reach out to us directly at ${contactEmail}.`;
      }

      setGeneratedReply(response);
      setIsGenerating(false);

      // Add to session history
      setHistory(prev => [
        {
          id: Date.now(),
          date: 'Just now',
          platform,
          rating,
          customer: name,
          review: reviewText,
          reply: response
        },
        ...prev
      ]);
    }, 800);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* App Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition mr-2">
              <ArrowLeft className="w-4 h-4" />
            </a>
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              RevPulse<span className="text-indigo-400">.tools</span>
            </span>
            <span className="hidden sm:inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ml-2">
              App Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{businessName}</div>
              <div className="text-[11px] text-slate-400">Pro Subscription</div>
            </div>
            <div className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-sm">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 gap-8">
          <button
            onClick={() => setActiveTab('generator')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'generator'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Review Generator
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'rules'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" /> Custom Scenario Rules
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'history'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" /> Response History ({history.length})
          </button>
        </div>

        {/* TAB 1: REVIEW GENERATOR */}
        {activeTab === 'generator' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" /> Review Input Details
              </h2>

              <div className="space-y-5">
                {/* Platform & Star Rating */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Platform</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    >
                      <option value="Google">Google Business</option>
                      <option value="Yelp">Yelp</option>
                      <option value="Facebook">Facebook Reviews</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Star Rating</label>
                    <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1.5 justify-around">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`p-1.5 rounded-lg transition ${rating >= star ? 'text-amber-400' : 'text-slate-600'}`}
                        >
                          <Star className={`w-5 h-5 ${rating >= star ? 'fill-amber-400' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Customer Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Raw Review Text */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Paste Customer Review</label>
                  <textarea
                    rows={4}
                    placeholder="Paste the customer's raw review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-indigo-500 transition resize-none"
                  />
                </div>

                {/* Tone Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tone Preset</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Professional & Empathetic">Professional & Empathetic</option>
                    <option value="Warm & Enthusiastic">Warm & Enthusiastic</option>
                    <option value="Direct & Firm">Direct & Firm (Fee Disputes)</option>
                    <option value="Concise">Short & Concise</option>
                  </select>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !reviewText.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 mt-2"
                >
                  <Zap className="w-4 h-4" />
                  {isGenerating ? 'Drafting Response...' : 'Generate AI Response'}
                </button>
              </div>
            </div>

            {/* AI Output Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" /> Drafted AI Response
                  </h2>
                  {generatedReply && (
                    <button
                      onClick={() => handleCopy(generatedReply)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy Response'}
                    </button>
                  )}
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 min-h-[220px] flex items-center justify-center">
                  {isGenerating ? (
                    <div className="text-slate-500 text-sm animate-pulse flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                      Applying {businessName} scenario rules...
                    </div>
                  ) : generatedReply ? (
                    <p className="text-slate-200 text-sm leading-relaxed">{generatedReply}</p>
                  ) : (
                    <p className="text-slate-500 text-sm text-center">
                      Paste a review on the left and click <strong className="text-slate-400">"Generate AI Response"</strong> to draft your reply.
                    </p>
                  )}
                </div>
              </div>

              {/* Tips Footer */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Tip: You can edit or fine-tune custom policy rules in the <strong>Custom Scenario Rules</strong> tab.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOM SCENARIO RULES */}
        {activeTab === 'rules' && (
          <div className="max-w-3xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-2">Custom Brand & Scenario Rules</h2>
              <p className="text-slate-400 text-sm">
                These rules automatically shape every generated AI response to align with your business policies.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Diagnostic / Inspection Fee Policy Rule
                </label>
                <textarea
                  rows={2}
                  value={diagnosticFeeRule}
                  onChange={(e) => setDiagnosticFeeRule(e.target.value)}
                  placeholder="e.g. Our $95 diagnostic fee is 100% credited toward completed repairs."
                  className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Cancellation / Rescheduling Policy Rule
                </label>
                <textarea
                  rows={2}
                  value={cancellationRule}
                  onChange={(e) => setCancellationRule(e.target.value)}
                  placeholder="e.g. 24-hour notice required for rescheduling."
                  className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Contact Email for Escalations</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveTab('generator')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/20"
                >
                  Save Rules & Go to Generator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESPONSE HISTORY */}
        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {history.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
                No generated responses in this session yet.
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                    <span className="font-semibold text-indigo-400">{item.platform} • {item.rating}-Star</span>
                    <span>{item.date}</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 mb-4 text-xs italic text-slate-300">
                    "{item.review}"
                  </div>

                  <div className="text-sm text-slate-200 mb-4 leading-relaxed">
                    {item.reply}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => handleCopy(item.reply)}
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Reply
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </main>
    </div>
  );
}