export interface Book {
    id: number;
    title: string;
    slug: string;
    cover: string | null;
    authors: Array<string> | null;
    tags: Array<string> | null;

    [key: string]: string[] | number[];
}

export interface BookFull extends Book {
    publisher: string;
    historicalPeriod: number;
    category: number;
    relative: Array<number> | null;
    lead: string;
    description: string;
}
