import { useMemo } from 'react';
import { BookContent } from '@/types/content/bookContent.interface';
import { AuthContent } from '@/types/content/authContent.interface';
import { contentMap } from '@/content/page';

export const useContent = (id: string): BookContent | AuthContent => {
    return useMemo(() => {
        return contentMap[id] || null;
    }, [id]);
};