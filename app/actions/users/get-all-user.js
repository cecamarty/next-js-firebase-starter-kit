'use server';
export const dynamic = 'force-dynamic';

import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getAllUsers() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session')?.value;

        if (!sessionCookie) {
             redirect('/login');
        }

        // Verify session
        await adminAuth.verifyIdToken(sessionCookie);

        const querySnapshot = await adminDb.collection('users').get();
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        // Don't throw redirection errors
        if (error.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        throw new Error('Failed to fetch users');
    }
}