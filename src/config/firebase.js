import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project credentials
// Get these from: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Add scopes for Google Calendar access
googleProvider.addScope('https://www.googleapis.com/auth/calendar');
googleProvider.addScope('https://www.googleapis.com/auth/calendar.events');
