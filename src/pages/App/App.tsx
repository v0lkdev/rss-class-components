import { useContext, useState } from 'react';
import './App.css';
import SearchArea from '../../components/SearchArea/SearchArea';
import ResultArea from '../../components/ResultArea/ResultArea';
import { Hourglass } from 'react-loader-spinner';
import ErrorBtn from '../../components/ErrorBtn/ErrorBtn';
import { useLocalStorage } from '../../components/useLocalStorage';
import { PaginationControls } from '../../components/ResultArea/PaginationControls/PaginationControls';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../contexts';
import { useGetBooksQuery } from '../../store';

function App() {
  const [localStorageValue, setLocalStorage] =
    useLocalStorage('currentSearchValue');
  const { page } = useParams();

  const [searchQuery, setSearchQuery] = useState(localStorageValue);
  const [submittedQuery, setSubmittedQuery] = useState(searchQuery);
  const itemsOnPagelimit = 10;
  const { theme, handleThemeChange } = useContext(ThemeContext);
  const themeClassName = theme;

  const navigate = useNavigate();

  const { data, error, isFetching } = useGetBooksQuery({
    query: submittedQuery,
    page: Number(page) || 1,
    limit: itemsOnPagelimit,
  });
  const errorMsg = error as string;
  const books = data?.books || [];
  const booksFoundTotal = data?.booksFoundTotal || 0;

  function onSearchQueryUpdate(query: string) {
    setSearchQuery(query);
  }

  function onSearchClick() {
    const query = searchQuery.trim();
    if (query !== submittedQuery) {
      setLocalStorage(query);
      setSubmittedQuery(query);
      navigate('/1');
    }
  }

  return (
    <div className="app-wrapper">
      <div className="theme-selector-wrapper">
        <input
          id="dark"
          name="dark"
          type="checkbox"
          value="Dark"
          onChange={handleThemeChange}
          checked={theme === 'dark'}
        />
        <label htmlFor="dark">Dark Theme</label>
      </div>
      <div className="buttons-menu">
        <NavLink to="/about" className={`nav-link-about ${themeClassName}`}>
          About
        </NavLink>
        <ErrorBtn />
      </div>
      <div className={`header ${themeClassName}`}>Bookshelf</div>
      <SearchArea
        searchQuery={searchQuery}
        onChange={onSearchQueryUpdate}
        onClick={onSearchClick}
        buttonIsDisabled={isFetching}
      />
      {isFetching ? (
        <Hourglass height="200" width="200" colors={['#3A8AA6', '#ADE5FF']} />
      ) : !errorMsg ? (
        <>
          <ResultArea books={books} />
          <PaginationControls
            limit={itemsOnPagelimit}
            itemsTotal={booksFoundTotal}
            onPageChange={(page: number) => navigate(`/${page}`)}
          />
        </>
      ) : (
        <div>{errorMsg}</div>
      )}
    </div>
  );
}

export default App;
