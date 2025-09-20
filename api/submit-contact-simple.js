module.exports = async function handler(req, res) {
  console.log('Simple contact API called');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    console.log('Simple test working for email:', email);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Simple contact test successful!' 
    });
    
  } catch (error) {
    console.error('Error in simple contact:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}
