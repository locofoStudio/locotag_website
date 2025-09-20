const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  console.log('Contact API called with method:', req.method);
  console.log('Request body:', req.body);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { 
      'venue-name': venueName, 
      'contact-name': contactName, 
      email, 
      phone, 
      'venue-type': venueType,
      locations, 
      message,
      'pilot-interest': pilotInterest
    } = req.body;

    console.log('Parsed form data:', { venueName, contactName, email, phone, venueType, locations, message, pilotInterest });

    // Validate required fields
    if (!venueName || !contactName || !email || !venueType || !locations || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All required fields must be filled' 
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid email is required' 
      });
    }

    console.log('Received contact form submission:', { venueName, contactName, email, phone, venueType, locations, message, pilotInterest });

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
      subject: 'New Contact Form Submission - Locotag',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Venue Name:</strong> ${venueName}</p>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Venue Type:</strong> ${venueType}</p>
        <p><strong>Number of Locations:</strong> ${locations}</p>
        <p><strong>Pilot Program Interest:</strong> ${pilotInterest}</p>
        <p><strong>Source:</strong> Locotag Website (Contact Page)</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><strong>Next Steps:</strong> Follow up with ${contactName} to discuss their needs and requirements.</p>
        <hr>
        <p><em>Sent via Locotag Website Contact Form (Vercel Serverless)</em></p>
        <p><small>Reply to this email to respond directly to ${contactName}.</small></p>
      `
    };

    console.log('Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.' 
    });

  } catch (error) {
    console.error('Error in contact form handler:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.',
      error: error.message
    });
  }
}
