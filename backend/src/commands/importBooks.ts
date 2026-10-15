import { GoogleBookService } from '../services/googleBookService.js';

const googleBookService = new GoogleBookService();
async function importBooks(){
    console.log("Start import book");

    const books = await googleBookService.getBooks(
        'subject:programming'
    );

    console.log("Import completed");
}

importBooks()
    .catch(error => {
        console.log('Error ', error);
    });