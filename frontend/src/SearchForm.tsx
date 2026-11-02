import 'bootstrap/dist/css/bootstrap.min.css';
import type { ChangeEvent, SubmitEvent } from 'react';
import useStore from './store/useStore.js';

function SearchForm() {
    const { searchTitle, setSearchTitle, searchBooks } = useStore();

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchBooks(searchTitle);
    };

    return (
        <form className="hstack gap-2" role="search" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTitle(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
    );
}

export default SearchForm;