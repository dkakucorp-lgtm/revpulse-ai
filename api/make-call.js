export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  
    const VAPI_KEY = process.env.VAPI_API_KEY;
    const ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID || 'fb665d9a-886c-48c6-a678-b118fb668de8';
    // Use your Twilio BYO phone credential ID to bypass native number limits
    const TWILIO_CREDENTIAL_ID = 'd931cd94-ecc4-4103-8078-ba032a3b14h8';
    const TWILIO_PHONE_NUMBER = '+13213523645';
  
    if (!VAPI_KEY) {
      return res.status(500).json({ success: false, error: 'VAPI_API_KEY is missing from environment variables.' });
    }
  
    try {
      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VAPI_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: ASSISTANT_ID,
          // Route outbound traffic through your verified Twilio BYO SIP trunking line
          sendsWithPhone: {
            provider: 'byo-sip-trunk',
            number: TWILIO_PHONE_NUMBER,
            credentialId: TWILIO_CREDENTIAL_ID,
            name: 'RevPulse Twilio SIP Line'
          },
          customer: {
            number: '+13212763473',
          },
        }),
      });
  
      const vapiData = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json({
          success: false,
          error: vapiData.message || 'Failed to initiate call with Vapi'
        });
      }
  
      return res.status(200).json({
        success: true,
        numberUsed: TWILIO_PHONE_NUMBER,
        vapiResponse: vapiData
      });
  
    } catch (err) {
      console.error('Server error dispatching call:', err);
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }