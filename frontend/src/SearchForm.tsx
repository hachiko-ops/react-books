import 'bootstrap/dist/css/bootstrap.min.css';

function SearchForm() {
    function onSear

    return (
        <form className="hstack gap-2" role="search">
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
    );
}

export default SearchForm;