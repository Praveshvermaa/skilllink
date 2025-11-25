import { getProfile } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default async function AdminPage() {
    const profile = await getProfile()

    if (profile?.role !== 'admin') {
        redirect('/dashboard')
    }

    const supabase = await createClient()
    const { data: users } = await supabase.from('profiles').select('*')
    const { data: skills } = await supabase.from('skills').select('*, profiles(name)')

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4">Skills</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skills?.map((skill: any) => (
                            <TableRow key={skill.id}>
                                <TableCell>{skill.title}</TableCell>
                                <TableCell>{skill.profiles?.name}</TableCell>
                                <TableCell>${skill.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
