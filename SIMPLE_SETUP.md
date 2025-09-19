# Simple Email Setup (No Backend Required)

If you want the absolute simplest solution without any server setup, here are two alternatives:

## Option A: Formspree (Recommended)

Formspree is a free service that handles form submissions for you.

### Setup (2 minutes):

1. **Go to [Formspree.io](https://formspree.io)** and create a free account
2. **Create a new form** and set the email to `hello@locotag.io`
3. **Copy your form endpoint** (looks like `https://formspree.io/f/abc123`)
4. **Update your forms** in `index.html`:

```html
<!-- Pilot Program Form -->
<form class="pilot-program-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="email" name="email" placeholder="Your business email" required>
    <input type="hidden" name="_subject" value="New Pilot Program Application">
    <button class="retro-btn primary-btn" type="submit">Apply for Free Pilot</button>
</form>

<!-- Demo Request Form -->
<form class="demo-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="hidden" name="_subject" value="Free Demo Request - Locotag">
    <input type="text" name="restaurant-name" placeholder="Restaurant Name" required>
    <input type="text" name="contact-name" placeholder="Your Name" required>
    <input type="email" name="email" placeholder="Email Address" required>
    <input type="tel" name="phone" placeholder="Phone Number" required>
    <select name="locations" required>
        <option value="">Number of Locations</option>
        <option value="1">1 Location</option>
        <option value="2-5">2-5 Locations</option>
        <option value="6-10">6-10 Locations</option>
        <option value="10+">10+ Locations</option>
    </select>
    <button type="submit" class="retro-btn primary-btn">Book Demo</button>
</form>
```

**Benefits:**
✅ No server setup required  
✅ Free for up to 50 submissions/month  
✅ Automatic emails to `hello@locotag.io`  
✅ Spam protection included  
✅ Works immediately  

## Option B: Enhanced Mailto (Fallback)

If you prefer no external services at all, I can improve the `mailto:` approach:

```html
<!-- Pilot Program Form -->
<form class="pilot-program-form" onsubmit="return sendPilotEmail(this)">
    <input type="email" name="email" placeholder="Your business email" required>
    <button class="retro-btn primary-btn" type="submit">Apply for Free Pilot</button>
</form>
```

With JavaScript that creates a properly formatted email:

```javascript
function sendPilotEmail(form) {
    const email = form.email.value;
    const subject = "New Pilot Program Application - Locotag";
    const body = `
New Pilot Program Application

Applicant Email: ${email}
Source: Locotag Website

This business is interested in joining the Locotag pilot program for a chance to get one month FREE of Locotag (Value HKD 16,550).

Please follow up with them to discuss the pilot program opportunity.
    `;
    
    window.location.href = `mailto:hello@locotag.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return false;
}
```

## Recommendation

**For immediate use:** Go with **Option A (Formspree)** - it's free, reliable, and works instantly.

**For full control:** Use the Node.js backend solution with your personal Gmail account as described in `SETUP_DIRECT_EMAIL.md`.

Both options will send form submissions directly to `hello@locotag.io` without requiring access to that email account's settings.
