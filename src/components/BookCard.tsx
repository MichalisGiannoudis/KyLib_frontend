import { Book } from '@/models/book.interface';
import Link from 'next/link';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div className="relative flex-shrink-0 w-48 h-72 bg-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-gray-600 text-sm text-center px-2">{book.title}</span>
          </div>
        )}
        
        {/* Overlay with book info */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
          <p className="text-gray-300 text-xs mb-2">{book.author}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-white text-xs">{book.rating}</span>
            </div>
            <span className="text-green-400 text-xs font-medium">${book.price}</span>
          </div>
        </div>

        {/* Available badge */}
        {!book.available && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
