import express from "express";
import { booksCollection, connectMongo } from './src/config/mongo.js';

const app = express();
const PORT = 5174;

async function startServer() {
  try {
    await connectMongo();

    app.get("/books", async (req, res) => {
      try {
        const books = await booksCollection.find({}).toArray();
        res.json(books);
      } catch (error) {
        console.error("Errore nel recupero libri:", error);
        res.status(500).json({ error: "Errore nel recupero libri" });
      }
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Errore durante l'avvio del server:", error);
    process.exit(1);
  }
}

startServer();