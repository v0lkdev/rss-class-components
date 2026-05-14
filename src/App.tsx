import { useEffect, useState, type JSX } from 'react';
import './App.css';
import SearchArea from './components/SearchArea/SearchArea';
import ResultArea from './components/ResultArea/ResultArea';
import { searchBooks } from './api';
import { Hourglass } from 'react-loader-spinner';
import ErrorBtn from './components/ErrorBtn/ErrorBtn';

interface Book {
  title: string;
  author: string;
  publishYear: number | string;
  editionCount: number | string;
}

type State = {
  prevSearchQuery: string;
  searchQuery: string;
  books: Book[];
  isLoading: boolean;
  btnIsDisabled: boolean;
  errorMsg: JSX.Element | null;
};

function App() {
  const [state, setState] = useState<State>({
    prevSearchQuery: '',
    searchQuery: localStorage.getItem('currentSearchValue') || '',
    books: [],
    isLoading: false,
    btnIsDisabled: false,
    errorMsg: null,
  });

  useEffect(() => {
    const runSearch = async () => {
      await performSearch(state.searchQuery);
    };
    runSearch();
  }, []);

  async function performSearch(query: string) {
    setState({
      ...state,
      isLoading: true,
      btnIsDisabled: true,
    });
    try {
      const result = await searchBooks(query);
      console.log(result);
      setState((prevState) => ({
        ...prevState,
        books: result,
        prevSearchQuery: state.searchQuery,
        errorMsg: null,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';

      setState((prevState) => ({
        ...prevState,
        prevSearchQuery: state.searchQuery,
        errorMsg: (
          <div>
            Oops! Something went wrong. We couldn’t load the results. Please try
            again. Error: {message}
          </div>
        ),
      }));
    }
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      btnIsDisabled: false,
    }));
  }

  function onSearchQueryUpdate(query: string) {
    setState({
      ...state,
      searchQuery: query,
    });
  }

  async function onSearchClick() {
    const query = state.searchQuery.trim();
    setState({
      ...state,
      searchQuery: query,
    });
    if (query !== state.prevSearchQuery) {
      localStorage.setItem('currentSearchValue', query);
      performSearch(query);
    }
  }

  return (
    <div className="app-wrapper">
      <ErrorBtn />
      <div className="header">Bookshelf</div>
      <SearchArea
        searchQuery={state.searchQuery}
        onChange={onSearchQueryUpdate}
        onClick={onSearchClick}
        buttonIsDisabled={state.btnIsDisabled}
      />
      {state.isLoading ? (
        <Hourglass height="200" width="200" colors={['#3A8AA6', '#ADE5FF']} />
      ) : !state.errorMsg ? (
        <ResultArea books={state.books} />
      ) : (
        state.errorMsg
      )}
    </div>
  );
}

export default App;
