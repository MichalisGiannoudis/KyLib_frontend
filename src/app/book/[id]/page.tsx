"use client";

import { useParams } from 'next/navigation';
import BookPage from '@/components/book';
import { Book } from '@/models/book.interface';
import { Genre } from '@/models/genre.enum';

const mockBook: Book = {
  id: "1",
  isbn: "978-0-123456-78-9",
  title: "Sample Book Title",
  author: "John Doe",
  description: "This is a sample book description for testing purposes.",
  publisher: "Sample Publisher",
  publicationDate: "2023-01-01",
  pages: 300,
  genres: [Genre.Fantasy, Genre.Adventure],
  language: "English",
  available: true,
  rating: 4.5,
  price: 19.99,
  coverImage: "https://via.placeholder.com/300x400"
};

export default function BookDetailPage() {
  const params = useParams();
  const { id } = params;
    return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Book Details</h1>
          <p className="text-gray-600">Book ID: {id}</p>
        </div>
        <BookPage book={mockBook} />
      </div>
    </div>
  );
}