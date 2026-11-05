import React, { useState } from 'react';

export default function MakeCall() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleDispatchCall = async () => {
    setLoading(true);
    setStatus('Dispatching AI Voice Call...');

    try {
      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VAPI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Native Vapi Phone Number ID (bypasses Twilio SIP Trunking & 403 errors)
          phoneNumberId: 'bcf468be-6cde-476a-a1b6-c87e-d06efd388e44',
          
          // Your existing RevPulse Outbound Assistant ID
          assistantId: 'fb665d9a-886c-48c6-a678-b118fb668de8',
          
          // Target customer phone number
          customer: {
            number: '+13212763473',
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate call');
      }

      setStatus('Call dispatched successfully! Your phone should ring shortly.');
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-900">RevPulse AI Voice Dispatch</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Trigger an automated outbound AI call directly to your target number via native Vapi telephony.
      </p>
      
      <button
        onClick={handleDispatchCall}
        disabled={loading}
        className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Connecting...' : '🚀 Dispatch AI Voice Call Now'}
      </button>

      {status && (
        <p className="mt-4 text-sm font-medium text-center text-gray-700">
          {status}
        </p>
      )}
    </div>
  );
}