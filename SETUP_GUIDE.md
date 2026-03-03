# 🔐 Firebase & Google Calendar Setup Guide

This guide will help you configure Google Sign-In and Google Calendar integration for the LawnMower Pro e-commerce site.

## Prerequisites

- A Google account
- Basic knowledge of Firebase console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `lawnmower-pro` (or your choice)
4. Optional: Enable Google Analytics
5. Click "Create project"

## Step 2: Enable Google Authentication

1. In Firebase Console, select your project
2. Go to **Build** → **Authentication**
3. Click "Get started"
4. Click on **Sign-in method** tab
5. Click on **Google** provider
6. Toggle **Enable**
7. Add a support email (your email)
8. Click **Save**

## Step 3: Register Your Web App

1. In Firebase Console, go to **Project Overview** (gear icon)
2. Click **Project settings**
3. Scroll down to "Your apps"
4. Click the **Web** icon (`</>`)
5. Register app:
   - App nickname: `LawnMower Pro Web`
   - Check "Also set up Firebase Hosting" (optional)
   - Click **Register app**

## Step 4: Get Firebase Configuration

1. After registration, you'll see your Firebase SDK configuration
2. Copy the `firebaseConfig` object values
3. Replace the placeholder values in `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 5: Enable Google Calendar API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (or create a new one)
3. Click **APIs & Services** → **Library**
4. Search for "Google Calendar API"
5. Click **Google Calendar API**
6. Click **Enable**

## Step 6: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Click **Create**
4. Fill in required fields:
   - App name: `LawnMower Pro`
   - User support email: your email
   - Developer contact: your email
5. Click **Save and Continue**
6. Add scopes:
   - Click **Add or Remove Scopes**
   - Search and add:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`
   - Click **Update**
7. Click **Save and Continue**
8. Add test users (your email for testing)
9. Click **Save and Continue**

## Step 7: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings**
2. Click on **Authorized domains** tab
3. Add your domain(s):
   - `localhost` (already included)
   - Your production domain (e.g., `lawnmowerpro.com`)

## Step 8: Update Local Configuration

Update the file `src/config/firebase.js` with your actual Firebase credentials:

```javascript
// Replace these with your actual values from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 9: Install Dependencies

```bash
npm install
```

## Step 10: Start Development Server

```bash
npm run dev
```

## Testing the Integration

1. Open http://localhost:3000
2. Click "Sign in with Google" in the header
3. Sign in with your Google account
4. Navigate to the Schedule page
5. Fill out the form and submit
6. The event should be created in your Google Calendar

## Important Notes

### Security

- **Never commit your Firebase config with real credentials to public repositories**
- Use environment variables for production:

```javascript
// .env file
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

```javascript
// src/config/firebase.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... other configs
};
```

### Google Calendar API Implementation

The current implementation shows the structure for Google Calendar integration. For full production use, you'll need to:

1. Set up a backend server to handle Calendar API requests securely
2. Or use Firebase Functions to create calendar events
3. Store OAuth refresh tokens securely

Here's a production-ready approach using Firebase Functions:

```javascript
// Example Firebase Function for creating calendar events
const functions = require('firebase-functions');
const {google} = require('googleapis');

exports.createCalendarEvent = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const oauth2Client = new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'YOUR_REDIRECT_URI'
  );

  oauth2Client.setCredentials({
    access_token: data.accessToken
  });

  const calendar = google.calendar({version: 'v3', auth: oauth2Client});

  try {
    const event = await calendar.events.insert({
      calendarId: 'primary',
      resource: data.event
    });
    return {success: true, eventId: event.data.id};
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
```

## Troubleshooting

### "Firebase config not found"
- Ensure you've replaced the placeholder config in `src/config/firebase.js`

### "Google Sign-In not working"
- Check that Google provider is enabled in Firebase Authentication
- Verify authorized domains include `localhost`

### "Calendar events not creating"
- Ensure Google Calendar API is enabled
- Check OAuth scopes are properly configured
- Verify the user has granted calendar permissions

### "Popup blocked"
- Allow popups for localhost in your browser
- Try signing in again

## Production Deployment

For production deployment:

1. Add your production domain to Firebase authorized domains
2. Add production domain to Google Cloud OAuth consent screen
3. Use environment variables for all sensitive config
4. Implement proper error handling and logging
5. Set up Firebase Security Rules
6. Consider using Firebase Functions for server-side Calendar API calls

## Support

For more information:
- [Firebase Docs](https://firebase.google.com/docs)
- [Google Calendar API Docs](https://developers.google.com/calendar/api/guides/overview)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth/web/google-signin)

---

🎉 Your LawnMower Pro site now has Google Sign-In and Calendar scheduling!
