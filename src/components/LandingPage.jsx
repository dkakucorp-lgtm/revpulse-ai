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
  // Stripe Payment Links (replace placeholders when live links are ready)
  const STRIPE_STARTER_LINK = "https://buy.stripe.com/your_starter_link_here";
  const STRIPE_PRO_LINK = "https://buy.stripe.com/your_pro_link_here";

  // Industry Profile Data Engine
  const industryProfiles = {
    hvac: {
      id: "hvac",
      label: "HVAC, Plumbing & Electrical",
      icon: Wrench,
      badgeText: "Built for HVAC, Plumbers & Electricians",
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
      badgeText: "Built for Dentists, Doctors & Clinics",
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
      badgeText: "Built for Auto Repair & Detailing",
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
      badgeText: "Built for MedSpas, Salons & Aesthetics",
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
      badgeText: "Built for Roofing, Solar & General Contractors",
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
      badgeText: "Built for Attorneys & Financial Services",
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
      badgeText: "Built for All Local Service Providers",
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

  // Check URL query parameter on load (e.g. revpulse.tools?industry=dental)
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
          
          {/* Dynamic Industry Selector Dropdown */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-slate-900/90 border border-indigo-500/30 p-2 sm:px-4 sm:py-2 rounded-2xl mb-8 shadow-xl">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <ActiveIcon className="w-4 h-4 text-indigo-400" /> Select Your Industry: