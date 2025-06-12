'use client';

import { useBooksByCategory } from '@/hooks/useBooksByCategory';
import BookCarousel from '@/components/bookCarousel.component';
import HeroSection from '@/components/heroSection.component';

export default function HomePage() {
  const { booksByCategory, loading, error } = useBooksByCategory();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading amazing books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error loading books: {error}</div>
      </div>
    );
  }

  // Get featured book for hero section
  const featuredBook = booksByCategory['Featured']?.[0];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroSection featuredBook={featuredBook} />
      
      {/* Book Carousels */}
      <div className="container mx-auto px-6 py-8">
        {Object.entries(booksByCategory).map(([category, books]) => (
          <BookCarousel
            key={category}
            title={category}
            books={books}
          />
        ))}
      </div>
    </div>
  );
}
