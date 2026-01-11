'use server';

import { cookies } from 'next/headers';

export async function createSession(token) {
    const cookieStore = await cookies();
    // 1 week session
    const expiresIn = 60 * 60 * 24 * 7 * 1000; 

    // Securely set the cookie
    cookieStore.set('session', token, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
}

export async function removeSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
