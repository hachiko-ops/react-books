export interface Book {
    service_id: string;
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    languages?: string[];
    imageLinks?: {
        thumbnail?: string;
    };
}