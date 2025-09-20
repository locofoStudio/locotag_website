module.exports = async function handler(req, res) {
  console.log('Debug API called');
  
  try {
    const debugInfo = {
      method: req.method,
      timestamp: new Date().toISOString(),
      environment: {
        EMAIL_USER: process.env.EMAIL_USER ? 'Set (length: ' + process.env.EMAIL_USER.length + ')' : 'Not set',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'Set (length: ' + process.env.EMAIL_PASS.length + ')' : 'Not set',
        NODE_ENV: process.env.NODE_ENV || 'Not set'
      },
      nodeVersion: process.version,
      platform: process.platform
    };
    
    console.log('Debug info:', debugInfo);
    
    return res.status(200).json({
      success: true,
      message: 'Debug API working',
      debug: debugInfo
    });
    
  } catch (error) {
    console.error('Debug API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Debug API failed',
      error: error.message
    });
  }
}
