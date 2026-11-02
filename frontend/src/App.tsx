import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from './SearchForm.tsx';
import BookList from './BookList.tsx';

function App() {
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