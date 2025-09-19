# Direct Email Setup for Locotag Website

This setup eliminates the need for external services like EmailJS. Your website will handle form submissions directly and send emails to `hello@locotag.io`.

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings
Create a `.env` file in your project root:
```bash
# Email Configuration - Use your personal Gmail account
EMAIL_USER=your-personal-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
```

**Setup Instructions:**
1. Use your **personal Gmail account** (not hello@locotag.io)
2. Enable 2-factor authentication on your Gmail account
3. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new App Password for "Mail"
5. Use this 16-character password (not your regular Gmail password)

**How it works:**
- Your personal Gmail sends emails TO `hello@locotag.io`
- The `replyTo` field is set to the form submitter
- When you reply, it goes directly to the customer

### 3. Start the Server
```bash
npm start
```

Your website will be available at: `http://localhost:3000`

## What This Does

✅ **Direct form submission** - No external dependencies  
✅ **Automatic emails** to `hello@locotag.io`  
✅ **Professional formatting** with HTML emails  
✅ **Error handling** with user feedback  
✅ **Secure** - Your email credentials stay on your server  

## Form Endpoints

- **Pilot Program**: `POST /submit-pilot`
- **Demo Requests**: `POST /submit-demo`
- **Health Check**: `GET /health`

## Email Providers

The system works with any email provider. Just update the `service` in `server.js`:

```javascript
// Gmail (default)
service: 'gmail'

// Outlook
service: 'outlook'

// Yahoo
service: 'yahoo'

// Custom SMTP
host: 'smtp.yourdomain.com',
port: 587,
secure: false
```

## Production Deployment

### Environment Variables
Set these in your hosting environment:
- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your app password
- `PORT`: Server port (usually set by hosting provider)

### Popular Hosting Options
- **Vercel**: Add environment variables in dashboard
- **Netlify**: Set in site settings → Environment variables
- **Heroku**: Use `heroku config:set EMAIL_USER=...`
- **VPS**: Create `.env` file on server

## Security Best Practices

1. **Never commit `.env`** - Add to `.gitignore`
2. **Use App Passwords** - Not your main email password
3. **Enable 2FA** - On your email account
4. **Regular rotation** - Change app passwords periodically

## Testing

Test the setup locally:
1. Fill out a form on your website
2. Check the server console for success/error messages
3. Verify email arrives at `hello@locotag.io`

## Troubleshooting

**"Authentication failed"**
- Check your app password (not regular password)
- Ensure 2FA is enabled on Gmail
- Verify EMAIL_USER and EMAIL_PASS in .env

**"Connection refused"**
- Check your internet connection
- Try a different email provider
- Verify SMTP settings

**Forms not submitting**
- Check browser console for errors
- Ensure server is running on correct port
- Verify form IDs match JavaScript handlers

## Support

If you need help:
1. Check the server console logs
2. Test with the `/health` endpoint
3. Verify your `.env` configuration

This setup gives you complete control over your form submissions without relying on external services!
