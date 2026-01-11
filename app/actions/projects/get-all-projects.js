
'use server';
export const dynamic = 'force-dynamic';

import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getAllProjects() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session')?.value;

        if (!sessionCookie) {
            redirect('/login');
        }

        // Verify the token
        const decodedToken = await adminAuth.verifyIdToken(sessionCookie);
        const userId = decodedToken.uid;

        // Fetch projects securely (Example: fetch all projects owned by this user)
        // Note: Admin SDK bypasses security rules, so we must enforce ownership here manually if needed.
        const projectsSnapshot = await adminDb
            .collection('projects')
            .where('ownerId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();

        return projectsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore timestamp to string for client components
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
        }));
    } catch (error) {
        console.error('Error in getAllProjects:', error);
        // Don't throw redirection errors
        if (error.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        throw new Error('Failed to fetch projects');
    }
}