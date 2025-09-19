const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3443; // HTTPS port

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Handle pilot program form submission
app.post('/submit-pilot', async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Received pilot application:', email);

        const mailOptions = {
            from: `"Locotag Website" <${process.env.EMAIL_USER}>`,
            to: 'hello@locotag.io',
            replyTo: email,
            subject: 'New Pilot Program Application - Locotag',
            html: `
                <h2>New Pilot Program Application</h2>
                <p><strong>Applicant Email:</strong> ${email}</p>
                <p><strong>Source:</strong> Locotag Website (HTTPS)</p>
                <hr>
                <p>This business is interested in joining the Locotag pilot program for a chance to get one month FREE of Locotag (Value HKD 16,550).</p>
                <p><strong>Next Steps:</strong> Follow up with them to discuss the pilot program opportunity.</p>
                <hr>
                <p><em>Sent via Locotag Website Form System (Secure HTTPS)</em></p>
                <p><small>Reply to this email to respond directly to the applicant.</small></p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error sending pilot application:', error);
        res.status(500).json({ success: false, message: 'Failed to submit application. Please try again.' });
    }
});

// Handle demo request form submission
app.post('/submit-demo', async (req, res) => {
    try {
        const { 'restaurant-name': restaurantName, 'contact-name': contactName, email, phone, locations } = req.body;
        console.log('Received demo request:', { restaurantName, contactName, email, phone, locations });

        const mailOptions = {
            from: `"Locotag Website" <${process.env.EMAIL_USER}>`,
            to: 'hello@locotag.io',
            replyTo: email,
            subject: 'Free Demo Request - Locotag',
            html: `
                <h2>New Demo Request</h2>
                <p><strong>Restaurant Name:</strong> ${restaurantName}</p>
                <p><strong>Contact Name:</strong> ${contactName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Number of Locations:</strong> ${locations}</p>
                <p><strong>Source:</strong> Locotag Website (HTTPS)</p>
                <hr>
                <p><strong>Next Steps:</strong> Follow up to schedule a free demo for this potential client.</p>
                <hr>
                <p><em>Sent via Locotag Website Form System (Secure HTTPS)</em></p>
                <p><small>Reply to this email to respond directly to ${contactName}.</small></p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Demo request submitted! We\'ll contact you within 24 hours to schedule.' });
    } catch (error) {
        console.error('Error sending demo request:', error);
        res.status(500).json({ success: false, message: 'Failed to submit request. Please try again.' });
    }
});

// Status endpoint
app.get('/status', (req, res) => {
    res.json({ status: 'OK', message: 'Locotag HTTPS server is running securely' });
});

// Create self-signed certificate for local development
const createSelfSignedCert = () => {
    const { execSync } = require('child_process');
    
    try {
        // Check if certificates already exist
        if (fs.existsSync('server.key') && fs.existsSync('server.crt')) {
            console.log('✅ SSL certificates already exist');
            return;
        }

        console.log('🔐 Creating self-signed SSL certificate for local HTTPS...');
        console.log('⚠️  Note: These certificates are for local development only and will not be committed to git');
        
        // Generate private key
        execSync('openssl genrsa -out server.key 2048', { stdio: 'inherit' });
        
        // Generate certificate
        execSync('openssl req -new -x509 -key server.key -out server.crt -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"', { stdio: 'inherit' });
        
        console.log('✅ SSL certificate created successfully (local only)');
    } catch (error) {
        console.error('❌ Error creating SSL certificate:', error.message);
        console.log('💡 You can manually create certificates or use HTTP for testing');
        process.exit(1);
    }
};

// Start HTTPS server
const startServer = () => {
    try {
        createSelfSignedCert();
        
        const options = {
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.crt')
        };

        https.createServer(options, app).listen(PORT, () => {
            console.log(`🔒 Locotag HTTPS server running on https://localhost:${PORT}`);
            console.log('📧 Email service configured');
            console.log('🛡️  Forms are now secure and will not show browser warnings');
            console.log('📝 Form endpoints available:');
            console.log('   POST /submit-pilot - Pilot program applications');
            console.log('   POST /submit-demo - Demo requests');
            console.log('');
            console.log('⚠️  Note: You may see a browser security warning about the self-signed certificate.');
            console.log('   Click "Advanced" → "Proceed to localhost" to continue.');
        });
    } catch (error) {
        console.error('❌ Error starting HTTPS server:', error.message);
        console.log('💡 Falling back to HTTP server...');
        
        // Fallback to HTTP
        app.listen(3000, () => {
            console.log(`🚀 Locotag HTTP server running on http://localhost:3000`);
            console.log('⚠️  Note: Forms will show security warnings on HTTP');
        });
    }
};

startServer();
