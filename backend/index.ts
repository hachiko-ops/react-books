import express from "express";
import cors from "cors";
import { booksCollection, connectMongo } from './src/config/mongo.js';

const app = express();
const PORT = 5174;

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type'], // Allow only specific headers
}));
app.use(express.json());

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
        console.error("Error retrieving books:", error);
        return res.status(500).json({
          error: "Internal server error"
        });
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