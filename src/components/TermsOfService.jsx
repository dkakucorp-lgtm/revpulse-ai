import React from 'react';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsOfService() {
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
          <ShieldCheck className="w-4 h-4 text-indigo-400 text-indigo-400" /> Terms & Conditions
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Terms of Service</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: October 31, 2026</p>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3">1. Service Description</h2>
            <p className="text-slate-400">
              RevPulse AI provides an artificial intelligence micro-SaaS platform designed to assist local service businesses in drafting responses to customer reviews. The tool acts as an automated drafting assistant; subscribers retain full responsibility for inspecting and publishing content to third-party review platforms (e.g., Google Business Profile, Yelp, Facebook).
            </p>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3">2. Subscriptions & Billing</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              "><strong className="text-slate-200">Billing Tiers:</strong> Subscription plans (Starter at $29/mo, Pro at $79/mo) are billed on a recurring monthly schedule via Stripe.</li>
              "><strong className="text-slate-200">Cancellation:</strong> Users can cancel their active recurring subscription at any time via the customer billing portal or by contacting support prior to the next billing cycle.</li>
              "><strong className="text-slate-200">Refunds:</strong> Subscription payments are non-refundable except where explicitly required by applicable regional law or billing disputes approved by management.</li>
            </ul>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3">3. Acceptable Use & AI Disclaimer</h2>
            <p className="text-slate-400 mb-3">
              Users agree not to utilize RevPulse AI to generate fraudulent, defamatory, harassing, or illegal content. 
            </p>
            <p className="text-slate-400">
              AI outputs are provided on an "as-is" basis. Subscribers are advised to configure custom policy rules (e.g., fee explanations, medical disclaimers) and review all drafted responses prior to publication to ensure accuracy and regulatory compliance within their industry.
            </p>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3">4. Support & Notices</h2>
            <p className="text-slate-400 mb-4">
              For questions regarding these Terms of Service or billing assistance, please reach out to our team:
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