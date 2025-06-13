import { Book } from "../book/book.interface";

export interface UserLibrary {
    wishlist?: Book[];
    readingList?: Book[];
    purchaseHistory?: {
        book: Book;
        purchaseDate: string;
    }[];
}