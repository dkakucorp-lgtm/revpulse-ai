export default async function handler(req, res) {
    // Allow POST requests only
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    try {
      const { customerNumber, customerName } = req.body;
  
      // Validate target recipient phone number
      const targetPhone = customerNumber || '+13212763473';
  
      // Hardcoded BYO SIP Trunk Phone Number ID verified in Vapi
      const VAPI_PHONE_NUMBER_ID = 'fae55634-f686-4879-9ae0-a25e2f481d37';
  
      // Vapi Assistant ID for RevPulse Outbound Agent
      const VAPI_ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID || 'fb665d9a-886c-48c6-a678-b118fb668de8';
  
      // Vapi Private API Key
      const VAPI_API_KEY = process.env.VAPI_API_KEY;
  
      if (!VAPI_API_KEY) {
        return res.status(500).json({ 
          error: 'VAPI_API_KEY is missing from environment variables.' 
        });
      }
  
      // Payload for Vapi Call Creation API
      const payload = {
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        assistantId: VAPI_ASSISTANT_ID,
        customer: {
          number: targetPhone,
          name: customerName || 'Contractor'
        }
      };
  
      const response = await fetch('https://api.vapi.ai/call/phone', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VAPI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Vapi Call Dispatch Error:', data);
        return res.status(response.status).json({ 
          error: data.message || 'Failed to dispatch Vapi call',
          details: data 
        });
      }
  
      return res.status(200).json({ 
        success: true, 
        callId: data.id, 
        details: data 
      });
  
    } catch (error) {
      console.error('Serverless Handler Error:', error);
      return res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error.message 
      });
    }
  }