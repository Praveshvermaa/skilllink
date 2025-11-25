'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createBooking(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const skillId = formData.get('skillId') as string
    const date = formData.get('date') as string
    const providerId = formData.get('providerId') as string

    const { error } = await supabase
        .from('bookings')
        .insert({
            user_id: user.id,
            provider_id: providerId,
            skill_id: skillId,
            date,
            status: 'pending'
        })

    if (error) {
        console.error('Create booking error:', error)
        throw new Error(error.message)
    }

    revalidatePath('/bookings')
    redirect('/bookings')
}

export async function updateBookingStatus(bookingId: string, status: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)

    if (error) {
        console.error('Update booking status error:', error)
        throw new Error(error.message)
    }

    revalidatePath('/bookings')
}
