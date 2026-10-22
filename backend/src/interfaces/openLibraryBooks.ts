export interface OpenLibraryBook {
    key: string;
    author_name: string[];
    title: string;
    language?: string[];
}

export interface OpenLibraryDetailsBook {
    description: {
        type: string,
        value: string
    };
    title: string;
    covers: number[];
    key: string,

}

export interface OpenLibraryResponse {
    numFound: number;
    docs?: OpenLibraryBook[];
}