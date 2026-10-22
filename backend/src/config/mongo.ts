import { MongoClient } from "mongodb";
import type { Book } from "../interfaces/main.js";

const uri = process.env.MONGO_URI;
if( !uri ) {
    throw new Error("MONGO_URI not defined");
}
const mongoClient = new MongoClient(uri);

const database = mongoClient.db("react_books");
const booksCollection = database.collection<Book>("books");

async function connectMongo(){
    await mongoClient.connect();

    await booksCollection.createIndex(
        { service_id: 1 },
        { unique: true }
    );
}

async function disconnectMongo() {
    await mongoClient.close();
}

export { booksCollection, connectMongo, disconnectMongo };