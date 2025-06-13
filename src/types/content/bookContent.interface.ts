export interface BookContent {
    bookNameLabel: string,
    bookAuthorLabel: string,
}

export interface ContentMap {
    [key: string]: BookContent;
} 