import React from 'react';
import { Ticket, Calendar, Clock, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MyTickets: React.FC = () => {
  // Mock data - in real app, this would come from database
  const tickets: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              My Tickets
            </h1>
            <p className="text-muted-foreground text-lg">
              View and manage your movie bookings
            </p>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
                <Ticket className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                No Tickets Yet
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't booked any movies yet. Browse our collection and book your first ticket!
              </p>
              <Link to="/movies">
                <Button variant="gold" size="lg">
                  Browse Movies
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-card rounded-xl p-6 border border-border flex gap-4"
                >
                  {/* Ticket content would go here */}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyTickets;
