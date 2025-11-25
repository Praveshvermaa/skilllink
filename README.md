# SkillLink

SkillLink is a full-stack web application where users can discover local skill providers, book services, chat in real time, and manage their own skills.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS, ShadCN UI
- **Backend**: Next.js Server Actions + Supabase (Auth, Database, Realtime, Storage)
- **Database**: PostgreSQL (Supabase)
- **Maps**: Google Maps API (Integration ready)

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Copy `.env.example` to `.env.local` and fill in your keys:
    ```bash
    cp .env.example .env.local
    ```
    - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
    - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API Key

3.  **Database Setup**
    - Go to your Supabase Dashboard -> SQL Editor.
    - Run the contents of `supabase/schema.sql`.
    - Create a storage bucket named `avatars` (Public).

4.  **Run the App**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## Features

- **Authentication**: Email/Password login & signup with role selection (User/Provider).
- **Dashboard**: Role-based dashboard.
- **Skills**: Providers can add skills. Users can search and view details.
- **Bookings**: Users can book skills. Providers can accept/reject.
- **Chat**: Real-time messaging between users and providers.
- **Admin**: Admin panel to view users and skills.

## Folder Structure

- `src/app`: App Router pages
- `src/components`: UI components (ShadCN)
- `src/lib`: Utility functions (Supabase client, data fetching)
- `supabase`: SQL schema
