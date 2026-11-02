import 'bootstrap/dist/css/bootstrap.min.css';
import useStore from './store/useStore.js';

function BookList() {
    const { books } = useStore();
    
    return (
        <div  className="row row-cols-1 row-cols-md-3 g-4">
            {books.map((book) => (
                <div className="col" key={book.uuid}>
                    <div className="card h-100">
                        {book.imageLinks?.thumbnail && (
                            <img src={book.imageLinks.thumbnail} className="card-img-top" alt={book.title} />
                        )}
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            {book.subtitle && <h6 className="card-subtitle mb-2 text-muted">{book.subtitle}</h6>}
                            {book.authors && <p className="card-text">By: {book.authors.join(', ')}</p>}
                            {book.description && <p className="card-text">{book.description}</p>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookList;
