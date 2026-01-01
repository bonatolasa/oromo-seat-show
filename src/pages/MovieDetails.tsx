import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Play, Users } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShowtimeSelector } from '@/components/booking/ShowtimeSelector';
import { SeatSelector } from '@/components/booking/SeatSelector';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { Button } from '@/components/ui/button';
import { movies, showtimes, generateSeats } from '@/data/movies';
import { useBooking } from '@/context/BookingContext';
import { Seat } from '@/types/movie';

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie, selectedShowtime, setSelectedShowtime, confirmBooking } = useBooking();
  const [step, setStep] = useState<'showtime' | 'seats'>('showtime');
  const [seats, setSeats] = useState<Seat[]>([]);

  const movie = movies.find((m) => m.id === id);
  const movieShowtimes = showtimes.filter((s) => s.movieId === id);

  useEffect(() => {
    if (movie) {
      setSelectedMovie(movie);
    }
  }, [movie, setSelectedMovie]);

  useEffect(() => {
    if (selectedShowtime) {
      setSeats(generateSeats(8, 12));
    }
  }, [selectedShowtime]);

  const handleShowtimeSelect = (showtime: typeof selectedShowtime) => {
    setSelectedShowtime(showtime);
    setStep('seats');
  };

  const handleConfirmBooking = () => {
    confirmBooking();
    navigate('/confirmation');
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh]">
          <div className="absolute inset-0">
            <img
              src={movie.backdrop || movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>

          <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Poster */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-32 md:w-48 rounded-xl shadow-elevated border-2 border-border"
              />

              {/* Info */}
              <div className="flex-1">
                <div className="flex gap-2 mb-3">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full border border-primary/30"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">
                  {movie.title}
                </h1>

                {movie.titleOromo && movie.titleOromo !== movie.title && (
                  <p className="text-xl text-primary font-display italic mb-4">
                    {movie.titleOromo}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <span className="font-semibold text-foreground">{movie.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>{movie.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-5 h-5" />
                    <span>{movie.releaseDate}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-secondary rounded text-sm">
                    {movie.language}
                  </span>
                </div>
              </div>

              {/* Trailer Button */}
              <Button variant="cinema" size="lg" className="hidden md:flex gap-2">
                <Play className="w-5 h-5" />
                Watch Trailer
              </Button>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Synopsis */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed">{movie.synopsis}</p>
              </div>

              {/* Cast & Crew */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Cast & Crew</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-20">Director:</span>
                    <span className="text-foreground font-medium">{movie.director}</span>
                  </div>
                  {movie.cast.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground w-20">Cast:</span>
                      <span className="text-foreground font-medium">{movie.cast.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Section */}
              {movie.status === 'now_showing' && (
                <div className="bg-card rounded-2xl p-6 border border-border">
                  {step === 'showtime' ? (
                    <>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                        Select Showtime
                      </h2>
                      <ShowtimeSelector
                        showtimes={movieShowtimes}
                        selectedId={selectedShowtime?.id || null}
                        onSelect={handleShowtimeSelect}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-2xl font-bold text-foreground">
                          Select Seats
                        </h2>
                        <Button variant="ghost" size="sm" onClick={() => setStep('showtime')}>
                          Change Showtime
                        </Button>
                      </div>
                      <SeatSelector seats={seats} onSeatChange={setSeats} />
                    </>
                  )}
                </div>
              )}

              {movie.status === 'coming_soon' && (
                <div className="bg-card rounded-2xl p-8 border border-border text-center">
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Coming Soon
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    This movie will be available on {movie.releaseDate}
                  </p>
                  <Button variant="gold">Notify Me</Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {step === 'seats' && selectedShowtime && (
                <div className="sticky top-24">
                  <BookingSummary onConfirm={handleConfirmBooking} />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MovieDetails;
