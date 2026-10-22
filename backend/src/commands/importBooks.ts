import { booksCollection, connectMongo, disconnectMongo } from '../config/mongo.js';
import { getBookService } from '../services/bookService.js';

const BookService = getBookService('openLibrary');
async function importBooks(){
    try {
        await connectMongo();
        console.log("Start import book");

        BookService.addCategoryFilter('comedy');
        const books = await BookService.getBooks();

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