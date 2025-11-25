// components/bookings/CalendarView.tsx
'use client';
import { useMemo, useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CalendarView({ bookings, onSelect }: { bookings: any[]; onSelect?: (b: any) => void }) {
  const [current, setCurrent] = useState(new Date());

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = useMemo(() => {
    const rows = [];
    let day = startDate;
    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      rows.push(week);
    }
    return rows;
  }, [startDate, endDate]);

  // map date string -> bookings
  const map = useMemo(() => {
    const m: Record<string, any[]> = {};
    bookings.forEach(b => {
      const d = format(parseISO(b.date), 'yyyy-MM-dd');
      m[d] = m[d] || [];
      m[d].push(b);
    });
    return m;
  }, [bookings]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">{format(monthStart, 'MMMM yyyy')}</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded" onClick={() => setCurrent(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>Prev</button>
          <button className="px-3 py-1 rounded" onClick={() => setCurrent(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>Next</button>
        </div>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-2 text-xs text-muted-foreground mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="text-center">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-3">
            {days.map((week, i) => week.map((day) => {
              const key = format(day, 'yyyy-MM-dd');
              const items = map[key] || [];
              const inMonth = isSameMonth(day, monthStart);
              return (
                <div key={key} className={`min-h-[90px] rounded-md border p-2 ${inMonth ? '' : 'opacity-40'}`}>
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-medium">{format(day, 'd')}</div>
                    {items.length > 0 && <Badge variant="secondary" className="text-xs">{items.length}</Badge>}
                  </div>

                  <div className="mt-2 space-y-1 text-xs">
                    {items.slice(0, 3).map(b => (
                      <div key={b.id} className="cursor-pointer" onClick={() => onSelect && onSelect(b)}>
                        <div className="truncate">{b.skill?.title || 'Booking'}</div>
                        <div className="text-muted-foreground">{format(new Date(b.date), 'p')}</div>
                      </div>
                    ))}
                    {items.length > 3 && <div className="text-xs text-muted-foreground">+{items.length - 3} more</div>}
                  </div>
                </div>
              );
            }))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
