import React from 'react';

export default function UserManual() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-800 mb-8">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="RevPulse Logo" 
              className="w-10 h-10 rounded-xl object-cover bg-indigo-950 shadow-md" 
            />
            <span className="font-bold text-xl text-white">RevPulse<span className="text-indigo-400">.tools</span></span>
          </div>
          <a
            href="/"
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-xl transition"
          >
            Back to Home
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Official User Manual & Operator Guide</h1>
        <p className="text-slate-400 text-sm mb-8">Version 1.0 | Enterprise AI Reputation & Outbound Voice Automation Platform</p>

        {/* Content Body */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">1. Platform Overview & Quick Start</h2>
            <p>
              RevPulse.tools is engineered for local service businesses (HVAC, Dental, Auto Repair, MedSpas, and Contractors) to automate policy-compliant customer review responses and manage outbound voice call queues via Vapi and Twilio SIP integration.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li><strong>Landing Page:</strong> Public showcase of features, industry matrices, and Stripe subscription tiers.</li>
              <li><strong>App Dashboard (`/app`):</strong> Secure operational workspace containing the AI Review Generator, Industry Matrix inspection, and the Outbound Voice Call Queue.</li>
              <li><strong>Kaku AI Strategist:</strong> Floating mascot assistant available globally in the bottom-right corner for real-time reputation advice.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">2. Using the AI Review Generator</h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-400">
              <li>Navigate to your Dashboard (`/app`).</li>
              <li>Select your specific business vertical from the industry dropdown (e.g., HVAC, Dental).</li>
              <li>Paste the customer review text into the text area.</li>
              <li>Click <strong>Generate AI Response</strong> to instantly create an empathetic, policy-compliant reply tailored to Google and Yelp guidelines.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">3. Operating the Outbound Voice Call Queue</h2>
            <p>
              RevPulse integrates with Vapi and Twilio (active trunk: <code>+13213523645</code>) to automate cold outreach and client follow-ups.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>Switch to the <strong>Outbound Voice Call Queue (Vapi)</strong> tab in your dashboard.</li>
              <li>Enter the target business or contractor name.</li>
              <li>Input the phone number with country code (e.g., <code>+13212763473</code>).</li>
              <li>Click <strong>Initiate Outbound Call</strong> to dispatch the serverless call request.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">4. Important Links & Support</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="font-bold text-white block mb-1">Legal & Compliance</span>
                <ul className="space-y-1 text-xs">
                  <li><a href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-indigo-400 hover:underline">Terms of Service</a></li>
                </ul>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="font-bold text-white block mb-1">Dedicated Support</span>
                <p className="text-xs text-slate-400 mb-1">Direct inquiries and technical assistance:</p>
                <a href="mailto:support@revpulse.tools" className="text-indigo-400 hover:underline text-xs font-semibold">support@revpulse.tools</a>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}