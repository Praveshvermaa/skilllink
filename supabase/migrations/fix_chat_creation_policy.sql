-- Fix chat creation RLS policy
-- This script safely updates the chat creation policy to allow both users and providers

-- First, drop any existing chat insert policies
DROP POLICY IF EXISTS "Users can create chats" ON chats;
DROP POLICY IF EXISTS "Users and providers can create chats" ON chats;

-- Create the new policy that allows both users and providers to create chats
CREATE POLICY "Users and providers can create chats" ON chats 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR auth.uid() = provider_id);
