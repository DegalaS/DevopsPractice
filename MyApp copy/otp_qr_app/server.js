const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Temporary storage for OTPs
let otpStorage = {};

// Endpoint to send OTP
app.post('/sendOTP', (req, res) => {
    const { mobileNumber } = req.body;

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store the OTP in temporary storage
    otpStorage[mobileNumber] = otp;

    // Here you would implement code to send the OTP to the provided mobile number
    // For simplicity, we'll just send the OTP as a response
    res.json({ otp: otp });
});

// Endpoint to verify OTP and generate QR code
app.post('/verifyOTP', (req, res) => {
    const { mobileNumber, otp } = req.body;

    // Verify OTP
    if (otpStorage[mobileNumber] && otpStorage[mobileNumber] == otp) {
        // Generate QR code data (for demo, let's use the mobile number)
        const qrCodeData = `User: ${mobileNumber}`;

        // Generate QR code image
        QRCode.toDataURL(qrCodeData, (err, qrCodeUrl) => {
            if (err) {
                console.error('Error generating QR code:', err);
                res.status(500).json({ error: 'Error generating QR code' });
            } else {
                // Remove OTP from storage after successful verification
                delete otpStorage[mobileNumber];
                res.json({ qrCodeUrl: qrCodeUrl });
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid OTP' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
