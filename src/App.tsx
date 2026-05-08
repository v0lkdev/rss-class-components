import { Component } from 'react';
import './App.css';
import SearchArea from './components/SearchArea/SearchArea';
import ResultArea from './components/ResultArea/ResultArea';
import { searchBooks } from './api';
import { Hourglass } from 'react-loader-spinner';
import ErrorBtn from './components/ErrorBtn/ErrorBtn';


class App extends Component {
  state = {
    prevSearchQuery: '',
    searchQuery: localStorage.getItem('currentSearchValue') || '',
    books: [],
    isLoading: false,
    btnIsDisabled: false,
    errorMsg: null,
  };

  async componentDidMount() {
    this.performSearch(this.state.searchQuery);
  }

  async performSearch(query: string) {
    this.setState({ isLoading: true, btnIsDisabled: true });
    try {
      const result = await searchBooks(query);
      this.setState({
        books: result,
        prevSearchQuery: this.state.searchQuery,
        errorMsg: null,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unknown error';

      this.setState({ prevSearchQuery: this.state.searchQuery,
          errorMsg:  <div>
          Oops! Something went wrong.
          We couldn’t load the results.
          Please try again.
          Error: {message}
        </div> });
    }
    this.setState({ isLoading: false, btnIsDisabled: false});
  }

  onSearchQueryUpdate = (query: string) => {
    this.setState({ searchQuery: query });
  };

  onSearchClick = async () => {
    const query = this.state.searchQuery.trim();
    this.setState({
      searchQuery: query,
    });
    if (query !== this.state.prevSearchQuery) {
      localStorage.setItem('currentSearchValue', query);
      this.performSearch(query);
    }
  };

  render() {
    return (
      <div className="app-wrapper">
          <ErrorBtn />
          <div className='header'>Bookshelf</div>
          <SearchArea
            searchQuery={this.state.searchQuery}
            onChange={this.onSearchQueryUpdate}
            onClick={this.onSearchClick}
            buttonIsDisabled={this.state.btnIsDisabled}
          />
        {this.state.isLoading ? (
            <Hourglass
              height="200"
              width="200"
              colors={['#3A8AA6', '#ADE5FF']}
            />
        ) : !this.state.errorMsg ?
          <ResultArea books={this.state.books} /> 
          : this.state.errorMsg
        }
      </div>
    );
  }
}

export default App;
