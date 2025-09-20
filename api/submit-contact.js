export default async function handler(req, res) {
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

    // For now, just return success to test if the API works
    console.log('Contact form validation passed, would send email to hello@locotag.io');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message received! (Email sending temporarily disabled for testing)' 
    });

  } catch (error) {
    console.error('Error in contact form handler:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to process message. Please try again.',
      error: error.message
    });
  }
}
