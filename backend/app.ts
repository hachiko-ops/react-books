import express from "express";
import cors from "cors";
import { URL_FRONTEND } from './src/config/settings.js';
import booksRoutes from './src/routes/books.route.js';

const app = express();

app.use(cors({
  origin: URL_FRONTEND, // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type'], // Allow only specific headers
}));

console.log("sono qui?");

app.use(express.json());

app.use('/books', booksRoutes);

export { app };