import React from 'react';
import { Calendar, Clock, MapPin, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';

interface BookingSummaryProps {
  onConfirm: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ onConfirm }) => {
  const { selectedMovie, selectedShowtime, selectedSeats, getTotalAmount } = useBooking();

  if (!selectedMovie || !selectedShowtime) return null;

  return (
    <div className="bg-gradient-card rounded-xl p-6 border border-border shadow-card">
      <h3 className="font-display text-xl font-bold mb-4 text-foreground">Booking Summary</h3>

      {/* Movie Info */}
      <div className="flex gap-4 mb-6">
        <img
          src={selectedMovie.poster}
          alt={selectedMovie.title}
          className="w-20 h-28 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-semibold text-foreground mb-1">{selectedMovie.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{selectedMovie.language}</p>
          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded">
            {selectedMovie.genre[0]}
          </span>
        </div>
      </div>

      {/* Showtime Details */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">{selectedShowtime.date}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">{selectedShowtime.time}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">{selectedShowtime.theater} - {selectedShowtime.screen}</span>
        </div>
      </div>

      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <Armchair className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Selected Seats</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full"
              >
                {seat.id}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-2 mb-6">
        {selectedSeats.map((seat) => (
          <div key={seat.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Seat {seat.id} ({seat.type})
            </span>
            <span className="text-foreground">ETB {seat.price}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6 pt-4 border-t border-border">
        <span className="font-semibold text-foreground">Total Amount</span>
        <span className="font-display text-2xl font-bold text-gradient-gold">
          ETB {getTotalAmount()}
        </span>
      </div>

      {/* Confirm Button */}
      <Button
        variant="gold"
        size="xl"
        className="w-full"
        disabled={selectedSeats.length === 0}
        onClick={onConfirm}
      >
        Confirm Booking
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        By proceeding, you agree to our terms and conditions
      </p>
    </div>
  );
};
