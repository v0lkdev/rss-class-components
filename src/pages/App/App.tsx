import { useEffect, useState } from 'react';
import './App.css';
import SearchArea from '../../components/SearchArea/SearchArea';
import ResultArea from '../../components/ResultArea/ResultArea';
import { searchBooks } from '../../api';
import { Hourglass } from 'react-loader-spinner';
import ErrorBtn from '../../components/ErrorBtn/ErrorBtn';
import { useLocalStorage } from '../../components/useLocalStorage';
import { NavLink, useNavigate } from 'react-router-dom';

interface Book {
  title: string;
  author: string;
  publishYear: number | string;
  editionCount: number | string;
  bookId: string;
}

function App() {
  const [localStorageValue, setLocalStorage] =
    useLocalStorage('currentSearchValue');

  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState(localStorageValue);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const runSearch = async () => {
      await performSearch(searchQuery);
    };
    runSearch();
  }, []);

  async function performSearch(query: string) {
    setIsLoading(true);
    setBtnIsDisabled(true);
    try {
      const result = await searchBooks(query);
      setBooks(result);
      setPrevSearchQuery(searchQuery);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';

      setPrevSearchQuery(searchQuery);
      setErrorMsg(
        `Oops! Something went wrong. We couldn't load the results. Please try again. Error: ${message}`
      );
    }
    setIsLoading(false);
    setBtnIsDisabled(false);
  }

  function onSearchQueryUpdate(query: string) {
    setSearchQuery(query);
  }

  async function onSearchClick() {
    const query = searchQuery.trim();
    setSearchQuery(query);
    if (query !== prevSearchQuery) {
      setLocalStorage(query);
      performSearch(query);
    }
    navigate('/');
  }

  return (
    <div className="app-wrapper">
      <div className="buttons-menu">
        <NavLink to="/about" className="nav-link-about">
          About
        </NavLink>
        <ErrorBtn />
      </div>
      <div className="header">Bookshelf</div>
      <SearchArea
        searchQuery={searchQuery}
        onChange={onSearchQueryUpdate}
        onClick={onSearchClick}
        buttonIsDisabled={btnIsDisabled}
      />
      {isLoading ? (
        <Hourglass height="200" width="200" colors={['#3A8AA6', '#ADE5FF']} />
      ) : !errorMsg ? (
        <ResultArea books={books} />
      ) : (
        <div>{errorMsg}</div>
      )}
    </div>
  );
}

export default App;
