import 'server-only';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// You will need to set FIREBASE_SERVICE_ACCOUNT_KEY in your .env.local
// It should be the JSON content of your service account file, minified to a single line.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : null;

if (!getApps().length) {
    if (serviceAccount) {
        initializeApp({
            credential: cert(serviceAccount),
        });
    } else {
        // Fallback for when build runs without env vars or if using Google Cloud default credentials
        initializeApp(); 
    }
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
