'use server';

export const dynamic = 'force-dynamic';

import { adminDb } from '@/lib/firebase-admin';

export async function getUser(userId) {
    if (!userId) return null;
    try {
        const docSnap = await adminDb.collection('users').doc(userId).get();

        if (!docSnap.exists) return null;

        return {
            id: docSnap.id,
            ...docSnap.data(),
        };
    } catch (error) {
        console.error('Error in getUser:', error);
        throw new Error('Failed to fetch user');
    }
}