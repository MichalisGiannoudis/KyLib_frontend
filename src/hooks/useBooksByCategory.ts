import { useState, useEffect } from 'react';
import { Book } from '@/types/book/book.interface';
import { Genre } from '@/types/book/genre.enum';

interface UseBooksByCategoryResult {
  booksByCategory: { [key: string]: Book[] };
  loading: boolean;
  error: string | null;
}

export const useBooksByCategory = (): UseBooksByCategoryResult => {
  const [booksByCategory, setBooksByCategory] = useState<{ [key: string]: Book[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
        const response = await fetch(`${apiUrl}/books`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }
        
        const books: Book[] = await response.json();
        
        // Group books by genre
        const grouped: { [key: string]: Book[] } = {};
        
        // Initialize categories
        const categories = [
          'Featured',
          'Popular',
          'New Releases',
          'Fantasy',
          'Science Fiction',
          'Romance',
          'Mystery',
          'Thriller',
          'Young Adult',
          'Non-Fiction'
        ];

        categories.forEach(category => {
          grouped[category] = [];
        });

        books.forEach(book => {
          // Add to Featured (high rated books)
          if (book.rating >= 4.5) {
            grouped['Featured'].push(book);
          }
          
          // Add to Popular (available books with good ratings)
          if (book.available && book.rating >= 4.0) {
            grouped['Popular'].push(book);
          }
          
          // Add to New Releases (books published in the last year)
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          if (new Date(book.publicationDate) > oneYearAgo) {
            grouped['New Releases'].push(book);
          }
          
          // Add to genre-specific categories
          book.genres?.forEach(genre => {
            if (grouped[genre]) {
              grouped[genre].push(book);
            }
          });
          
          // Add non-fiction books
          const nonFictionGenres = [
            Genre.Biography, Genre.Memoir, Genre.History, Genre.SelfHelp,
            Genre.Health, Genre.Travel, Genre.TrueCrime, Genre.Science,
            Genre.Philosophy, Genre.Psychology, Genre.Business, Genre.Politics
          ];
          
          if (book.genres?.some(genre => nonFictionGenres.includes(genre as Genre))) {
            grouped['Non-Fiction'].push(book);
          }
        });

        // Remove empty categories and limit to 10 books per category
        Object.keys(grouped).forEach(category => {
          if (grouped[category].length === 0) {
            delete grouped[category];
          } else {
            grouped[category] = grouped[category].slice(0, 10);
          }
        });

        setBooksByCategory(grouped);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching books');
        setBooksByCategory({});
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { booksByCategory, loading, error };
};
