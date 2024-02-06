const Verification = require('../models/Verification');
const { sendVerificationSMS } = require('../utils/smsUtil');

exports.sendCode = async (req, res) => {
  const { phoneNumber } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  const expiresAt = new Date(new Date().getTime() + 30*60000); // Code expires in 30 mins

  try {
    await Verification.create({ phoneNumber, code, expiresAt });
    await sendVerificationSMS(phoneNumber, code);
    res.json({ message: "Verification code sent." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyCode = async (req, res) => {
  const { phoneNumber, code } = req.body;
  try {
    const verification = await Verification.findOne({ phoneNumber, code });
    if (!verification || verification.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired code." });
    }
    // Mark phone number as verified in your user model
    // User.updateOne({ phoneNumber }, { $set: { phoneVerified: true } });
    res.json({ message: "Phone number verified." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
