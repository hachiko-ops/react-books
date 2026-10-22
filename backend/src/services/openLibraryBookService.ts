import type { OpenLibraryBook,OpenLibraryResponse, OpenLibraryDetailsBook } from "../interfaces/openLibraryBooks.js";
import type { Book } from "../interfaces/main.js";
import { BookService } from "./bookService.js";

const API_URL = "https://openlibrary.org/";

export class OpenLibraryBookService implements BookService {

    private readonly searchUrl: string = API_URL+'search.json';
    private readonly detailsUrl: string = API_URL+'works/';
    private filterParams: Record<string, string> = {};

    addCategoryFilter( filter: string ) {
        this.filterParams['subject'] = filter;
    }

    async getBooks(): Promise<Book[]>{
        const url = new URL(this.searchUrl); 
        Object.entries(this.filterParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        url.searchParams.set('limit',"10");

        try {
            const response = await fetch(url.href);

            if( response.ok ) {
                const data:OpenLibraryResponse = await response.json();

                if( data.docs ) {
                    const detailsPromises = data.docs.map( async (item: OpenLibraryBook) =>  {
                        console.log(this.detailsUrl+item.key+'.json');
                        const response = await fetch( this.detailsUrl+item.key+'.json');
                        if( ! response.ok ) {
                            throw new Error(`Error ${item.key}: ${response.status}`);
                        }

                        const details: OpenLibraryDetailsBook = await response.json();

                        const coverId = details.covers?.[0];
                        const cover = coverId? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`: "";

                        return {
                            service_id: details.key,
                            title: details.title,
                            authors: item.author_name,
                            description: details.description?.value,
                            languages: item.language,
                            imageLinks: {
                                thumbnail: cover
                            }
                        };

                    });

                    return await Promise.all(detailsPromises);
                }

            }
        } catch( error ) {
            console.log(error);
        }

        return [];

    }
}
