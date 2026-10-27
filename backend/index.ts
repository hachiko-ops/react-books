import express from "express";
import { booksCollection, connectMongo } from './src/config/mongo.js';
import type {Book} from './src/interfaces/main.js';

const app = express();
const PORT = 5174;

async function startServer() {
  try {
    await connectMongo();

    app.get("/books", async (req, res) => {
      try {
        const books = await booksCollection.find({}).toArray();

        // No need to check for an empty result: the endpoint returns
        // HTTP 200 with an empty array if no books are found.

        // Exclude internal fields and rename _id to uuid.
        return res.json(books.map(({ _id, provider, service_id, ...book }) => ({
          ...book,
          uuid: _id
        })));

      } catch (error) {
        return res.status(500);
      }
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Problem with server:", error);
    process.exit(1);
  }
}

startServer();