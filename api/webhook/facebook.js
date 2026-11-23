import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // 1. Meta Webhook Verification (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    const verifyToken = process.env.META_VERIFY_TOKEN || 'revpulse_fb_verify_2026';

    if (mode === 'subscribe' && token === verifyToken) {
      return res.status(200).send(challenge);
    }
    return res.status(403).json({ error: 'Invalid verify token' });
  }

  // 2. Incoming Facebook Page Query / Message / Comment (POST)
  if (req.method === 'POST') {
    try {
      // Optional HMAC signature verification when META_APP_SECRET is set
      const appSecret = process.env.META_APP_SECRET;
      const signature = req.headers['x-hub-signature-256'];
      if (appSecret && signature) {
        const expected =
          'sha256=' +
          crypto.createHmac('sha256', appSecret).update(JSON.stringify(req.body)).digest('hex');
        if (signature !== expected) {
          return res.status(401).json({ error: 'Invalid X-Hub-Signature-256' });
        }
      }

      const body = req.body;
      if (body.object !== 'page') {
        return res.status(404).json({ error: 'Unsupported webhook object' });
      }

      const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const recordsToInsert = [];

      for (const entry of body.entry || []) {
        const pageId = entry.id || 'facebook-page';

        // A. Messenger customer inquiries
        for (const event of entry.messaging || []) {
          if (event.message && event.message.text && !event.message.is_echo) {
            const customerText = event.message.text.trim();
            recordsToInsert.push({
              location_id: pageId,
              platform: 'Facebook Business Page',
              rating: 3,
              reviewer_name: `FB User (${event.sender?.id || 'Customer'})`,
              review_text: customerText,
              sentiment: 'neutral',
              ai_private_draft: `Hello! Thank you for messaging our team on Facebook. We received your inquiry ("${customerText.slice(0, 80)}") and are reviewing the details to assist you promptly.`,
              status: 'pending'
            });
          }
        }

        // B. Public Page wall posts / visitor comments
        for (const change of entry.changes || []) {
          if (change.field === 'feed' && change.value?.item === 'comment' && change.value?.verb === 'add') {
            const commentText = (change.value.message || '').trim();
            if (commentText) {
              recordsToInsert.push({
                location_id: pageId,
                platform: 'Facebook Business Page',
                rating: 3,
                reviewer_name: change.value.from?.name || 'Facebook Visitor',
                review_text: commentText,
                sentiment: 'neutral',
                ai_private_draft: `Hello ${change.value.from?.name || 'there'}! Thank you for your comment on our Facebook Page. Our team is checking on this and will follow up with you shortly.`,
                status: 'pending'
              });
            }
          }
        }
      }

      if (recordsToInsert.length > 0) {
        const { error } = await supabase.from('reviews').insert(recordsToInsert);
        if (error) {
          console.error('Supabase insert error:', error.message);
          return res.status(500).json({ error: error.message });
        }
      }

      return res.status(200).send('EVENT_RECEIVED');
    } catch (err) {
      console.error('Facebook webhook error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
