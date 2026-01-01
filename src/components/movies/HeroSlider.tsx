import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types/movie';
import { cn } from '@/lib/utils';

interface HeroSliderProps {
  movies: Movie[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentMovie = movies[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  if (!currentMovie) return null;

  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          key={currentMovie.id}
          src={currentMovie.backdrop || currentMovie.poster}
          alt={currentMovie.title}
          className="w-full h-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark via-cinema-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl animate-fade-up">
          {/* Genre Tags */}
          <div className="flex gap-2 mb-4">
            {currentMovie.genre.map((g) => (
              <span
                key={g}
                className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full border border-primary/30"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-2 text-foreground">
            {currentMovie.title}
          </h1>
          
          {currentMovie.titleOromo && currentMovie.titleOromo !== currentMovie.title && (
            <p className="text-xl md:text-2xl text-primary font-display italic mb-4">
              {currentMovie.titleOromo}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="font-semibold text-foreground">{currentMovie.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              <span>{currentMovie.duration} min</span>
            </div>
            <span className="px-2 py-0.5 bg-secondary rounded text-sm">
              {currentMovie.language}
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-muted-foreground text-lg mb-8 line-clamp-3">
            {currentMovie.synopsis}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Link to={`/movie/${currentMovie.id}`}>
              <Button variant="gold" size="xl" className="gap-2">
                <Play className="w-5 h-5" fill="currentColor" />
                Book Tickets
              </Button>
            </Link>
            <Button variant="cinema" size="xl" className="gap-2">
              <Play className="w-5 h-5" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-1.5 bg-muted-foreground/50 hover:bg-muted-foreground'
            )}
          />
        ))}
      </div>
    </section>
  );
};
