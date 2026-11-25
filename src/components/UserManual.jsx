import React, { useState } from 'react';

const MANUAL_SECTIONS = [
  {
    id: 'overview',
    number: '01',
    title: 'Dashboard Overview & Approval Queue',
    summary: 'How incoming messages and reviews arrive in real time and how human-in-the-loop approvals work.',
    steps: [
      'Open the Incoming Reviews tab to monitor live DMs, comments, and reviews across connected channels.',
      'Review Kaku AI suggested responses before publishing—nothing goes out publicly without your approval.',
      'Use Sentiment Analytics to track total intercepted messages, resolution rate, and pending approvals.',
    ],
  },
  {
    id: 'channels',
    number: '02',
    title: 'Connecting Facebook, Instagram & Review Channels',
    summary: 'Step-by-step setup to link your business pages and enable real-time message delivery.',
    steps: [
      'Confirm your Facebook Page is active and your Instagram account is switched to a Professional (Business/Creator) account linked to that Page.',
      'On Instagram mobile: open Settings & privacy → Messages and story replies → Message controls → Connected tools, and toggle "Allow access to messages" ON.',
      'In RevPulse channel settings, verify your Page/Account connection status shows active.',
    ],
  },
  {
    id: 'faqs-kaku',
    number: '03',
    title: 'Setting Up Custom FAQs & Training Ask Kaku',
    summary: 'Configure your industry questionnaire, custom answers, and extra questions so Kaku replies accurately.',
    steps: [
      'Click the "Custom FAQs & Kaku Training" tab in your dashboard and select your Business Industry.',
      'Answer the guided starter questions using the dropdown presets—or select "Other (Enter my own custom answer)" to write your exact policy.',
      'Add any business-specific questions under "Add Additional Custom Questions" and click "Save FAQs & Train Ask Kaku."',
      'Test sample customer questions in the "Test Ask Kaku Before Going Live" box (or floating Ask Kaku widget) to confirm accuracy.',
    ],
  },
  {
    id: 'troubleshooting',
    number: '04',
    title: 'Permissions, Roles & Troubleshooting',
    summary: 'Quick checks if messages are delayed or a channel needs re-authorization.',
    steps: [
      'Ensure you hold Admin/Full Control access on the connected Facebook Page and Instagram Business account.',
      'If a token expires or permissions change, reconnect your Business Page from your dashboard settings.',
      'Keep your Custom FAQs updated whenever hours, pricing rules, or delivery/pickup policies change.',
    ],
  },
];

export default function UserManual() {
  const [selectedId, setSelectedId] = useState('overview');
  const activeSection = MANUAL_SECTIONS.find((s) => s.id === selectedId) || MANUAL_SECTIONS[0];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header + PDF Download */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Documentation & Quickstart
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            RevPulse Onboarding & Operations Manual
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Browse the indexed setup guide below or download the printable PDF manual.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/revpulse-onboarding-manual.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition"
          >
            View PDF in Browser
          </a>
          <a
            href="/revpulse-onboarding-manual.pdf"
            download="RevPulse-Onboarding-Manual.pdf"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition shadow-lg shadow-blue-600/20"
          >
            ⬇ Download PDF Manual
          </a>
        </div>
      </div>

      {/* Indexed Table of Contents + Active Section Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 pb-2">
            Manual Index
          </p>
          {MANUAL_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setSelectedId(sec.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition flex items-start gap-2.5 ${
                selectedId === sec.id
                  ? 'bg-blue-600/20 border border-blue-500/40 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="text-blue-400 font-mono">{sec.number}.</span>
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-slate-950/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <span>Section {activeSection.number}</span>
          </div>
          <h3 className="text-lg font-bold text-white">{activeSection.title}</h3>
          <p className="text-sm text-slate-400">{activeSection.summary}</p>

          <ol className="space-y-3 pt-2">
            {activeSection.steps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-slate-900/90 border border-slate-800 rounded-lg p-3.5 text-sm text-slate-200"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}