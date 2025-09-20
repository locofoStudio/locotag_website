// Simple Vercel serverless function for demo requests
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { 'restaurant-name': restaurantName, 'contact-name': contactName, email, phone, locations } = req.body;

    if (!restaurantName || !contactName || !email || !phone) {
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

    // Dynamic import for nodemailer
    const { default: nodemailer } = await import('nodemailer');

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
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
        <p><strong>Number of Locations:</strong> ${locations || 'Not specified'}</p>
        <p><strong>Source:</strong> Locotag Website</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><strong>Next Steps:</strong> Follow up to schedule a free demo for this potential client.</p>
        <hr>
        <p><em>Sent via Locotag Website</em></p>
      `
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Demo request submitted! We\'ll contact you within 24 hours to schedule.' 
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit request. Please try again.' 
    });
  }
}