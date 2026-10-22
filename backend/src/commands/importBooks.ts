import { booksCollection, connectMongo, disconnectMongo } from '../config/mongo.js';
import { GoogleBookService } from '../services/googleBookService.js';

const googleBookService = new GoogleBookService();
async function importBooks(){
    try {
        await connectMongo();
        console.log("Start import book");

        const books = await googleBookService.getBooks(
            'subject:fantasy'
        );

        if( books.length > 0 ) {
            // Save book in Mongo DB
            await booksCollection.insertMany(books);
        }

        console.log("Import completed");
    } finally {
        await disconnectMongo();
    }
}

importBooks()
    .catch(error => {
        console.log('Error ', error);
    });