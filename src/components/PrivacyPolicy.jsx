import React from 'react';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              RevPulse<span className="text-indigo-400">.tools</span>
            </span>
          </a>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <ShieldCheck className="w-4 h-4 text-indigo-400" /> Compliance & Legal
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: October 31, 2026</p>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              RevPulse AI ("we," "our," or "us") collects minimal personal and operational information necessary to provide our artificial intelligence review management services:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li><strong className="text-slate-200">Account & Billing Data:</strong> Name, email address, and subscription status collected via Stripe payment processing.</li>
              <li><strong className="text-slate-200">Customer Review Inputs:</strong> Review text, star ratings, and custom brand guidelines submitted directly by users into the app.</li>
              <li><strong className="text-slate-200">Technical Logs:</strong> Browser type, IP address, and basic usage analytics to maintain system security and uptime.</li>
            </ul>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">Your data is strictly used for operational purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>To process and generate tailored review responses using AI model endpoints.</li>
              <li>To process subscription payments and handle customer support inquiries.</li>
              <li>To maintain and improve the security, performance, and functionality of revpulse.tools.</li>
            </ul>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3">3. Data Protection & Sharing</h2>
            <p className="mb-3">
              We do not sell, rent, or trade user data or customer review content to third-party advertisers. 
            </p>
            <p className="text-slate-400">
              Payment information is handled entirely by Stripe, Inc., under PCI-DSS Level 1 compliance. Review inputs are securely transmitted over HTTPS directly to model inference endpoints for response generation and are not retained for external public model training.
            </p>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3">4. Contact & Data Rights</h2>
            <p className="text-slate-400 mb-4">
              You have the right to access, export, or delete your account information at any time. For privacy requests or questions regarding data handling, contact us directly at:
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 inline-block text-indigo-400 font-medium">
              support@revpulse.tools
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} RevPulse AI. All rights reserved. Registered at revpulse.tools.</p>
      </footer>
    </div>
  );
}