// api/generate-reply.js
import { industryKnowledgeBase } from '../src/data/industryKnowledge.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { platform, rating, customerName, reviewText, tone, businessName, industryKey, scenarioRules } = req.body;

  if (!reviewText) {
    return res.status(400).json({ error: 'Review text is required.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server AI API key is not configured in Vercel environment variables.' });
  }

  // Fetch Industry Knowledge Matrix Profile
  const industryProfile = industryKnowledgeBase[industryKey] || industryKnowledgeBase.general;

  try {
    const prompt = `
You are an expert review manager drafting a response for ${businessName || 'our business'}.

Industry Sector: ${industryProfile.label}
Regulatory Rules & Compliance: ${industryProfile.regulatoryRules}

Review Metadata:
- Platform: ${platform || 'Google'}
- Rating: ${rating || 5} Stars
- Customer Name: ${customerName || 'Valued Customer'}
- Raw Customer Review: "${reviewText}"
- Tone Required: ${tone || 'Professional & Empathetic'}

Deep Industry Knowledge Guidelines:
${industryProfile.scenarioGuidelines}

Custom Business Rules:
${scenarioRules || 'Thank the customer and address specific points professionally.'}

Instructions:
Draft a polished response (2-4 sentences max). Comply strictly with regulatory rules (especially HIPAA for medical/dental, or licensing for home services). Address concerns with authority and empathy.
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