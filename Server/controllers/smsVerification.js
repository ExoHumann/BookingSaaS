// Example SMS verification controller and middleware

// Controller function to send SMS verification code
export async function sendVerificationCode(req, res) {
    const { phoneNumber } = req.body;
    try {
        // Generate a random verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        
        // Store the code in your database with the user's phone number (you may use a temporary token here)
        // Send the verification code to the user's phone number using your SMS provider
        
        res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send verification code', message: error.message });
    }
}

// Middleware to check if the phone number is verified
export function checkPhoneNumberVerification(req, res, next) {
    const { user } = req; // Assuming you have user data in req.user
    
    // Check if the user's phone number is verified in your database
    if (user && user.phoneVerified) {
        next(); // User's phone number is verified, proceed to the next middleware or route
    } else {
        res.status(403).json({ error: 'Phone number not verified', message: 'Please verify your phone number' });
    }
}

// Route for users to submit the verification code
router.post('/verify', (req, res) => {
    const { code } = req.body;
    const { phoneNumber } = req.user; // Assuming you have the user's phone number
    
    // Compare the submitted code with the one stored in your database
    if (code === storedVerificationCode) {
        // Mark the user's phone number as verified in your database
        req.user.phoneVerified = true;
        res.status(200).json({ message: 'Phone number verified successfully' });
    } else {
        res.status(400).json({ error: 'Invalid verification code', message: 'Please enter the correct code' });
    }
});
