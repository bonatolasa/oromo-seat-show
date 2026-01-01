import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { movies } from '@/data/movies';

const ComingSoon: React.FC = () => {
  const comingSoon = movies.filter((m) => m.status === 'coming_soon');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Coming Soon
            </h1>
            <p className="text-muted-foreground text-lg">
              Get a sneak peek at upcoming Oromo films
            </p>
          </div>
        </div>
        
        <MovieGrid movies={comingSoon} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ComingSoon;
