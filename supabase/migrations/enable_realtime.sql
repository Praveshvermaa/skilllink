-- Enable Supabase Realtime for messages table
-- This allows real-time message updates in the chat

-- Enable realtime publication for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Optionally enable for chats table (for future features like typing indicators)
ALTER PUBLICATION supabase_realtime ADD TABLE chats;

-- Verify realtime is enabled
-- You can run this query to check:
-- SELECT schemaname, tablename FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
