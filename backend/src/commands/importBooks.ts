import { booksCollection, connectMongo, disconnectMongo } from '../config/mongo.js';
import { getBookService } from '../services/bookService.js';
import { randomUUID } from "crypto";

const provider = 'openLibrary';
const BookService = getBookService(provider);
async function importBooks(){
    try {
        await connectMongo();
        console.log("Start import book");

        BookService.addCategoryFilter('comedy');
        const books = await BookService.getBooks();

        console.log(books);
        if( books.length > 0 ) {

            await Promise.all(
                books.map( book => 
                    booksCollection.updateOne(
                        {
                            provider: provider,
                            service_id: book.service_id
                        },
                        {
                            $setOnInsert: {
                                _id: randomUUID(),
                                ...book
                            }
                        },
                        { upsert: true }                        
                    )
                )
            );

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