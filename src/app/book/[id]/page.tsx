"use client";

import { useParams } from 'next/navigation';
import BookPage from '@/components/book/book.component';
import { useBook } from '@/hooks/useBook';

export default function BookDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { book, loading, error } = useBook(id ?? "");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading book...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h2 className="font-bold">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-gray-600">
            <h2 className="text-xl font-semibold">Book not found</h2>
            <p>The book with ID {id} could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Book Details</h1>
          <p className="text-gray-600">Book ID: {id}</p>
        </div>
        <BookPage book={book} />
      </div>
    </div>
  );
}