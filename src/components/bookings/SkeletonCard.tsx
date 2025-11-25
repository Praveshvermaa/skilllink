// components/bookings/SkeletonCard.tsx
'use client';
export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border bg-muted/10 p-4">
      <div className="h-6 w-3/4 rounded bg-muted/30 mb-3" />
      <div className="h-4 w-1/2 rounded bg-muted/30 mb-3" />
      <div className="h-3 w-full rounded bg-muted/20" />
    </div>
  );
}
