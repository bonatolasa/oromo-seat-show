import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Showtime } from '@/types/movie';
import { cn } from '@/lib/utils';

interface ShowtimeSelectorProps {
  showtimes: Showtime[];
  selectedId: string | null;
  onSelect: (showtime: Showtime) => void;
}

export const ShowtimeSelector: React.FC<ShowtimeSelectorProps> = ({
  showtimes,
  selectedId,
  onSelect,
}) => {
  // Group showtimes by date
  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    if (!acc[showtime.date]) {
      acc[showtime.date] = [];
    }
    acc[showtime.date].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    };
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedShowtimes).map(([date, times]) => {
        const formatted = formatDate(date);
        return (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground">
                {formatted.day}, {formatted.date} {formatted.month}
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {times.map((showtime) => (
                <button
                  key={showtime.id}
                  onClick={() => onSelect(showtime)}
                  className={cn(
                    'group relative px-4 py-3 rounded-xl border transition-all duration-300',
                    selectedId === showtime.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-gold'
                      : 'bg-card border-border hover:border-primary'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{showtime.time}</span>
                  </div>
                  <div className="text-xs opacity-80">{showtime.screen}</div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/20">
                    <span className="text-xs">ETB {showtime.price}</span>
                    <span className="text-xs">{showtime.availableSeats} seats</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
