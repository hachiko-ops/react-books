import { OpenLibraryBookService } from "./openLibraryBookService.js";
import { GoogleBookService} from "./googleBookService.js";
import type { Book } from "../interfaces/main.js";


type BookProvider = "openLibrary" | "google";

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