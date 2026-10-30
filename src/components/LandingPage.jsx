import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Building2, 
  Zap, 
  ShieldCheck, 
  MessageSquareText, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function LandingPage() {
  // Stripe Payment Links (replace placeholders when live links are ready)
  const STRIPE_STARTER_LINK = "https://buy.stripe.com/your_starter_link_here";
  const STRIPE_PRO_LINK = "https://buy.stripe.com/your_pro_link_here";

  // Interactive Demo State
  const [selectedReview, setSelectedReview] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReply, setGeneratedReply] = useState("");

  const sampleReviews = [
    {
      author: "Sarah Jenkins",
      rating: 5,
      source: "Google Review",
      text: "Amazing service! The technician arrived right on time, explained the issue clearly, and resolved our problem before the hot afternoon. Highly recommended!",
      reply: "Hi Sarah! Thank you so much for the 5-star review. We're thrilled our technician could get everything taken care of promptly. We appreciate your business and look forward to serving you again!"
    },
    {
      author: "Michael R.",
      rating: 2,
      source: "Yelp Review",
      text: "Overpriced for what was done. They charged $95 fee just to inspect the system, and the quote for the job was double another local place.",
      reply: "Hi Michael, thank you for sharing your feedback. Our $95 diagnostic fee covers a thorough multi-point inspection by certified technicians and is always credited directly toward any repair work performed. We'd love the opportunity to review your estimate with you—please contact our team directly at support@revpulse.tools."
    }
  ];

  const handleGenerate = (index) => {
    setSelectedReview(index);
    setIsGenerating(true);
    setGeneratedReply("");
    setTimeout(() => {
      setGeneratedReply(sampleReviews[index].reply);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              RevPulse<span className="text-indigo-400">.tools</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-300 hover:text-white transition">Features</a>
            <a href="#demo" className="text-sm text-slate-300 hover:text-white transition">Live Demo</a>
            <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition">Pricing</a>
            <a 
              href="#pricing" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-md shadow-indigo-600/30"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" /> Built for HVAC, Dental, Auto & All Local Service Pros
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Turn Customer Reviews Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              5-Star Reputation Growth
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Stop spending hours drafting review responses. Whether you run a plumbing firm, dental office, auto shop, or home service business, RevPulse AI generates tailored, brand-perfect replies in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl text-base transition shadow-xl shadow-indigo-600/25"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#demo" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold px-8 py-4 rounded-xl text-base transition"
            >
              See Live Demo
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-indigo-400" /> No API Key Required</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-400" /> Instant Setup in 2 Mins</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-indigo-400" /> Custom Voice Rules</span>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 bg-slate-900/50 border-y border-slate-800/80 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Try the AI Reply Generator</h2>
            <p className="text-slate-400 text-sm sm:text-base">Select a sample review below to test how RevPulse drafts professional responses instantly.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Review Selection Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {sampleReviews.map((rev, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGenerate(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition border ${
                    selectedReview === idx 
                      ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {rev.rating}-Star {rev.source} ({rev.author})
                </button>
              ))}
            </div>

            {/* Selected Review Card */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white text-sm">{sampleReviews[selectedReview].author}</span>
                <div className="flex text-amber-400">
                  {[...Array(sampleReviews[selectedReview].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-300 text-sm italic">"{sampleReviews[selectedReview].text}"</p>
            </div>

            {/* AI Output Box */}
            <div className="bg-slate-900/40 border border-indigo-500/20 rounded-xl p-5 relative min-h-[120px] flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AI Drafted Response
                </span>
                <button 
                  onClick={() => handleGenerate(selectedReview)}
                  className="text-xs text-slate-400 hover:text-white transition"
                >
                  Regenerate
                </button>
              </div>

              {isGenerating ? (
                <div className="text-sm text-slate-500 animate-pulse">Drafting optimal response using custom guidelines...</div>
              ) : (
                <p className="text-slate-200 text-sm leading-relaxed">{generatedReply || sampleReviews[selectedReview].reply}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Engineered for Every Service Provider</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to maintain top-tier ratings and turn negative feedback into positive customer experiences across any service industry.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <div className="bg-indigo-600/10 border border-indigo-500/20 w-10 h-10 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">1.4s Instant Drafting</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              No typing needed. Paste any review and generate professional, empathetic, or promotional responses in seconds.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <div className="bg-indigo-600/10 border border-indigo-500/20 w-10 h-10 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Custom Brand Voice & Scenarios</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Define custom response rules for negative reviews, refund policies, diagnostic fees, or special offers.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <div className="bg-indigo-600/10 border border-indigo-500/20 w-10 h-10 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Multi-Location Support</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Easily manage reviews across multiple branches, service zones, or store locations from one unified dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900/40 border-t border-slate-800/80 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 text-sm sm:text-base">No hidden setup fees. Upgrade or cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-700 transition">
              <div>
                <div className="text-slate-400 font-medium text-sm mb-2">Starter Plan</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-white">$29</span>
                  <span className="text-slate-400 text-sm">/ month</span>
                </div>
                <p className="text-slate-400 text-xs mb-6 pb-6 border-b border-slate-800">
                  Ideal for single-location local service businesses getting started with AI.
                </p>

                <ul className="space-y-3.5 mb-8 text-sm text-slate-300">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Up to 50 AI Responses / mo</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Single Business Location</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Google, Yelp & Facebook Support</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Standard AI Tone Presets</li>
                </ul>
              </div>

              <a 
                href={STRIPE_STARTER_LINK}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold py-3 rounded-xl text-sm transition"
              >
                Choose Starter
              </a>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="bg-slate-950 border-2 border-indigo-500 rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl shadow-indigo-500/10">
              <div className="absolute -top-3.5 right-6 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </div>

              <div>
                <div className="text-indigo-400 font-medium text-sm mb-2">Pro Plan</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-white">$79</span>
                  <span className="text-slate-400 text-sm">/ month</span>
                </div>
                <p className="text-slate-400 text-xs mb-6 pb-6 border-b border-slate-800">
                  For growing businesses & franchises needing full brand control and unlimited scale.
                </p>

                <ul className="space-y-3.5 mb-8 text-sm text-slate-300">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited AI Responses</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Multi-Location Support</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Custom Scenarios & Voice Rules</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Priority 24/7 Email Support</li>
                </ul>
              </div>

              <a 
                href={STRIPE_PRO_LINK}
                className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl text-sm transition shadow-lg shadow-indigo-600/30"
              >
                Choose Pro Plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" /> Do I need technical experience to use this?
            </h3>
            <p className="text-slate-400 text-sm">
              Not at all. You simply paste the customer review into RevPulse, click "Generate AI Reply," and copy the generated response straight to Google, Yelp, or Facebook.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" /> How does Custom Scenario training work on the Pro Plan?
            </h3>
            <p className="text-slate-400 text-sm">
              You can set specific guidelines (e.g., how to explain diagnostic fees, late arrival policies, or refund rules).