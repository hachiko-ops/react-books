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