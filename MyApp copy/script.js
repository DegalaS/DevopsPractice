function sendOTP() {
    var mobileNumber = document.getElementById('mobileNumber').value;
    // Here you would send an OTP to the provided mobile number using AJAX or any backend service
    // For demo purposes, let's assume the OTP is sent successfully
    document.getElementById('otpSection').style.display = 'block';
}

function verifyOTP() {
    var otp = document.getElementById('otp').value;
    // Here you would verify the OTP entered by the user with the one sent to the mobile number
    // If OTP is valid, proceed to generate QR code
    // For demo purposes, let's assume the OTP entered is correct
    generateQRCode();
}

function generateQRCode() {
    // Here you would generate a unique QR code for the user
    // You can use a library like 'qrcode.js' for this purpose
    // For simplicity, let's assume a static QR code image is generated
    var qrCodeUrl = 'path/to/your/qr_code.png';
    var qrCodeImg = document.createElement('img');
    qrCodeImg.src = qrCodeUrl;
    document.body.appendChild(qrCodeImg);
}
