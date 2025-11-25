# Fix Supabase Configuration Error

## The Problem
Your `.env.local` file currently has **placeholder values** instead of real Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

This is causing the error: `Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL`

## The Solution

### Step 1: Get Your Supabase Credentials

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (or create a new one if you haven't)
3. Go to **Settings** → **API** (or visit: https://supabase.com/dashboard/project/_/settings/api)
4. You'll see two values:
   - **Project URL** (looks like: `https://abcxyzproject.supabase.co`)
   - **anon/public key** (a long string of characters)

### Step 2: Update Your `.env.local` File

Open `.env.local` and replace the placeholder values:

**Before:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**After (with your actual values):**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcxyzproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **Important:** Do NOT use quotes around the values. Just paste them directly after the `=` sign.

### Step 3: Restart Your Dev Server

After updating the file:
1. Stop the current dev server (Ctrl+C in the terminal)
2. Run `npm run dev` again

The error should be fixed!

---

## If You Don't Have a Supabase Project Yet

1. Go to https://supabase.com
2. Sign up/Login
3. Click "New Project"
4. Fill in the details and create the project
5. Wait for the project to be ready (takes ~2 minutes)
6. Follow Step 1 above to get your credentials
