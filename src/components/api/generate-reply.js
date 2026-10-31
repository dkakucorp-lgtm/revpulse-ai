// api/generate-reply.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { platform, rating, customerName, reviewText, tone, businessName, scenarioRules } = req.body;
  
    if (!reviewText) {
      return res.status(400).json({ error: 'Review text is required.' });
    }
  
    const apiKey = process.env.OPENAI_API_KEY;
  
    if (!apiKey) {
      return res.status(500).json({ error: 'Server AI API key is not configured.' });
    }
  
    try {
      const prompt = `
  You are an expert review response manager for ${businessName || 'our business'}.
  Draft a polished, professional reply to the following customer review.
  
  Review Platform: ${platform || 'Google'}
  Star Rating: ${rating || 5} Stars
  Customer Name: ${customerName || 'Valued Customer'}
  Customer Review: "${reviewText}"
  Desired Tone: ${tone || 'Professional & Empathetic'}
  
  Custom Business Guidelines & Rules:
  ${scenarioRules || 'Thank the customer and address any specific concerns professionally.'}
  
  Draft a concise, brand-appropriate response (2-4 sentences max).
  `;
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate response.');
      }
  
      const reply = data.choices[0].message.content.trim();
      return res.status(200).json({ reply });
  
    } catch (err) {
      return res.status(500).json({ error: err.message || 'Internal server error.' });
    }
  }