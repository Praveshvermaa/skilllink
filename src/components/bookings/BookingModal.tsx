// components/bookings/BookingModal.tsx
'use client';
import { Fragment } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function BookingModal({ booking, onClose, onUpdate, loadingId }: { booking: any | null; onClose: () => void; onUpdate: (id: string, status: string) => void; loadingId: string | null }) {
  if (!booking) return null;

  const other = booking.provider || booking.customer;
  return (
    <Dialog open={!!booking} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{booking.skill?.title || 'Booking Details'}</DialogTitle>
          <DialogDescription>{booking.skill?.title ? booking.skill.title : 'Details about this booking'}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <div>
              <div>{format(new Date(booking.date), 'PPP')}</div>
              <div className="text-xs">{format(new Date(booking.date), 'p')}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <div>{booking.skill?.address || 'No address provided'}</div>
          </div>

          <div className="pt-2 border-t">
            <p className="font-medium">Contact</p>
            <p>{other?.name}</p>
            <p className="text-muted-foreground">{other?.email}</p>
            {booking.status === 'approved' && other?.phone && <p className="text-primary">{other.phone}</p>}
          </div>

          <div className="flex justify-end gap-2">
            {booking.status === 'pending' && (
              <>
                <Button onClick={() => onUpdate(booking.id, 'approved')}>Accept</Button>
                <Button variant="destructive" onClick={() => onUpdate(booking.id, 'rejected')}>Reject</Button>
              </>
            )}
            <Button variant="ghost" onClick={() => onClose()}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
