const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }

    console.log('Received pilot application:', email);

    // Email configuration using environment variables
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Locotag Website" <${process.env.EMAIL_USER}>`,
      to: 'hello@locotag.io',
      replyTo: email,
      subject: 'New Pilot Program Application - Locotag',
      html: `
        <h2>New Pilot Program Application</h2>
        <p><strong>Applicant Email:</strong> ${email}</p>
        <p><strong>Source:</strong> Locotag Website (Vercel)</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>This business is interested in joining the Locotag pilot program for a chance to get one month FREE of Locotag (Value HKD 16,550).</p>
        <p><strong>Next Steps:</strong> Follow up with them to discuss the pilot program opportunity.</p>
        <hr>
        <p><em>Sent via Locotag Website Form System (Vercel Serverless)</em></p>
        <p><small>Reply to this email to respond directly to the applicant.</small></p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully!' 
    });

  } catch (error) {
    console.error('Error sending pilot application:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit application. Please try again.' 
    });
  }
}
