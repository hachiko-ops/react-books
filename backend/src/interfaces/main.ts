export type BookProvider = "openLibrary" | "google";
export interface Book {
    service_id: string;
    provider: BookProvider;
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    languages?: string[];
    imageLinks?: {
        thumbnail?: string;
    };
}

export interface BookResponse {
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    languages?: string[];
    imageLinks?: {
        thumbnail?: string;
    };
}

export interface ParamsSearch {
    title?: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    languages?: string[];
}

export interface Filters {
    title?: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    languages?: string[];
}