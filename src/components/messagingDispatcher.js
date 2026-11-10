import twilio from 'twilio';

// Initialize Twilio client using tenant credentials or master keys
export async function sendRecoveryMessage(phoneNum, customerName, resolutionLink) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: `Hi ${customerName}, we saw your recent feedback and want to make it right immediately. Please tap here to speak with our management privately: ${resolutionLink}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNum
    });

    return { success: true, sid: message.sid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}