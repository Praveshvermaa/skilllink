import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function VerifiedPage() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/40 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl">Email Verified!</CardTitle>
                    <CardDescription>
                        Your email has been successfully verified. You can now access all features of SkillLink.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Thank you for verifying your email address.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/dashboard">
                        <Button className="w-full">Go to Dashboard</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
