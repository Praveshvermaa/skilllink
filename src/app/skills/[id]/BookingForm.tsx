'use client'

import { useState, useTransition } from 'react'
import { createBooking } from '@/app/bookings/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function BookingForm({ skillId, providerId, price }: { skillId: string, providerId: string, price: number }) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (formData: FormData) => {
        setError(null)
        startTransition(async () => {
            try {
                await createBooking(formData)
            } catch (e: any) {
                // Next.js redirects throw an error, we need to ignore it or check digest
                if (e.message === 'NEXT_REDIRECT') return
                setError(e.message)
            }
        })
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="skillId" value={skillId} />
            <input type="hidden" name="providerId" value={providerId} />

            <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" name="date" type="datetime-local" required />
            </div>

            <div className="pt-4 border-t">
                <div className="flex justify-between mb-4 font-medium">
                    <span>Total Price</span>
                    <span>${price}</span>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? 'Booking...' : 'Book Now'}
                </Button>
            </div>

            {error && (
                <div className="text-sm text-red-500 font-medium text-center">
                    {error}
                </div>
            )}
        </form>
    )
}
