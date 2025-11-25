'use client';

import { useEffect, useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin } from "lucide-react";

export default function SkillsPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      const supabase = createClient();

      // Build query
      let query = supabase
        .from("skills")
        .select(
          `
          *,
          provider:profiles(name, avatar_url, role)
        `
        )
        .order("created_at", { ascending: false });

      if (q) query = query.ilike("title", `%${q}%`);

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching skills:", error);
      }

      setSkills(data || []);
      setLoading(false);
    }

    loadSkills();
  }, [q]);

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-10">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Find Skills</h1>

        <form className="flex w-full md:w-auto max-w-sm items-center gap-2">
          <Input
            type="search"
            name="q"
            placeholder="Search skills..."
            defaultValue={q || ''}
            className="rounded-xl"
          />
          <Button type="submit" size="icon" className="rounded-xl">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills?.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <Card className="rounded-2xl bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-[3px] transition-all flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1 text-lg font-semibold">
                      {skill.title}
                    </CardTitle>
                    <CardDescription className="capitalize text-sm flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    </CardDescription>
                  </div>

                  {/* Price */}
                  <Badge className="text-xs bg-primary/10 text-primary border-primary/20 rounded-md px-3 py-1">
                    ₹{skill.price}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {skill.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                  <MapPin className="h-4 w-4 text-primary/60" />
                  <span className="truncate">{skill.address}</span>
                </div>
              </CardContent>

              <CardFooter className="border-t pt-4">
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm font-medium text-muted-foreground">
                    By {skill.provider?.name || "Unknown"}
                  </div>

                  <Link href={`/skills/${skill.id}`}>
                    <Button size="sm" className="rounded-xl">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        {/* Empty state */}
        {skills?.length === 0 && (
          <div className="col-span-full py-16 text-center rounded-xl border bg-muted/20 backdrop-blur-sm">
            <p className="text-muted-foreground">No skills found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
