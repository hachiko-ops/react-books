import { OpenLibraryBookService } from "./openLibraryBook.provider.js";
import { GoogleBookService} from "./googleBook.provider.js";
import type { Book, BookProvider } from "../interfaces/main.js";

export interface BookService {
    getBooks(search?: string): Promise<Book[]>;
    addCategoryFilter(category: string): void;
}

export function getBookService( service:BookProvider ) { 
    if( service == 'openLibrary' ) {
        return new OpenLibraryBookService();
    } else {
        return new GoogleBookService();
    }

    throw new Error("Service not found");
}