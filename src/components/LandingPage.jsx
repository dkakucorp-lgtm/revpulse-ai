import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Building2, 
  Zap, 
  ShieldCheck, 
  MessageSquareText, 
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Wrench,
  Stethoscope,
  Car,
  Scissors,
  Home,
  Scale,
  Briefcase
} from 'lucide-react';

export default function LandingPage() {
  // Stripe Payment Links
  const STRIPE_STARTER_LINK = "https://buy.stripe.com/your_starter_link_here";
  const STRIPE_PRO_LINK = "https://buy.stripe.com/your_pro_link_here";

  // Industry Profile Data Engine
  const industryProfiles = {
    hvac: {
      id: "hvac",
      label: "HVAC, Plumbing & Electrical",
      icon: Wrench,
      heroHeadline: "Turn Emergency Service Calls & Fee Complaints Into 5-Star Reviews",
      subHeadline: "Stop letting diagnostic fee complaints or scheduling delays hurt your rating. RevPulse AI handles home service feedback with speed, tact, and professionalism.",
      sampleReviews: [
        {
          author: "Sarah Jenkins",
          rating: 5,
          source: "Google Review",
          text: "Amazing service! The HVAC technician arrived right on time, explained the AC issue clearly, and fixed it before the afternoon heat. Highly recommended!",
          reply: "Hi Sarah! Thank you so much for the 5-star review. We're thrilled our technician could get your AC back up and running promptly. We appreciate your trust and look forward to serving you again!"
        },
        {
          author: "Michael R.",
          rating: 2,
          source: "Yelp Review",
          text: "Overpriced. They charged a $95 fee just to inspect the system, and the repair quote was higher than expected.",
          reply: "Hi Michael, thank you for sharing your feedback. Our $95 diagnostic fee covers a thorough multi-point inspection by certified technicians and is always credited 100% toward any repair work performed. We'd love to review your quote with you—please reach out to us directly at support@revpulse.tools."
        }
      ]
    },
    dental: {
      id: "dental",
      label: "Dental & Medical Practices",
      icon: Stethoscope,
      heroHeadline: "Turn Patient Feedback & Wait Time Complaints Into 5-Star Reputation",
      subHeadline: "Navigate delicate patient experiences with empathetic, HIPAA-conscious review responses generated automatically in seconds.",
      sampleReviews: [
        {
          author: "Elena Rostova",
          rating: 5,
          source: "Google Review",
          text: "Dr. Smith and the staff were incredible! I've always had severe dental anxiety, but they made my crown replacement completely pain-free and comfortable.",
          reply: "Thank you so much Elena for your kind words! We know dental visits can be stressful, so hearing that our team made you feel completely at ease means the world to us. We look forward to seeing you at your next checkup!"
        },
        {
          author: "David K.",
          rating: 2,
          source: "Google Review",
          text: "Waited 45 minutes past my scheduled appointment time before being called back to the chair.",
          reply: "Hi David, thank you for bringing this to our attention. While emergency dental cases can occasionally create unexpected delays in our schedule, we deeply respect your time. Please contact our office manager directly so we can ensure a smoother experience for your next visit."
        }
      ]
    },
    auto: {
      id: "auto",
      label: "Auto Repair & Body Shops",
      icon: Car,
      heroHeadline: "Turn Parts Delays & Repair Estimates Into Loyal Repeat Customers",
      subHeadline: "Build ultimate trust with car owners by addressing pricing queries, warranty details, and labor estimates with transparent, AI-drafted replies.",
      sampleReviews: [
        {
          author: "Marcus Vance",
          rating: 5,
          source: "Google Review",
          text: "Got my brake pads and rotors replaced here. Fast turn-around, transparent pricing with no hidden charges, and the car drives like new!",
          reply: "Thanks Marcus! We appreciate your business and are glad to hear your car is driving smoothly. Safety and transparent pricing are our top priorities—drive safe!"
        },
        {
          author: "Jason T.",
          rating: 2,
          source: "Yelp Review",
          text: "Repair took two days longer than estimated because they had to order a part.",
          reply: "Hi Jason, thank you for your feedback. We apologize for the extended wait time while sourcing OEM parts for your vehicle. We strive to provide accurate timelines and will work on communicating shipping delays even more proactively in the future."
        }
      ]
    },
    medspa: {
      id: "medspa",
      label: "MedSpas, Salons & Aesthetics",
      icon: Scissors,
      heroHeadline: "Turn Client Consultations & Service Feedback Into 5-Star Glamour",
      subHeadline: "Maintain a luxury brand image with warm, stylish, and high-touch review responses that encourage repeat bookings and referral business.",
      sampleReviews: [
        {
          author: "Jessica M.",
          rating: 5,
          source: "Google Review",
          text: "The hydrafacial with Amanda was incredible! My skin is glowing, and the clinic atmosphere is so relaxing.",
          reply: "Thank you so much Jessica! We're thrilled to hear you enjoyed your hydrafacial session with Amanda. We can't wait to welcome you back for your next self-care day!"
        },
        {
          author: "Rachel B.",
          rating: 2,
          source: "Yelp Review",
          text: "Had to reschedule my appointment due to a traffic delay and was charged a $50 late cancellation fee.",
          reply: "Hi Rachel, thank you for sharing your thoughts. Our 24-hour cancellation policy helps us respect our providers' schedules, but we completely understand that traffic emergencies happen. Please reach out to our desk manager so we can apply a credit toward your rescheduled visit."
        }
      ]
    },
    roofing: {
      id: "roofing",
      label: "Roofing, Solar & Construction",
      icon: Home,
      heroHeadline: "Turn Project Quotes & Storm Cleanup Feedback Into Big-Ticket Contracts",
      subHeadline: "Showcase your craftsmanship and reliability on high-value jobs by handling contractor reviews with confidence and clarity.",
      sampleReviews: [
        {
          author: "Robert Chen",
          rating: 5,
          source: "Google Review",
          text: "Replaced our storm-damaged roof in two days. The crew did a full magnetic sweep for nails on the lawn afterward. Super professional!",
          reply: "Thank you Robert! Protecting your property and making sure your lawn is spotless post-installation is our standard. We appreciate your recommendation!"
        },
        {
          author: "Chris P.",
          rating: 2,
          source: "Google Review",
          text: "Initial quote was detailed, but crew arrived two hours late on day one due to weather.",
          reply: "Hi Chris, thank you for your feedback. Weather safety is crucial for our roofing crews, but we apologize for not notifying you earlier in the morning regarding the delayed start. We appreciate your patience and are glad the rest of the installation went seamlessly."
        }
      ]
    },
    legal: {
      id: "legal",
      label: "Legal, Financial & Insurance",
      icon: Scale,
      heroHeadline: "Turn Client Consultations Into High-Authority Professional Trust",
      subHeadline: "Maintain strict legal standards while protecting your reputation with measured, dignified, and professional AI-generated replies.",
      sampleReviews: [
        {
          author: "Daniel K.",
          rating: 5,
          source: "Google Review",
          text: "Handled my business contract dispute swiftly and saved us thousands in potential court costs. Truly exceptional representation.",
          reply: "Thank you Daniel for your feedback. Providing strategic, cost-effective guidance for local business owners is our primary goal. It was a pleasure representing your firm."
        },
        {
          author: "Anonymous User",
          rating: 2,
          source: "Google Review",
          text: "Called for a consultation and felt the retainer fee structure wasn't explained clearly enough upfront.",
          reply: "Thank you for bringing this to our attention. We aim for complete clarity regarding our fee structures and retainers prior to engagement. We welcome the opportunity to discuss your concerns directly—please reach out to our office manager."
        }
      ]
    },
    general: {
      id: "general",
      label: "All Other Local Service Businesses",
      icon: Briefcase,
      heroHeadline: "Turn Every Review Into 5-Star Local Reputation Growth",
      subHeadline: "Stop spending hours drafting replies. RevPulse AI generates tailored, brand-perfect responses to Google, Yelp, and Facebook reviews in seconds.",
      sampleReviews: [
        {
          author: "Sarah Jenkins",
          rating: 5,
          source: "Google Review",
          text: "Amazing customer service! Prompt, polite, and resolved my issue on the very first try. Highly recommended!",
          reply: "Hi Sarah! Thank you so much for the 5-star review. We're thrilled we could take care of everything for you promptly. We appreciate your business and look forward to working with you again!"
        },
        {
          author: "Michael R.",
          rating: 2,
          source: "Yelp Review",
          text: "Pricing was higher than estimated, and it took longer than originally promised.",
          reply: "Hi Michael, thank you for sharing your feedback. We strive to provide transparent estimates and clear timelines. We'd love the opportunity to review your experience with you—please contact our management team directly at support@revpulse.tools."
        }
      ]
    }
  };

  // State Management
  const [selectedIndustry, setSelectedIndustry] = useState("hvac");
  const [selectedReviewIdx, setSelectedReviewIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReply, setGeneratedReply] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ind = params.get('industry');
    if (ind && industryProfiles[ind]) {
      setSelectedIndustry(ind);
    }
  }, []);

  const activeProfile = industryProfiles[selectedIndustry] || industryProfiles.general;
  const ActiveIcon = activeProfile.icon;

  const handleIndustryChange = (e) => {
    const newInd = e.target.value;
    setSelectedIndustry(newInd);
    setSelectedReviewIdx(0);
    setGeneratedReply("");
  };

  const handleGenerate = (index) => {
    setSelectedReviewIdx(index);
    setIsGenerating(true);
    setGeneratedReply("");
    setTimeout(() => {
      setGeneratedReply(activeProfile.sampleReviews[index].reply);
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
      <section className="relative pt-16 pb-16 md:pt-28 md:pb-24 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-slate-900/90 border border-indigo-500/30 p-2 sm:px-4 sm:py-2 rounded-2xl mb-8 shadow-xl">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <ActiveIcon className="w-4 h-4 text-indigo-400" /> Select Your Industry:
            </span>
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedIndustry}
                onChange={handleIndustryChange}
                className="w-full sm:w-auto bg-slate-950 border border-slate-700 hover:border-indigo-500 text-white text-xs font-bold rounded-lg px-3 py-1.5 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {Object.values(industryProfiles).map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            {activeProfile.heroHeadline.split('5-Star')[0]}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              5-Star {activeProfile.heroHeadline.split('5-Star')[1] || 'Reputation'}
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            {activeProfile.subHeadline}
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
              Test Live Demo
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-indigo-400" /> No API Key Required</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-400" /> Setup in 2 Minutes</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-indigo-400" /> Custom Voice Rules</span>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 bg-slate-900/50 border-y border-slate-800/80 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <ActiveIcon className="w-3.5 h-3.5" /> Tailored for {activeProfile.label}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">See How RevPulse Responds</h2>
            <p className="text-slate-400 text-sm sm:text-base">Select a sample review below to test how RevPulse drafts custom responses for your industry.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-wrap gap-3 mb-6">
              {activeProfile.sampleReviews.map((rev, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGenerate(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition border ${
                    selectedReviewIdx === idx 
                      ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {rev.rating}-Star {rev.source} ({rev.author})
                </button>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white text-sm">{activeProfile.sampleReviews[selectedReviewIdx].author}</span>
                <div className="flex text-amber-400">
                  {[...Array(activeProfile.sampleReviews[selectedReviewIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-300 text-sm italic">"{activeProfile.sampleReviews[selectedReviewIdx].text}"</p>
            </div>

            <div className="bg-slate-900/40 border border-indigo-500/20 rounded-xl p-5 relative min-h-[120px] flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AI Drafted Response
                </span>
                <button 
                  onClick={() => handleGenerate(selectedReviewIdx)}
                  className="text-xs text-slate-400 hover:text-white transition"
                >
                  Regenerate
                </button>
              </div>

              {isGenerating ? (
                <div className="text-sm text-slate-500 animate-pulse">Drafting optimal response using {activeProfile.label} guidelines...</div>
              ) : (
                <p className="text-slate-200 text-sm leading-relaxed">{generatedReply || activeProfile.sampleReviews[selectedReviewIdx].reply}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Engineered for Local Business Owners</h2>
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
              Define custom rules for diagnostic fees, late policies, refund guidelines, or clinic protocols on the Pro plan.
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

            {/* Pro Plan */}
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
              You can set specific guidelines (e.g., how to explain diagnostic fees, late arrival policies, or refund rules). RevPulse automatically incorporates these guidelines into every generated reply.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-lg text-white mb-1">
              RevPulse<span className="text-indigo-400">.tools</span>
            </div>
            <p className="text-xs text-slate-500">
              AI review management for local service providers.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
            <a href="mailto:support@revpulse.tools" className="hover:text-white transition">Support: support@revpulse.tools</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-600">
          © {new Date().getFullYear()} RevPulse AI. All rights reserved. Registered at revpulse.tools.
        </div>
      </footer>
    </div>
  );
}