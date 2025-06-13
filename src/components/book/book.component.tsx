import { Book } from '@/types/book/book.interface';
import { useContent } from '@/hooks/useContent';
import { BookContent } from '@/types/content/bookContent.interface';

const BookPage = ( {book}: {book:Book} ) => {    
    
    const { bookNameLabel, bookAuthorLabel } = useContent('book-page') as BookContent;

    const renderGenres = () => {
        if (!book.genres || !Array.isArray(book.genres)) return 'N/A';
        
        return book.genres.map(genre => {
            return typeof genre === 'string' ? genre : 'Uknown Genre';
        }).join(', ');
    };
    
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                    {book.coverImage && (
                        <img 
                            src={book.coverImage} 
                            alt={book.title}
                            className="w-64 h-96 object-cover rounded-lg shadow-md mx-auto md:mx-0"
                        />
                    )}
                </div>
                <div className="flex-1 space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{bookNameLabel} {book.title}</h1>
                        <h2 className="text-xl text-gray-600 mb-4">{bookAuthorLabel} {book.author}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                            <div className="flex">
                                <span className="font-semibold text-gray-700 w-20">Genre:</span>
                                <span className="text-gray-600">{renderGenres()}</span>
                            </div>
                            <div className="flex">
                                <span className="font-semibold text-gray-700 w-20">Pages:</span>
                                <span className="text-gray-600">{book.pages}</span>
                            </div>
                            <div className="flex">
                                <span className="font-semibold text-gray-700 w-20">Language:</span>
                                <span className="text-gray-600">{book.language}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex">
                                <span className="font-semibold text-gray-700 w-20">Published:</span>
                                <span className="text-gray-600">{book.publicationDate}</span>
                            </div>
                            <div className="flex">
                                <span className="font-semibold text-gray-700 w-20">Publisher:</span>
                                <span className="text-gray-600">{book.publisher}</span>
                            </div>
                            <div className="flex">
                                <span className="font-semibold text-gray-700 w-20">ISBN:</span>
                                <span className="text-gray-600">{book.isbn}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t">
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold">{book.rating}/5</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">${book.price}</div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {book.available ? 'Available' : 'Out of Stock'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
        </div>
    );
};

export default BookPage;