import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Share2, Calendar, Clock, MapPin, Armchair, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';

export const TicketConfirmation: React.FC = () => {
  const { booking, selectedMovie, selectedShowtime, resetBooking } = useBooking();

  if (!booking || !selectedMovie || !selectedShowtime) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-4">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Your tickets have been booked successfully
          </p>
        </div>

        {/* Ticket Card */}
        <div className="bg-gradient-card rounded-2xl overflow-hidden border border-border shadow-elevated animate-scale-in">
          {/* Ticket Header */}
          <div className="bg-gradient-gold p-4">
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground font-semibold">OromoFlix</span>
              <span className="text-primary-foreground/80 text-sm">{booking.ticketCode}</span>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-6">
            <div className="flex gap-4 mb-6">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {selectedMovie.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedMovie.language}</p>
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded">
                  {selectedMovie.genre[0]}
                </span>
              </div>
            </div>

            {/* Showtime Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{selectedShowtime.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">{selectedShowtime.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Theater</p>
                  <p className="text-sm font-medium text-foreground">{selectedShowtime.screen}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Armchair className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Seats</p>
                  <p className="text-sm font-medium text-foreground">
                    {booking.seats.map((s) => s.id).join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider with dots */}
            <div className="relative my-6">
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background" />
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background" />
              <div className="border-t-2 border-dashed border-border" />
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-foreground rounded-xl flex items-center justify-center">
                <QrCode className="w-24 h-24 text-background" />
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center p-4 bg-secondary rounded-xl">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="font-display text-2xl font-bold text-gradient-gold">
                ETB {booking.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button variant="cinema" size="lg" className="flex-1 gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button variant="cinema" size="lg" className="flex-1 gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <Link to="/" onClick={resetBooking} className="block mt-4">
          <Button variant="ghost" size="lg" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
