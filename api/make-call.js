export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const VAPI_KEY = process.env.VAPI_API_KEY;
  const ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID || 'fb665d9a-886c-48c6-a678-b118fb668de8';
  
  // Configured to use your imported Twilio phone number ID in Vapi
  const PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID || 'fae55634-f686-4879-9ae0-a25e2f481d37';

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
        phoneNumberId: PHONE_NUMBER_ID,
        customer: {
          number: '+13212763473', // Target test number
        },
      }),
    });

    const vapiData = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: vapiData.message || 'Failed to initiate outbound call with Twilio trunk'
      });
    }

    return res.status(200).json({
      success: true,
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