import express from 'express';
import { handleIncomingReview } from './src/reviewIngestion.js';
import { sendRecoveryMessage } from './src/messagingDispatcher.js';

const app = express();
app.use(express.json());

// Incoming Webhook from Google Business Profile / Yelp / Facebook
app.post('/api/webhook/reviews', async (req, res) => {
  try {
    const { phone_number, customer_name, rating, review_text } = req.body;
    
    // 1. Process and save via review ingestion
    await handleIncomingReview(req, res);

    // 2. If negative review (< 4 stars), automatically trigger Twilio recovery SMS
    if (rating < 4 && phone_number) {
      const resolutionLink = `https://www.revpulse.tools/resolve?client=${customer_name}`;
      await sendRecoveryMessage(phone_number, customer_name, resolutionLink);
    }
  } catch (error) {
    console.error('Webhook error:', error.message);
  }
});

app.listen(3000, () => console.log('RevPulse Webhook Engine running on port 3000'));