import type { Request, Response } from 'express';
import { Filters } from '../interfaces/main';
import { searchBooks } from '../services/books.service';

export async function getBooks(req: Request, res: Response) {
    try {

        let filters: Filters = {};
        if( req.query.title && typeof req.query.title === "string" ) {
            const title = req.query.title;
            filters.title = title.trim();
        }

        const books = await searchBooks(filters);

        return res.json(books);
    } catch (error) {
        console.error('Error retrieving books:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}
