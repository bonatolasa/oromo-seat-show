import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/movies/HeroSlider';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { movies } from '@/data/movies';

const Home: React.FC = () => {
  const nowShowing = movies.filter((m) => m.status === 'now_showing');
  const comingSoon = movies.filter((m) => m.status === 'coming_soon');
  const featured = nowShowing.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSlider movies={featured} />
        
        <MovieGrid
          movies={nowShowing}
          title="Now Showing"
          subtitle="Experience the magic of Oromo cinema on the big screen"
        />
        
        <MovieGrid
          movies={comingSoon}
          title="Coming Soon"
          subtitle="Get ready for these upcoming releases"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
