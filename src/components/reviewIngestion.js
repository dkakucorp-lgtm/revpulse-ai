import { supabase } from './supabaseClient.js';

export async function handleIncomingReview(req, res) {
  try {
    const { location_id, platform, rating, reviewer_name, review_text } = req.body;

    // 1. Determine initial sentiment
    const sentiment = rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative';

    // 2. If negative, generate automated private-resolution AI draft
    let aiDraft = null;
    if (sentiment === 'negative') {
      aiDraft = "Hello. Thank you for sharing your feedback. We regret that your experience did not meet our standard. Please reach out to our service manager directly so we can resolve this privately.";
    }

    // 3. Insert review into Supabase PostgreSQL database
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        { 
          location_id, 
          platform, 
          rating, 
          reviewer_name, 
          review_text, 
          sentiment, 
          ai_private_draft: aiDraft,
          status: 'pending' 
        }
      ]);

    if (error) throw error;

    return res.status(200).json({ success: true, message: 'Review ingested & safeguarded successfully.', data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}