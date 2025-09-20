export default function handler(req, res) {
  console.log('Test contact API called');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  return res.status(200).json({ 
    success: true, 
    message: 'Test API working!',
    received: req.body 
  });
}
