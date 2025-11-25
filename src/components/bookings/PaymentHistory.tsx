// components/bookings/PaymentHistory.tsx
'use client';
import { format } from 'date-fns';

export default function PaymentHistory({ bookings }: { bookings: any[] }) {
  const payments = bookings
    .filter(b => b.status === 'approved' || b.status === 'completed')
    .map(b => ({
      id: b.id,
      date: b.date,
      title: b.skill?.title || 'Booking',
      amount: b.price ?? b.skill?.price ?? 0,
      status: b.status,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (payments.length === 0) {
    return <div className="text-sm text-muted-foreground">No payments yet.</div>;
  }

  return (
    <div className="space-y-3">
      {payments.map(p => (
        <div key={p.id} className="flex items-center justify-between rounded-md border p-3">
          <div>
            <div className="font-medium">{p.title}</div>
            <div className="text-xs text-muted-foreground">{format(new Date(p.date), 'PPP')}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">₹{p.amount.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground capitalize">{p.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
