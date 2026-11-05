export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { contractorName, phoneNumber } = req.body;
  
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
  
    try {
      const response = await fetch('https://api.vapi.ai/call/phone', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
          assistantId: process.env.VAPI_ASSISTANT_ID,
          customer: {
            number: phoneNumber,
            name: contractorName || 'Valued Customer',
          },
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json({ error: data.message || 'Failed to trigger Vapi call', details: data });
      }
  
      return res.status(200).json({ success: true, callId: data.id, details: data });
    } catch (error) {
      console.error('Vapi Call Dispatch Error:', error);
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }