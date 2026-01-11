'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import EmailInput from './input/email-input';

// 1. Define Schema
const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export function ForgotPasswordForm({ className, ...props }) {
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    // 2. Setup Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    // 3. Graceful Error Mapper
    const getErrorMessage = error => {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please try again later.';
            default:
                return 'Failed to send reset email. Please try again.';
        }
    };

    // 4. Submit Handler
    const onSubmit = async data => {
        startTransition(async () => {
            try {
                setServerError('');
                await sendPasswordResetEmail(auth, data.email);
                setIsSuccess(true);
                toast.success('Password reset email sent!');
            } catch (err) {
                setServerError(getErrorMessage(err));
                toast.error(getErrorMessage(err));
            }
        });
    };

    if (isSuccess) {
        return (
            <div className={cn('flex flex-col gap-6', className)} {...props}>
                <Card className='overflow-hidden p-0'>
                    <CardContent className='grid p-6 md:p-8 text-center place-items-center gap-4'>
                        <div className="bg-success/10 p-3 rounded-full text-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
                        </div>
                        <h1 className='text-2xl font-bold'>Check your email</h1>
                        <p className='text-muted-foreground text-balance'>
                            We have sent a password reset link to your email address.
                        </p>
                        <Button asChild className="w-full mt-4">
                            <Link href="/login">Back to Login</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card className='overflow-hidden p-0'>
                <CardContent className='grid p-0 md:grid-cols-2'>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='p-6 md:p-8'>
                        <FieldGroup>
                            <div className='flex flex-col items-center gap-2 text-center'>
                                <h1 className='text-2xl font-bold'>
                                    Forgot Password
                                </h1>
                                <p className='text-muted-foreground text-balance'>
                                    Enter your email to receive a reset link
                                </p>
                            </div>

                            <Field>
                                <FieldLabel htmlFor='email'>Email</FieldLabel>
                                <EmailInput
                                    {...register('email')}
                                    disabled={isPending}
                                />
                                {errors.email && (
                                    <p className='text-destructive text-xs mt-1'>
                                        {errors.email.message}
                                    </p>
                                )}
                            </Field>

                            {/* Graceful Server Error Message */}
                            {serverError && (
                                <div className='bg-destructive/10 p-3 rounded text-destructive text-sm border border-destructive/20 text-center'>
                                    {serverError}
                                </div>
                            )}

                            <Field>
                                <Button
                                    type='submit'
                                    className='w-full'
                                    disabled={isPending}>
                                    {isPending ? 'Sending...' : 'Send Reset Link'}
                                </Button>
                            </Field>

                            <FieldDescription className='text-center'>
                                Remember your password?{' '}
                                <Link
                                    href='/login'
                                    className='underline underline-offset-4'>
                                    Back to Login
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className='bg-muted relative hidden md:block'>
                        <img
                            src='/sign-up.jpg'
                            alt='Image'
                            className='absolute inset-0 h-full w-full object-cover '
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
