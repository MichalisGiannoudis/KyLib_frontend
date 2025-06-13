import { useMemo } from 'react';
import { BookContent } from '@/types/content/bookContent.interface';
import { contentMap } from '@/content/page';


export const useContent = (bookId: string): BookContent | null => {
    return useMemo(() => {
        return contentMap[bookId] || null;
    }, [bookId]);
};