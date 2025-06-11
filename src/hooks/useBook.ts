import { useState, useEffect } from 'react';
import { Book } from '@/models/book.interface';

interface UseBookResult {
  book: Book | null;
  loading: boolean;
  error: string | null;
}

export const useBook = (id: string | string[]): UseBookResult => {
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
        
        // Handle array of IDs (from useParams) by taking the first one
        const bookId = Array.isArray(id) ? id[0] : id;
        
        const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL || process.env.LOCAL_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/book/${bookId}`);
        
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
