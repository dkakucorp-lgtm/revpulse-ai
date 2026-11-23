import crypto from 'crypto';
import http2 from 'http2';

function postSupabaseHttp2(hostname, path, headers, payload) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(payload);
    const client = http2.connect('https://104.18.38.10:443', {
      servername: hostname
    });

    client.on('error', (err) => {
      client.close();
      reject(err);
    });

    const req = client.request({
      ':method': 'POST',
      ':path': path,
      ':authority': hostname,
      ':scheme': 'https',
      ...headers,
      'content-length': Buffer.byteLength(bodyStr)
    });

    let status = 500;
    let data = '';

    req.on('response', (resHeaders) => {
      status = resHeaders[':status'] || 500;
    });

    req.setEncoding('utf8');
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      client.close();
      resolve({ status, text: data });
    });
    req.on('error', (err) => {
      client.close();
      reject(err);
    });

    req.write(bodyStr);
    req.end();
  });
}

export default async function handler(req, res) {
  // 1. Meta Webhook Verification (GET) — Works for both Facebook & Instagram
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

  // 2. Incoming Facebook Page & Instagram Business Events (POST)
  if (req.method === 'POST') {
    try {
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
      if (body.object !== 'page' && body.object !== 'instagram') {
        return res.status(404).json({ error: 'Unsupported webhook object' });
      }

      const isInstagram = body.object === 'instagram';
      const platformLabel = isInstagram ? 'Instagram Business' : 'Facebook Business Page';

      const supabaseUrl =
        process.env.VITE_SUPABASE_URL ||
        process.env.SUPABASE_URL ||
        'https://teqmjllghmtgxxuadhbt.supabase.co';
      const supabaseKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.VITE_SUPABASE_ANON_KEY ||
        'sb_publishable_iSbDfwSPy9xHCjlYLaygCQ_tMaHhYev';

      const recordsToInsert = [];

      for (const entry of body.entry || []) {
        const accountId = entry.id || (isInstagram ? 'instagram-business' : 'facebook-page');

        // A. Direct Messages (Facebook Messenger & Instagram DMs)
        for (const event of entry.messaging || []) {
          if (event.message && event.message.text && !event.message.is_echo) {
            const customerText = event.message.text.trim();
            recordsToInsert.push({
              location_id: accountId,
              platform: platformLabel,
              rating: 3,
              reviewer_name: `${isInstagram ? 'IG' : 'FB'} User (${event.sender?.id || 'Customer'})`,
              review_text: customerText,
              sentiment: 'neutral',
              ai_private_draft: `Hello! Thank you for messaging us on ${isInstagram ? 'Instagram' : 'Facebook'}. We received your inquiry ("${customerText.slice(0, 80)}") and are reviewing the details to assist you promptly.`,
              status: 'pending'
            });
          }
        }

        // B. Public Comments (Facebook Feed & Instagram Post Comments)
        for (const change of entry.changes || []) {
          if (change.field === 'feed' && change.value?.item === 'comment' && change.value?.verb === 'add') {
            const commentText = (change.value.message || '').trim();
            if (commentText) {
              recordsToInsert.push({
                location_id: accountId,
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

          if (change.field === 'comments' && change.value?.text) {
            const igComment = change.value.text.trim();
            const igUser = change.value.from?.username ? `@${change.value.from.username}` : 'Instagram Visitor';
            recordsToInsert.push({
              location_id: accountId,
              platform: 'Instagram Business',
              rating: 3,
              reviewer_name: igUser,
              review_text: igComment,
              sentiment: 'neutral',
              ai_private_draft: `Hi ${igUser}! Thanks for commenting on our post. We have sent you a quick follow-up so our team can assist you right away.`,
              status: 'pending'
            });
          }
        }
      }

      if (recordsToInsert.length > 0) {
        const hostname = new URL(supabaseUrl).hostname;
        const result = await postSupabaseHttp2(
          hostname,
          '/rest/v1/reviews',
          {
            'content-type': 'application/json',
            apikey: supabaseKey,
            authorization: `Bearer ${supabaseKey}`,
            prefer: 'return=minimal'
          },
          recordsToInsert
        );

        if (result.status < 200 || result.status >= 300) {
          return res.status(result.status).json({ error: result.text });
        }
      }

      return res.status(200).send('EVENT_RECEIVED');
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
