import { Router } from 'express';
import { searchBooks } from '../services/books.service';

console.log("sono qui?");   
const router = Router();

// Define your book-related routes here
// Example: router.get('/books', (req, res) => { ... });
router.get('/books', searchBooks);

export default router;