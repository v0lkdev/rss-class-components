import { Component } from 'react';
import './App.css';
import SearchArea from './components/SearchArea/SearchArea';
import ResultArea from './components/ResultArea/ResultArea';
import { searchBooks } from './api';
import { Hourglass } from 'react-loader-spinner';
import ErrorBtn from './components/ErrorBtn/ErrorBtn';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  state = {
    prevSearchQuery: '',
    searchQuery: localStorage.getItem('currentSearchValue') || '',
    books: [],
    isLoading: false,
    btnIsDisabled: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({ btnIsDisabled: true });
    try {
      const result = await searchBooks(this.state.searchQuery);
      this.setState({
        books: result,
        prevSearchQuery: this.state.searchQuery,
      });
    } catch (err: unknown) {
      alert(
        `Oops! Something went wrong. We couldn’t load the results. Please try again. Error: ${(err as Error).message}`
      );
    }
    this.setState({ isLoading: false });
    this.setState({ btnIsDisabled: false });
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
      this.setState({ isLoading: true });
      this.setState({ btnIsDisabled: true });
      localStorage.setItem('currentSearchValue', query);
      try {
        const result = await searchBooks(query);
        this.setState({
          books: result,
          prevSearchQuery: query,
        });
      } catch (err: unknown) {
        alert(
          `Oops! Something went wrong. We couldn’t load the results. Please try again. Error: ${(err as Error).message}`
        );
      }
      this.setState({ isLoading: false });
      this.setState({ btnIsDisabled: false });
    }
  };

  render() {
    return (
      <div className="app-wrapper">
        <ErrorBoundary fallback={<div>Oops😢</div>}>
          <ErrorBtn />
        </ErrorBoundary>
        <ErrorBoundary fallback={<div>Oops😢</div>}>
          <SearchArea
            searchQuery={this.state.searchQuery}
            onChange={this.onSearchQueryUpdate}
            onClick={this.onSearchClick}
            buttonIsDisabled={this.state.btnIsDisabled}
          />
        </ErrorBoundary>
        {this.state.isLoading ? (
          <ErrorBoundary fallback={<div>Oops😢</div>}>
            <Hourglass
              height="200"
              width="200"
              colors={['#3A8AA6', '#ADE5FF']}
            />
          </ErrorBoundary>
        ) : (
          <ErrorBoundary fallback={<div>Oops😢</div>}>
            <ResultArea books={this.state.books} />
          </ErrorBoundary>
        )}
      </div>
    );
  }
}

export default App;
