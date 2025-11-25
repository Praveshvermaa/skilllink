'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createSkill(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const experience = formData.get('experience') as string
    const address = formData.get('address') as string

    const { error } = await supabase
        .from('skills')
        .insert({
            provider_id: user.id,
            title,
            category,
            description,
            price,
            experience,
            address,
        })

    if (error) {
        console.error('Create skill error:', error)
        return { error: error.message }
    }

    revalidatePath('/skills')
    revalidatePath('/dashboard')
    return { success: true }
}
