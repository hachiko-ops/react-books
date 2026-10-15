async function importBooks(){
    console.log("Start import book");

    console.log("Import completed");
}

importBooks()
    .catch(error => {
        console.log('Error ', error);
        process.exitCode = 1;
    });