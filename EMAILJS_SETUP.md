# EmailJS Setup Guide for Locotag

## What This Does
- **Pilot Program Form**: Sends applications directly to `hello@locotag.io`
- **Contact Form**: Sends inquiries directly to `hello@locotag.io`
- **No User Email Client**: Emails are sent automatically from your website

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" or "Outlook" (or your preferred email provider)
4. Connect your `hello@locotag.io` email account
5. Note the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** `{{subject}}`

**Body:**
```
From: {{from_name}} <{{from_email}}>
To: {{to_email}}

{{message}}
```

4. Note the **Template ID** (e.g., `template_xyz789`)

### 4. Update Website Code
Replace the placeholder values in these files:

**In `index.html` and `contact.html`:**
```javascript
emailjs.init("YOUR_ACTUAL_USER_ID"); // Replace with your EmailJS User ID
```

**In `script.js`:**
```javascript
// Replace 'service_id' with your actual Service ID
// Replace 'template_id' with your actual Template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### 5. Test the Forms
1. Submit the pilot program form
2. Submit the contact form
3. Check your `hello@locotag.io` inbox for emails

## Current Configuration
- **User ID**: `user_abc123` (placeholder - needs your actual ID)
- **Service ID**: `service_id` (placeholder - needs your actual service ID)
- **Template ID**: `template_id` (placeholder - needs your actual template ID)

## Benefits
✅ **Immediate emails** to your inbox  
✅ **No user email client** required  
✅ **Professional formatting**  
✅ **Automatic form reset** after submission  
✅ **Loading states** and success/error messages  

## Support
If you need help setting up EmailJS, their documentation is excellent:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Quick Start Guide](https://www.emailjs.com/docs/rest-api/send/)
