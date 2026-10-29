import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import {
  Star,
  MessageSquare,
  TrendingUp,
  Settings,
  RefreshCw,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  Filter,
  Sliders,
  Building2,
  ChevronRight,
  BarChart2
} from 'lucide-react';

// Sample initial review data
const INITIAL_REVIEWS = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    platform: 'Google',
    rating: 5,
    sentiment: 'Positive',
    text: 'Amazing service! The HVAC technician arrived right on time, explained the issue clearly, and fixed our AC before the hot afternoon. Highly recommended!',
    date: '2 hours ago',
    status: 'Pending',
    aiResponse: ''
  },
  {
    id: '2',
    author: 'Michael R.',
    platform: 'Yelp',
    rating: 2,
    sentiment: 'Negative',
    text: 'Overpriced for what was done. They charged a $95 service fee just to inspect the system, and the quote for the repair was double what another local place offered.',
    date: '1 day ago',
    status: 'Pending',
    aiResponse: ''
  },
  {
    id: '3',
    author: 'David L.',
    platform: 'Facebook',
    rating: 4,
    sentiment: 'Positive',
    text: 'Great customer support over the phone. The scheduling was smooth, though the technician was about 20 minutes late due to traffic.',
    date: '2 days ago',
    status: 'Responded',
    aiResponse: 'Hi David, thank you for the 4-star feedback! We are glad you enjoyed our support, and we appreciate your patience regarding the brief traffic delay.'
  }
];

export default function App() {
  // State management
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedReview, setSelectedReview] = useState(INITIAL_REVIEWS[0]);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'analytics' | 'settings'
  
  // Brand Settings State
  const [businessName, setBusinessName] = useState('Apex Climate Solutions');
  const [businessCategory, setBusinessCategory] = useState('HVAC & Plumbing');
  const [brandTone, setBrandTone] = useState('Professional & Warm');
  const [customSignOff, setCustomSignOff] = useState('Best regards, The Apex Team');
  
  // Generator State
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Initialize Gemini API Client
  const ai = useMemo(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    return apiKey ? new GoogleGenAI({ apiKey }) : null;
  }, []);

  // Filter reviews based on user selections
  const filteredReviews = useMemo(() => {
    return reviews.filter(rev => {
      const matchPlatform = filterPlatform === 'All' || rev.platform === filterPlatform;
      const matchStatus = filterStatus === 'All' || rev.status === filterStatus;
      return matchPlatform && matchStatus;
    });
  }, [reviews, filterPlatform, filterStatus]);

  // AI Response Generator using Gemini 3 Flash Preview
  const generateAiResponse = async (review) => {
    setIsGenerating(true);
    try {
      const prompt = `
You are the customer experience manager for "${businessName}", a local ${businessCategory} business.
Draft a professional, empathetic, and tailored response to the following customer review.

Review Details:
- Customer Name: ${review.author}
- Rating: ${review.rating}/5 Stars
- Platform: ${review.platform}
- Customer Review: "${review.text}"

Guidelines for Tone & Formatting:
- Tone: ${brandTone}
- Sign-off: Use "${customSignOff}"
- If the review is negative (1-3 stars), acknowledge their frustration, offer a sincere apology without making false legal admissions, and invite them to reach out directly via telephone or email to make things right.
- Keep the length concise (2-4 sentences max).

Draft Response:
      `;

      let generatedText = '';

      if (ai) {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
        generatedText = response.text?.trim() || '';
      } else {
        // Fallback simulation if no API key is set in .env.local
        await new Promise((resolve) => setTimeout(resolve, 1200));
        generatedText = review.rating >= 4
          ? `Hi ${review.author}, thank you so much for the wonderful ${review.rating}-star review! We are thrilled to hear you had a great experience with ${businessName}. ${customSignOff}`
          : `Hi ${review.author}, thank you for taking the time to share your feedback. We sincerely apologize that your experience did not meet expectations. Please reach out to us directly so we can make things right for you. ${customSignOff}`;
      }

      setReviews(prev =>
        prev.map(r => r.id === review.id ? { ...r, aiResponse: generatedText, status: 'Drafted' } : r)
      );
      
      setSelectedReview(prev =>
        prev?.id === review.id ? { ...prev, aiResponse: generatedText, status: 'Drafted' } : prev
      );
    } catch (error) {
      console.error('Error generating response:', error);
      alert('Failed to generate AI response. Please check your Gemini API key settings.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const markAsPosted = (id) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Responded' } : r)
    );
    setSelectedReview(prev => prev?.id === id ? { ...prev, status: 'Responded' } : prev);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                RevPulse AI
              </h1>
              <p className="text-xs text-slate-400">Local Review Aggregator & Auto-Responder</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'feed' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reviews Feed</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'settings' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Brand Setup</span>
            </button>
          </nav>

          {/* Business Profile Quick Indicator */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-200">{businessName}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Review Feed List (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Filter Controls */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                    <Filter className="w-3.5 h-3.5 mr-1" /> Filters
                  </span>
                  <span className="text-xs text-indigo-400 font-medium">
                    {filteredReviews.length} Reviews
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Platforms</option>
                    <option value="Google">Google</option>
                    <option value="Yelp">Yelp</option>
                    <option value="Facebook">Facebook</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Drafted">Drafted</option>
                    <option value="Responded">Responded</option>
                  </select>
                </div>
              </div>

              {/* Review Items Card List */}
              <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    onClick={() => setSelectedReview(rev)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                      selectedReview?.id === rev.id
                        ? 'bg-slate-800/90 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-slate-200">{rev.author}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          {rev.platform}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{rev.date}</span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 mb-3">{rev.text}</p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                      <span
                        className={`inline-flex items-center space-x-1 font-medium ${
                          rev.status === 'Responded'
                            ? 'text-emerald-400'
                            : rev.status === 'Drafted'
                            ? 'text-indigo-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {rev.status === 'Responded' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                        {rev.status === 'Drafted' && <Sparkles className="w-3.5 h-3.5 mr-1" />}
                        {rev.status === 'Pending' && <Clock className="w-3.5 h-3.5 mr-1" />}
                        {rev.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: AI Response Studio (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              {selectedReview ? (
                <div className="space-y-6">
                  {/* Selected Review Details */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">
                          {selectedReview.author[0]}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-100">{selectedReview.author}</h3>
                          <p className="text-xs text-slate-400">Posted on {selectedReview.platform} • {selectedReview.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < selectedReview.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-sm text-slate-200 mt-3 leading-relaxed">
                      "{selectedReview.text}"
                    </div>
                  </div>

                  {/* AI Studio Controls */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span>AI Studio Response Generator</span>
                      </h4>
                      <button
                        onClick={() => generateAiResponse(selectedReview)}
                        disabled={isGenerating}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center space-x-2 shadow-lg shadow-indigo-600/20 transition-all"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                        <span>{isGenerating ? 'Drafting...' : 'Generate AI Reply'}</span>
                      </button>
                    </div>

                    {/* AI Output Area */}
                    <div className="relative">
                      <textarea
                        rows={6}
                        value={selectedReview.aiResponse}
                        onChange={(e) =>
                          setReviews(prev =>
                            prev.map(r => r.id === selectedReview.id ? { ...r, aiResponse: e.target.value } : r)
                          )
                        }
                        placeholder="Click 'Generate AI Reply' above to draft a response..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500/80 transition-all leading-relaxed"
                      />

                      {selectedReview.aiResponse && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
                          <button
                            onClick={() => handleCopy(selectedReview.aiResponse, selectedReview.id)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs rounded-lg flex items-center space-x-1.5 transition-all"
                          >
                            {copiedId === selectedReview.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied to Clipboard</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>

                          {selectedReview.status !== 'Responded' && (
                            <button
                              onClick={() => markAsPosted(selectedReview.id)}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-600/20"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Mark as Posted</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <MessageSquare className="w-12 h-12 mb-3 text-slate-700" />
                  <p className="text-sm">Select a review from the feed to draft a reply</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                <span className="text-xs text-slate-400">Total Reviews</span>
                <p className="text-2xl font-bold text-white mt-1">{reviews.length}</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                <span className="text-xs text-slate-400">Average Rating</span>
                <p className="text-2xl font-bold text-amber-400 mt-1">3.7 / 5.0</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                <span className="text-xs text-slate-400">Response Rate</span>
                <p className="text-2xl font-bold text-indigo-400 mt-1">66%</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                <span className="text-xs text-slate-400">Avg. Response Time</span>
                <p className="text-2xl font-bold text-emerald-400 mt-1">&lt; 15 mins</p>
              </div>
            </div>
          </div>
        )}

        {/* Brand Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-5">
            <h2 className="text-base font-semibold text-slate-100 flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <span>Brand Identity & Tone Setup</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Business Category</label>
                <input
                  type="text"
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Brand Voice / Tone</label>
                <select
                  value={brandTone}
                  onChange={(e) => setBrandTone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="Professional & Warm">Professional & Warm</option>
                  <option value="Casual & Friendly">Casual & Friendly</option>
                  <option value="Formal & Executive">Formal & Executive</option>
                  <option value="Enthusiastic & Energetic">Enthusiastic & Energetic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Custom Sign-Off</label>
                <input
                  type="text"
                  value={customSignOff}
                  onChange={(e) => setCustomSignOff(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}