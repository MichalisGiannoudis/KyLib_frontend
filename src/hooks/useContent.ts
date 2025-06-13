import { useMemo } from 'react';
import { BookContent } from '@/types/content/bookContent.interface';
import { contentMap } from '@/content/page';

export const useContent = (id: string): BookContent | null => {
    return useMemo(() => {
        return contentMap[id] || null;
    }, [id]);
};