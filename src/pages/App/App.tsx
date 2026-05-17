import { useEffect, useState } from 'react';
import './App.css';
import SearchArea from '../../components/SearchArea/SearchArea';
import ResultArea from '../../components/ResultArea/ResultArea';
import { searchBooks } from '../../api';
import { Hourglass } from 'react-loader-spinner';
import ErrorBtn from '../../components/ErrorBtn/ErrorBtn';
import { useLocalStorage } from '../../components/useLocalStorage';
import { PaginationControls } from '../../components/ResultArea/PaginationControls/PaginationControls';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

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
  const {page} = useParams();

  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState(localStorageValue);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [booksFoundTotal, setBooksFoundTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState (Number(page) || 1);
  const itemsOnPagelimit = 10;



  const navigate = useNavigate();
  async function performSearch(query: string, page: number, limit: number) {
    setIsLoading(true);
    setBtnIsDisabled(true);
    try {
      const {books, booksFoundTotal} = await searchBooks(query, page, limit);
      setBooks(books);
      setPrevSearchQuery(searchQuery);
      setBooksFoundTotal(booksFoundTotal);
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
      navigate('/');
      setLocalStorage(query);
    }
  }

  useEffect(() => {
      (async () => {
        performSearch(searchQuery, currentPage, itemsOnPagelimit);
      })();
    }, [currentPage]);

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
      <>
        <ResultArea books={books}/>
        <PaginationControls 
          limit={itemsOnPagelimit}
          itemsTotal={booksFoundTotal} 
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </>
      ) : (
        <div>{errorMsg}</div>
      )}
    </div>
  );
}

export default App;
