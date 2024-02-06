const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Set in .env
const authToken = process.env.TWILIO_AUTH_TOKEN; // Set in .env
const client = new twilio(accountSid, authToken);
const fromPhone = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

exports.sendVerificationSMS = async (toPhone, code) => {
  try {
    await client.messages.create({
      body: `Your verification code is: ${code}`,
      to: toPhone,  // Text this number
      from: fromPhone // From a valid Twilio number
    });
    console.log("SMS sent successfully.");
  } catch (error) {
    console.error("Failed to send SMS:", error.message);
    throw error;
  }
};
