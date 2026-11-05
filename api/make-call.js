export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { customerPhone, contractorName, directPrice, retailPrice, businessNotes } = req.body;
  
    if (!customerPhone) {
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
          customer: { 
            number: customerPhone, 
            name: contractorName || 'Contractor' 
          },
          assistant: {
            firstMessage: `Hey ${contractorName || 'there'}, quick call from RevPulse Supply—we just brought wholesale framing screws to town at ${directPrice || '$2.80 a pound'}, delivered straight to your site. Want us to drop off a free 5lb test bucket this Thursday?`,
            model: {
              provider: 'openai',
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: `You are an automated sales rep for RevPulse Supply. Speak naturally with brief pauses.
                  Key points:
                  - Direct wholesale price: ${directPrice || '$2.80/lb'}
                  - Benchmark retail price: ${retailPrice || '$3.50/lb'}
                  - Notes: ${businessNotes || 'Free 5lb test bucket drops'}
                  If contractor agrees to a free sample, confirm their delivery address or site box location.`
                }
              ]
            }
          }
        })
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Vapi API Error');
      }
  
      return res.status(200).json({ success: true, callId: data.id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }