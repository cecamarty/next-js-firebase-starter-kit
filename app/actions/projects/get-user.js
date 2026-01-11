'use server';
export const dynamic = 'force-dynamic';

import { adminDb } from '@/lib/firebase-admin';

export async function getProject(projectId) {
    if (!projectId) return null;
    try {
        const docSnap = await adminDb.collection('projects').doc(projectId).get();

        if (!docSnap.exists) return null;

        return {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate?.()?.toISOString() || null,
        };
    } catch (error) {
        console.error('Error in getProject:', error);
        throw new Error('Failed to fetch project');
    }
}