import { createClient } from '@/lib/supabase/server'

export async function getProfile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user);
    
    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return profile
}

export async function getSkills(query?: string) {
    const supabase = await createClient()
    let builder = supabase.from('skills').select('*, profiles(name, avatar_url)')

    if (query) {
        builder = builder.ilike('title', `%${query}%`)
    }

    const { data, error } = await builder

    if (error) {
        console.error('Error fetching skills:', error)
        return []
    }

    return data
}

export async function getSkill(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('skills')
        .select('*, profiles(*)')
        .eq('id', id)
        .single()

    if (error) return null
    return data
}
