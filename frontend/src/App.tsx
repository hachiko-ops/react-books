import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from './SearchForm.tsx';
import BookList from './BookList.tsx';
import useStore from './store/useStore.js';
import { useEffect } from 'react';

function App() {
    const searchBooks = useStore(state => state.searchBooks);

    useEffect(() => {
        // Perform an initial search with an empty title to fetch all books
        searchBooks('');
    }, [searchBooks]);

    return (
        <div className="App">
            <header className="App-header">
                <nav className="navbar navbar-expand-md bg-light justify-content-between px-4">
                    <a className="navbar-brand" href="#">
                        Library App
                    </a>
                    <SearchForm />
                </nav>
            </header>
            <main className="container mt-4">
                <BookList />
            </main>
        </div>
    );
}

export default App;