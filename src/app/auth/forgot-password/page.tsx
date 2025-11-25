'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { forgotPassword } from '@/app/auth/actions';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
    const [state, action, isPending] = useActionState(forgotPassword, null);

    // 🔥 Trigger Sonner popups whenever action state changes
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.success, {
                duration: 2500,
            });
        }

        if (state.error) {
            toast.error(state.error, {
                duration: 2500,
            });
        }
    }, [state]);

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="w-full max-w-md"
            >
                <Card className="overflow-hidden rounded-2xl shadow-sm">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-semibold">Forgot Password</CardTitle>
                        <CardDescription className="text-sm">
                            Enter your email and we’ll send you a reset link.
                        </CardDescription>
                    </CardHeader>

                    {/* Success fallback UI (still useful besides toast) */}
                    {state?.success ? (
                        <CardContent>
                            <div className="rounded-xl bg-green-100 p-4 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                {state.success}
                            </div>
                        </CardContent>
                    ) : (
                        <form action={action} className="space-y-2">
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="font-medium">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        className="h-11 rounded-lg"
                                    />
                                </div>

                                {state?.error && (
                                    <div className="rounded-md bg-red-100 p-3 text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-300">
                                        {state.error}
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter>
                                <Button
                                    className="w-full rounded-lg"
                                    type="submit"
                                    disabled={isPending}
                                    onClick={() => {
                                        if (!isPending) return;
                                        // Optional toast while sending
                                        toast.loading('Sending reset link...');
                                    }}
                                >
                                    {isPending ? 'Sending Link...' : 'Send Reset Link'}
                                </Button>
                            </CardFooter>
                        </form>
                    )}

                    <CardFooter className="flex justify-center border-t bg-muted/40 py-4 dark:bg-muted/20">
                        <Link
                            href="/auth/login"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Link>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
