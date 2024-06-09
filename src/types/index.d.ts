export interface Book {
    id: string;
    title: string;
    slug: string;
    cover: string | null;
    authors: Array<string> | null;
    tags: Array<string> | null;

    [key: string]: string | string[];
}

export interface BookFull extends Book {
    publisher: string;
    historicalPeriod: number;
    category: number;
    relative: Array<string> | null;
    lead: string;
    description: string;
}
