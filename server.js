import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Your email
        pass: process.env.EMAIL_PASS || 'your-app-password' // Your app password
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle pilot program form submission
app.post('/submit-pilot', async (req, res) => {
    try {
        const { email } = req.body;
        
        const mailOptions = {
            from: `"Locotag Website" <${process.env.EMAIL_USER}>`, // Shows as "Locotag Website"
            to: 'hello@locotag.io',
            replyTo: email, // User can reply directly to the applicant
            subject: 'New Pilot Program Application - Locotag',
            html: `
                <h2>New Pilot Program Application</h2>
                <p><strong>Applicant Email:</strong> ${email}</p>
                <p><strong>Source:</strong> Locotag Website</p>
                <hr>
                <p>This business is interested in joining the Locotag pilot program for a chance to get one month FREE of Locotag (Value HKD 16,550).</p>
                <p><strong>Next Steps:</strong> Follow up with them to discuss the pilot program opportunity.</p>
                <hr>
                <p><em>Sent via Locotag Website Form System</em></p>
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
        
        const mailOptions = {
            from: `"Locotag Website" <${process.env.EMAIL_USER}>`, // Shows as "Locotag Website"
            to: 'hello@locotag.io',
            replyTo: email, // User can reply directly to the contact
            subject: 'Free Demo Request - Locotag',
            html: `
                <h2>New Demo Request</h2>
                <p><strong>Restaurant Name:</strong> ${restaurantName}</p>
                <p><strong>Contact Name:</strong> ${contactName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Number of Locations:</strong> ${locations}</p>
                <p><strong>Source:</strong> Locotag Website</p>
                <hr>
                <p><strong>Next Steps:</strong> Follow up to schedule a free demo for this potential client.</p>
                <hr>
                <p><em>Sent via Locotag Website Form System</em></p>
                <p><small>Reply to this email to respond directly to ${contactName}.</small></p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Demo request submitted! We\'ll contact you within 24 hours.' });
    } catch (error) {
        console.error('Error sending demo request:', error);
        res.status(500).json({ success: false, message: 'Failed to submit request. Please try again.' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Locotag form server is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 Locotag server running on http://localhost:${PORT}`);
    console.log(`📧 Email service configured`);
    console.log(`📝 Form endpoints available:`);
    console.log(`   POST /submit-pilot - Pilot program applications`);
    console.log(`   POST /submit-demo - Demo requests`);
});

module.exports = app;
