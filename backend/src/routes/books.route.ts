import { Router } from 'express';
import { searchBooks } from '../services/books.service';
 
const router = Router();

// Define your book-related routes here
// Example: router.get('/books', (req, res) => { ... });
router.get('/', searchBooks);

export default router;