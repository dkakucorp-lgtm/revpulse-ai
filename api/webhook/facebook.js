export const config = {
  runtime: 'edge'
};

async function verifySignature(rawBody, signatureHeader, appSecret) {
  if (!appSecret || !signatureHeader) return true;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(appSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(rawBody));
  const hex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return signatureHeader === `sha256=${hex}`;
}

export default async function handler(req) {
  const url = new URL(req.url);

  // 1. Meta Webhook Verification (GET) — Works for both Facebook & Instagram
  if (req.method === 'GET') {
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');
    const verifyToken = process.env.META_VERIFY_TOKEN || 'revpulse_fb_verify_2026';

    if (mode === 'subscribe' && token === verifyToken) {
      return new Response(challenge, { status: 200 });
    }
    return new Response(JSON.stringify({ error: 'Invalid verify token' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Incoming Facebook Page & Instagram Business Events (POST)
  if (req.method === 'POST') {
    try {
      const rawBody = await req.text();
      const appSecret = process.env.META_APP_SECRET;
      const signature = req.headers.get('x-hub-signature-256');

      const valid = await verifySignature(rawBody, signature, appSecret);
      if (!valid) {
        return new Response(JSON.stringify({ error: 'Invalid X-Hub-Signature-256' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const body = JSON.parse(rawBody);
      if (body.object !== 'page' && body.object !== 'instagram') {
        return new Response(JSON.stringify({ error: 'Unsupported webhook object' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
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
        const supaRes = await fetch(`${supabaseUrl}/rest/v1/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=minimal'
          },
          body: JSON.stringify(recordsToInsert)
        });

        if (!supaRes.ok) {
          const errText = await supaRes.text();
          return new Response(JSON.stringify({ error: errText }), {
            status: supaRes.status,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      return new Response('EVENT_RECEIVED', { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}
