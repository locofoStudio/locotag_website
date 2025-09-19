# 🚀 Vercel Setup Guide for Locotag Forms

## ✅ **What I've Fixed**

I've converted your Node.js server to **Vercel Serverless Functions** so your forms will work on Vercel!

### **📁 New Files Created:**
- `api/submit-pilot.js` - Handles pilot program applications
- `api/submit-demo.js` - Handles demo requests
- `vercel.json` - Vercel configuration
- Updated `script.js` - Now uses `/api/` endpoints

## 🔧 **Setup Steps**

### **Step 1: Set Environment Variables in Vercel**

1. Go to your Vercel dashboard
2. Select your Locotag project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
EMAIL_USER = ardirckx@gmail.com
EMAIL_PASS = ftrv aena ilsl rlaj
```

**Important:** Make sure to add these for **Production**, **Preview**, and **Development** environments.

### **Step 2: Deploy to Vercel**

1. **If using Git:**
   ```bash
   git add .
   git commit -m "Add Vercel serverless functions for form handling"
   git push origin main
   ```

2. **If using Vercel CLI:**
   ```bash
   vercel --prod
   ```

3. **If using drag & drop:**
   - Zip your project folder
   - Drag to Vercel dashboard

### **Step 3: Test Your Forms**

After deployment, test both forms:
- **Pilot Program Form** (landing page)
- **Demo Request Form** (contact page)

## 🎯 **How It Works Now**

### **Before (Not Working):**
```
Form → Node.js Server → Email ❌ (Vercel can't run Node.js)
```

### **After (Working):**
```
Form → Vercel API Route → Email ✅ (Serverless functions)
```

## 📧 **Email Configuration**

Your emails will be sent from:
- **From:** "Locotag Website" <ardirckx@gmail.com>
- **To:** hello@locotag.io
- **Reply-To:** User's email (so you can reply directly)

## 🔍 **Troubleshooting**

### **If forms still don't work:**

1. **Check Environment Variables:**
   - Go to Vercel dashboard → Settings → Environment Variables
   - Make sure `EMAIL_USER` and `EMAIL_PASS` are set

2. **Check Vercel Function Logs:**
   - Go to Vercel dashboard → Functions tab
   - Look for error messages

3. **Test API Endpoints:**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/submit-pilot \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

## 🎉 **Expected Results**

After setup, you should:
- ✅ Receive emails at `hello@locotag.io`
- ✅ No more security warnings (HTTPS by default)
- ✅ Forms work on both landing page and contact page
- ✅ Professional email formatting

## 🆘 **Need Help?**

If you encounter any issues:
1. Check the Vercel function logs
2. Verify environment variables are set
3. Test the API endpoints directly

Your forms should work perfectly once the environment variables are set! 🚀
