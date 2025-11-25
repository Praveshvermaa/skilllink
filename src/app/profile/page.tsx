'use client';

import { useEffect, useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, User2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="container py-12 max-w-2xl flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Card className="rounded-2xl shadow-sm bg-card/60 backdrop-blur-xl">
          <CardHeader className="flex flex-col items-center gap-4 pt-8">

            {/* Avatar */}
            <Avatar className="h-28 w-28 border-2 border-primary/30 shadow-md">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                {profile?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Name + Role */}
            <div className="text-center space-y-1">
              <CardTitle className="text-3xl font-bold">
                {profile?.name}
              </CardTitle>
              <p className="text-muted-foreground capitalize tracking-wide">
                {profile?.role || "User"}
              </p>
            </div>

            {/* Edit Button */}
            <Link href="/profile/edit">
              <Button variant="outline" className="rounded-xl">
                Edit Profile
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="space-y-10 pb-10">

            {/* Contact Section */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User2 className="h-5 w-5 text-primary" />
                Contact Information
              </h3>

              <div className="rounded-xl border p-4 bg-muted/30 backdrop-blur-sm space-y-4">
                <InfoRow icon={Mail} label={profile?.email} />
                {profile?.phone && (
                  <InfoRow icon={Phone} label={profile.phone} />
                )}
                {profile?.address && (
                  <InfoRow icon={MapPin} label={profile.address} />
                )}
              </div>
            </section>

            {/* Bio Section */}
            {profile?.bio && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold">About</h3>
                <p className="text-muted-foreground leading-relaxed rounded-xl border bg-muted/20 p-4 backdrop-blur-sm">
                  {profile.bio}
                </p>
              </section>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function InfoRow({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <Icon className="h-5 w-5 text-primary/70" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
