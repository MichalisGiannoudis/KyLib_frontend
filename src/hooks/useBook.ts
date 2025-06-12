import { useState, useEffect } from 'react';
import { Book } from '@/types/book.interface';

interface UseBookResult {
  book: Book | null;
  loading: boolean;
  error: string | null;
}

export const useBook = (id: string): UseBookResult => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError('No book ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
        const response = await fetch(`${apiUrl}/book/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch book: ${response.status} ${response.statusText}`);
        }
        
        const bookData: Book = await response.json();
        setBook(bookData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the book');
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { book, loading, error };
};
