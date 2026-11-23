import crypto from 'crypto';
import dns from 'dns';
import https from 'https';

const resolver = new dns.Resolver();
resolver.setServers(['1.1.1.1', '8.8.8.8']);

function resolveHost(hostname) {
  return new Promise((resolve, reject) => {
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || !addresses || !addresses.length) return reject(err || new Error('No IPv4 found'));
      resolve(addresses[0]);
    });
  });
}

function postJsonWithSni(ip, hostname, path, headers, payload) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(payload);
    const req = https.request(
      {
        host: ip,
        port: 443,
        path,
        method: 'POST',
        servername: hostname,
        headers: {
          ...headers,
          Host: hostname,
          'Content-Length': Buffer.byteLength(bodyStr)
        }
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, text: data }));
      }
    );
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

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
        const pageId = entry.id || 'facebook-page';

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
        const hostname = new URL(supabaseUrl).hostname;
        const ip = await resolveHost(hostname);
        const result = await postJsonWithSni(
          ip,
          hostname,
          '/rest/v1/reviews',
          {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=minimal'
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
