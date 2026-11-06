import React, { useState } from 'react';

export default function OutboundCallWidget() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleDispatchCall = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/make-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          contractorName: contractorName || 'Local Contractor',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch call.');
      }

      setStatusMessage({ type: 'success', text: `Call successfully dispatched to ${phoneNumber}!` });
      setPhoneNumber('');
      setContractorName('');
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Error connecting to Vapi serverless endpoint.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
          📞
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Outbound Voice Call Queue</h3>
          <p className="text-xs text-slate-400">Trigger automated Vapi cold outreach calls via your Twilio SIP trunk.</p>
        </div>
      </div>

      <form onSubmit={handleDispatchCall} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contractor / Business Name</label>
          <input
            type="text"
            placeholder="e.g. Apex HVAC Services"
            value={contractorName}
            onChange={(e) => setContractorName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number (with country code)</label>
          <input
            type="text"
            placeholder="e.g. +13212763473"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 transition"
            required
          />
        </div>

        {statusMessage && (
          <div className={`p-3 rounded-xl text-xs ${statusMessage.type === 'success' ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-red-950/60 border border-red-800 text-red-300'}`}>
            {statusMessage.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Dispatching Call...</span>
            </>
          ) : (
            <span>Initiate Outbound Call</span>
          )}
        </button>
      </form>
    </div>
  );
}