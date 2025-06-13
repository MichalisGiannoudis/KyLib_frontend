import { ContentMap } from "@/types/content/content.interface";
import { BookContent } from "./book/book.content";
import { AuthContent } from "./auth/auth.content";

export const contentMap: ContentMap = {
    'book-page': BookContent,
    'auth-page': AuthContent
};
