import {create} from 'zustand';

const API_URL = "http://localhost:5174";

export interface Book {  
    uuid: string; 
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    languages?: string[];
    imageLinks?: {
        thumbnail?: string;
    };
}
interface StoreState {
    searchTitle: string;
    setSearchTitle: (title: string) => void;
    searchBooks: (title: string) => Promise<Book[]>;
    books: Book[];
}



const useStore = create<StoreState>((set) => ({
    searchTitle: '',
    books: [],
    setSearchTitle: (title:string) => set({searchTitle: title}),
    searchBooks: async (title:string) => {
        // Implement the logic to search books based on the title
        // This could involve making an API call or filtering a list of books
        const url = `${API_URL}/books`;

        try {
            const response = await fetch(`${url}${title ? `?title=${encodeURIComponent(title)}` : ''}`);
            const data = await response.json() as Book[];
            set({ books: data });
            return data;
        } catch (error) {
            console.error('Error searching books:', error);
            throw error;
        }
    }
}));

export default useStore;