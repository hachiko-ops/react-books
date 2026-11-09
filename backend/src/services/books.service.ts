import { booksCollection } from "../config/mongo";
import { Book, BookResponse, Filters } from "../interfaces/main";
import type { Filter } from 'mongodb';

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function searchBooks(filters: Filters): Promise<BookResponse[]> {
    try {
        const filter: Filter<Book> = {};

        if( filters.title ) {
            filter['title'] = { $regex: escapeRegExp(filters.title.trim()), $options: 'i' };
        }
        if( filters.subtitle ) {
            filter['subtitle'] = { $regex: escapeRegExp(filters.subtitle.trim()), $options: 'i' };
        }
        if( filters.authors && filters.authors.length > 0 ) {
            filter['authors'] = { $in: filters.authors };
        }
        if( filters.description ) {
            filter['description'] = { $regex: escapeRegExp(filters.description.trim()), $options: 'i' };
        }
        if( filters.languages && filters.languages.length > 0 ) {
            filter['languages'] = { $in: filters.languages };
        }

        const books = await booksCollection.find(filter).toArray();
        // Exclude internal fields and rename _id to uuid.
        return books.map(({ _id, provider, service_id, ...book }) => ({
          ...book,
          uuid: _id
        }));
    } catch (error) {
        console.error('Error retrieving books:', error);
        throw new Error('Internal server error');
    }
}