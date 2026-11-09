import type { Request, Response } from 'express';
import { Filters } from '../interfaces/main';

export async function getBooks(req: Request, res: Response) {
    try {

        let filters: Filters = {};
        if( req.query.title && typeof req.query.title === "string" ) {
            const title = req.query.title;
            filters.title = title;
        }

        const books = await booksCollection.find(filters).toArray();
    } catch (error) {
        console.error('Error retrieving books:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}
