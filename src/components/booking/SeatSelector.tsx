import React from 'react';
import { Seat } from '@/types/movie';
import { cn } from '@/lib/utils';
import { useBooking } from '@/context/BookingContext';

interface SeatSelectorProps {
  seats: Seat[];
  onSeatChange: (seats: Seat[]) => void;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({ seats, onSeatChange }) => {
  const { selectedSeats, addSeat, removeSeat } = useBooking();

  const rows = [...new Set(seats.map((s) => s.row))];

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      removeSeat(seat.id);
    } else {
      addSeat(seat);
    }
  };

  const getSeatStatus = (seat: Seat): Seat['status'] => {
    if (selectedSeats.some((s) => s.id === seat.id)) return 'selected';
    return seat.status;
  };

  return (
    <div className="w-full">
      {/* Screen */}
      <div className="relative mb-12">
        <div className="w-full h-2 bg-gradient-gold rounded-full mb-2" />
        <div className="absolute inset-x-0 -top-8 h-16 bg-gradient-to-b from-primary/20 to-transparent blur-xl" />
        <p className="text-center text-sm text-muted-foreground">SCREEN</p>
      </div>

      {/* Seats Grid */}
      <div className="flex flex-col items-center gap-2 mb-8 overflow-x-auto pb-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-6 text-sm font-medium text-muted-foreground">{row}</span>
            <div className="flex gap-1.5">
              {seats
                .filter((s) => s.row === row)
                .map((seat) => {
                  const status = getSeatStatus(seat);
                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'booked'}
                      className={cn(
                        'w-7 h-7 md:w-8 md:h-8 rounded-t-lg text-xs font-medium transition-all duration-200',
                        status === 'available' && seat.type === 'standard' && 'bg-secondary hover:bg-primary hover:text-primary-foreground',
                        status === 'available' && seat.type === 'premium' && 'bg-gold-dark/30 border border-gold-dark hover:bg-primary hover:text-primary-foreground',
                        status === 'available' && seat.type === 'vip' && 'bg-accent/30 border border-accent hover:bg-accent hover:text-accent-foreground',
                        status === 'selected' && 'bg-primary text-primary-foreground shadow-gold',
                        status === 'booked' && 'bg-muted/50 cursor-not-allowed text-muted-foreground/50'
                      )}
                    >
                      {seat.number}
                    </button>
                  );
                })}
            </div>
            <span className="w-6 text-sm font-medium text-muted-foreground">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-secondary" />
          <span className="text-muted-foreground">Standard - ETB 150</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-gold-dark/30 border border-gold-dark" />
          <span className="text-muted-foreground">Premium - ETB 220</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-accent/30 border border-accent" />
          <span className="text-muted-foreground">VIP - ETB 300</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-primary" />
          <span className="text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-muted/50" />
          <span className="text-muted-foreground">Booked</span>
        </div>
      </div>
    </div>
  );
};
