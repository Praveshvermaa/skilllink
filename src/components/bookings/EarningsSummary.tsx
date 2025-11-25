// components/bookings/EarningsSummary.tsx
'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function EarningsSummary({ bookings, currentUserId }: { bookings: any[]; currentUserId: string }) {
  // assume price is available on booking.price or booking.skill.price
  const providerBookings = bookings.filter(b => (b.provider?.id === currentUserId) || (b as any).provider_id === currentUserId);
  const totalEarnings = providerBookings.reduce((s, b) => s + (b.price ?? b.skill?.price ?? 0), 0);
  const completed = providerBookings.filter(b => b.status === 'completed').length;
  const upcoming = providerBookings.filter(b => b.status === 'approved').length;

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">₹{totalEarnings.toFixed(2)}</div>
        <div className="mt-4 text-sm space-y-2">
          <div className="flex justify-between"><span>Completed</span><span>{completed}</span></div>
          <div className="flex justify-between"><span>Upcoming</span><span>{upcoming}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}
