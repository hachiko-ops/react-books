export interface GoogleBook {
    id: string;
    volumeInfo: {
        title: string;
        subtitle?: string;
        authors?: string[];
        description?: string;
        language?: string;
        imageLinks?: {
            thumbnail?: string;
        };
    };
    saleInfo?: {
        listPrice?: {
            amount: number;
            currencyCode: string;
        };
    };
}

export interface GoogleBooksResponse {
    totalItems: number;
    items?: GoogleBook[];
}