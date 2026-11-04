// api/send-digest.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { businessName, ownerEmail, period, stats } = req.body;
  
    // Digest Payload Summary
    const summaryText = `
    📊 RevPulse Back-Office Digest (${period.toUpperCase()})
    Business: ${businessName}
  
    • Reviews Handled: ${stats.reviewsHandled}
    • AI Voice Calls Placed: ${stats.callsPlaced}
    • Sample Buckets / Leads Claimed: ${stats.leadsCaptured}
    • Estimated Staff Hours Saved: ${stats.hoursSaved} hrs
  
    Next Actions: We updated your script matrix to highlight direct wholesale pricing for framing screws this week.
    `;
  
    // You can route this through Resend, SendGrid, or Twilio SMS
    console.log('Sending Back-Office Digest to:', ownerEmail);
  
    return res.status(200).json({ success: true, digest: summaryText });
  }