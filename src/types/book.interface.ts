import { Genre } from "./genre.enum";

export interface Book {
    id: string;
    isbn?: string;
    title: string;
    author: string;
    description: string;
    publisher: string;
    publicationDate: string;
    pages: number;
    genres: Genre[];
    language: string;
    available: boolean;
    rating: number;
    price: number;
    coverImage: string;
}