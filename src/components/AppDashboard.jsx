import React, { useState } from 'react';
import OutboundCallWidget from './OutboundCallWidget';
import { industryKnowledgeData } from '../data/industryKnowledge';

export default function AppDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIndustry, setSelectedIndustry] = useState('hvac');
  const [reviewText, setReviewText] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateReply = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setLoading(true);
    setGeneratedReply('');

    setTimeout(() => {
      const industry = industryKnowledgeData[selectedIndustry];
      setGeneratedReply(
        `Thank you so much for your feedback! As a trusted local ${industry.name.toLowerCase()} provider, we deeply value your experience. ${
          selectedIndustry === 'dental' 
            ? 'Our clinical team always prioritizes your comfort and gentle care.' 
            : 'We take pride in our transparent upfront pricing and quality workmanship.'
        } If there is anything further we can assist with, please reach out to our office directly.`
      );
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/40 overflow-hidden flex items-center justify-center shadow-md">
            <img src="/logo.png" alt="RevPulse" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg text-white">
            RevPulse<span className="text-indigo-400">.tools</span>
            <span className="ml-3 px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60 text-[10px] font-semibold uppercase">Dashboard</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition"
          >
            Back to Home
          </a>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>⚡ Review Generator & Matrices</span>
            </button>
            <button
              onClick={() => setActiveTab('outbound')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === 'outbound'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>📞 Outbound Voice Call Queue (Vapi)</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/60 px-3.5 py-2 rounded-xl border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Twilio SIP Trunk: Active (+13213523645)</span>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: AI Review Response Generator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">AI Review Response Generator</h3>
                    <p className="text-xs text-slate-400">Select industry vertical and paste customer review.</p>
                  </div>
                </div>

                <form onSubmit={handleGenerateReply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Industry Vertical</label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                    >
                      {Object.values(industryKnowledgeData).map((ind) => (
                        <option key={ind.id} value={ind.id}>{ind.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Customer Review Text</label>
                    <textarea
                      rows="4"
                      placeholder="Paste customer review here..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 transition resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Generating Compliant Reply...</span>
                      </>
                    ) : (
                      <span>Generate AI Response</span>
                    )}
                  </button>
                </form>
              </div>

              {generatedReply && (
                <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">Generated Policy-Compliant Reply:</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{generatedReply}</p>
                </div>
              )}
            </div>

            {/* Right Column: Industry Matrix & Compliance Notes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                  🛡️
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Active Industry Knowledge Matrix</h3>
                  <p className="text-xs text-slate-400">Compliance rules & terminology enforced for selected vertical.</p>
                </div>
              </div>

              {industryKnowledgeData[selectedIndustry] && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="font-semibold text-indigo-400 uppercase tracking-wider block mb-1">Compliance Notes:</span>
                    <p className="text-slate-300">{industryKnowledgeData[selectedIndustry].complianceNotes}</p>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="font-semibold text-indigo-400 uppercase tracking-wider block mb-2">Common Industry Keywords:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {industryKnowledgeData[selectedIndustry].commonKeywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded-lg">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto py-6">
            <OutboundCallWidget />
          </div>
        )}
      </main>
    </div>
  );
}