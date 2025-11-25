'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  MessageSquare,
  Search,
  Briefcase,
  ArrowRight,
  User,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    }

    loadUser();
  }, [router]);

  const isProvider = profile?.role === 'provider';

  // 👉 Future-ready: can fetch real metrics if needed
  const stats = [
    {
      title: 'Total Bookings',
      value: '--',
      link: '/bookings',
      icon: Calendar,
      description: 'View your upcoming appointments',
    },
    {
      title: 'Messages',
      value: '--',
      link: '/chat',
      icon: MessageSquare,
      description: 'Check your recent conversations',
    },
    !isProvider
      ? {
        title: 'Find Skills',
        value: 'Explore',
        link: '/skills',
        icon: Search,
        description: 'Find professionals for your needs',
      }
      : {
        title: 'My Skills',
        value: 'Manage',
        link: '/provider/skills',
        icon: Briefcase,
        description: 'Update your service offerings',
      },
  ].filter(Boolean) as {
    title: string;
    value: string;
    link: string;
    icon: any;
    description: string;
  }[];

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Your personalized overview and shortcuts
          </p>
        </div>

        <div className="flex gap-3">

          {isProvider && (
            <Link href="/provider/skills">
              <Button className="rounded-xl">Manage Skills</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-[2px] bg-card/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">{item.value}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {item.description}
                  </p>

                  <Link
                    href={item.link}
                    className="flex items-center gap-1 text-primary text-sm mt-3 hover:underline"
                  >
                    Go <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl border bg-muted/30 backdrop-blur-sm p-8 space-y-3"
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Welcome back, {profile?.name} 👋
        </h2>

        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {isProvider
            ? 'Manage your bookings, update your skills, connect with customers, and grow your service business.'
            : 'Browse professionals, book services effortlessly, and track your skill sessions with ease.'}
        </p>
      </motion.div>
    </div>
  );
}
