import { Book } from '@/types/book/book.interface';
import Link from 'next/link';

const HeroSection = ({ featuredBook }: {featuredBook?:Book} ) => {
  if (!featuredBook) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to KyLib</h1>
          <p className="text-xl mb-8">Discover your next favorite book</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredBook.coverImage}
          alt={featuredBook.title}
          className="w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 flex items-center gap-8">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <img
              src={featuredBook.coverImage}
              alt={featuredBook.title}
              className="w-48 h-72 object-cover rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Book Info */}
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{featuredBook.title}</h1>
            <p className="text-xl mb-2 text-gray-300">by {featuredBook.author}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">{featuredBook.rating}/5</span>
              </div>
              <span className="text-green-400 text-xl font-bold">${featuredBook.price}</span>
            </div>
            <p className="text-lg mb-6 line-clamp-3">{featuredBook.description}</p>
            <div className="flex gap-4">
              <Link
                href={`/book/${featuredBook.id}`}
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                View Details
              </Link>
              <button className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
