import React from 'react';
import { Movie } from '@/types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  subtitle?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, title, subtitle }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground text-lg">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
