import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export default async function ChatListPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect('/auth/login');

    const { data: chats, error } = await supabase
        .from('chats')
        .select(
            `
      *,
      provider:profiles!chats_provider_id_fkey(id, name, avatar_url),
      user:profiles!chats_user_id_fkey(id, name, avatar_url)
    `
        )
        .or(`user_id.eq.${user.id},provider_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching chats:', error);
        return (
            <div className="container py-10 text-center">
                <h2 className="text-2xl font-semibold text-red-500">Error loading chats</h2>
                <p className="text-muted-foreground mt-2">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="container py-10 max-w-2xl">
            <h1 className="text-3xl font-bold mb-10">Messages</h1>

            {/* Chat List */}
            <div className="space-y-4">
                {chats?.map((chat) => {
                    const isProvider = chat.provider_id === user.id;
                    const other = isProvider ? chat.user : chat.provider;

                    return (
                        <Link key={chat.id} href={`/chat/${chat.id}`}>
                            <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-[2px] bg-card/60 backdrop-blur-sm cursor-pointer">
                                <CardContent className="p-4 flex items-center gap-4">
                                    {/* Avatar */}
                                    <Avatar className="h-12 w-12 border">
                                        <AvatarImage src={other?.avatar_url || ''} />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {other?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Name + last message */}
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg truncate">
                                            {other?.name || 'Unknown User'}
                                        </h3>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {chat.last_message_text || 'Tap to open the conversation'}
                                        </p>
                                    </div>

                                    {/* Time badge */}
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                                        {chat.created_at
                                            ? formatDistanceToNow(new Date(chat.created_at), { addSuffix: true })
                                            : ''}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}

                {/* Empty State */}
                {chats?.length === 0 && (
                    <div className="text-center py-16 rounded-xl border bg-muted/20 backdrop-blur-sm">
                        <p className="text-muted-foreground text-sm">No conversations yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
