'use client';

import { useActionState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { updatePassword } from '@/app/auth/actions';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ResetPasswordPage() {
    const [state, action, isPending] = useActionState(updatePassword, null);

    // 🔥 Trigger success/error toasts
    useEffect(() => {
        if (!state) return;

        if (state.error) {
            toast.error(state.error, { duration: 2500 });
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
                <Card className="rounded-2xl shadow-sm">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-semibold">Reset Password</CardTitle>
                        <CardDescription className="text-sm">
                            Enter your new password below.
                        </CardDescription>
                    </CardHeader>

                    <form action={action} className="space-y-2">
                        <CardContent className="space-y-4">
                            {/* New password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="font-medium">
                                    New Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="h-11 rounded-lg"
                                />
                            </div>

                            {/* Confirm password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="font-medium">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="h-11 rounded-lg"
                                />
                            </div>

                            {/* Error message */}
                            {state?.error && (
                                <div className="rounded-md bg-red-100 p-3 text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-300">
                                    {state.error}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full rounded-lg"
                                onClick={() => {
                                    if (isPending) toast.loading('Updating password...');
                                }}
                            >
                                {isPending ? 'Updating...' : 'Update Password'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
}
