export interface Book {
    service_id: string;
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    language?: string;
    imageLinks?: {
        thumbnail?: string;
    };
    listPrice?: {
        amount: number;
        currencyCode: string;
    };
}