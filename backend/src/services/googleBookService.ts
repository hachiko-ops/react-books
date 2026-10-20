import { API_KEY } from '../config.js';
import type { GoogleBook,GoogleBooksResponse } from "../interfaces/googleBooks.js";
import type { Book } from "../interfaces/main.js";

export class GoogleBookService {

    async getBooks(search:string): Promise<Book[]>{
        const url = new URL(
            "https://www.googleapis.com/books/v1/volumes"
        );

        url.searchParams.set("q", search);
        url.searchParams.set("filter","ebooks");
        url.searchParams.set("maxResults", "10");
        url.searchParams.set("key", API_KEY);

        try {
            const response = await fetch(url.href);
            //console.log(response);
            if( ! response.ok ) {
                const error = await response.text();
                console.error("Status",response.status);
                console.error("Errore Google",error);
                return [];
            }

            const data: GoogleBooksResponse = await response.json();
            console.log(data);
            if( data.items && data.items.length > 0 ) {
                const books: Book[] = data.items.map( (item: GoogleBook) => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    subtitle: item.volumeInfo.subtitle,
                    authors: item.volumeInfo.authors,
                    description: item.volumeInfo.description,
                    language: item.volumeInfo.description,
                    imageLinks: item.volumeInfo.imageLinks,
                    listPrice: item.saleInfo?.listPrice
                }));

                return books;
            }
        
        } catch( error ) {
            console.log(error);
        }

        return [];
    }
}