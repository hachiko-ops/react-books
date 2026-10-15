import { API_KEY } from '../config.js';

export class GoogleBookService {

    async getBooks(search:string): Promise<unknown>{
        const url = new URL(
            "https://www.googleapis.com/books/v1/volumes"
        );

        url.searchParams.set("q", search);
        url.searchParams.set("maxResults", "10");
        url.searchParams.set("key", API_KEY);

        console.log(url);
        return null;
    }
}