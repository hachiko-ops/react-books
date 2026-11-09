import { Router } from 'express';
import { getBooks } from '../controllers/books.controller';
 
const router = Router();

// Define your book-related routes here
// Example: router.get('/books', (req, res) => { ... });
router.get('/', getBooks);

export default router;