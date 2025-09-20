module.exports = async function handler(req, res) {
  console.log('Test pilot API called');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }
    
    console.log('Test pilot working for email:', email);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Test pilot API successful! (No email sent)' 
    });
    
  } catch (error) {
    console.error('Error in test pilot:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}
