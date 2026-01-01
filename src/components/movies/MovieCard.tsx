import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Play } from 'lucide-react';
import { Movie } from '@/types/movie';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'featured';
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, variant = 'default' }) => {
  const isFeatured = variant === 'featured';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={cn(
        'group relative block rounded-xl overflow-hidden transition-all duration-500',
        isFeatured ? 'aspect-[2/3]' : 'aspect-[2/3]'
      )}
    >
      {/* Poster Image */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Play Button - Hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-gold animate-scale-in">
          <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Status Badge */}
      {movie.status === 'coming_soon' && (
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
            Coming Soon
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-semibold text-primary">{movie.rating}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {movie.duration} min
          </span>
          <span>{movie.genre[0]}</span>
        </div>

        {/* Language Badge */}
        <div className="mt-2">
          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded">
            {movie.language}
          </span>
        </div>
      </div>
    </Link>
  );
};
