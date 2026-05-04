import { Component } from 'react'
import './App.css'
import SearchArea from './components/SearchArea/SearchArea';
import ResultArea from './components/ResultArea/ResultArea';
import {searchBooks} from './api';


class App extends Component {

  state = {
    prevSearchQuery: '',
    searchQuery: localStorage.getItem('currentSearchValue') || '',
    books: [],
  }

  async componentDidMount() {
    const result = await searchBooks(this.state.searchQuery);
    this.setState({
      books: result,
      prevSearchQuery: this.state.searchQuery,
    });
  }

  onSearchQueryUpdate = (query: string) => {
    this.setState({searchQuery: query});
  }

  onSearchClick = async () => {
    const query = this.state.searchQuery.trim();
    this.setState({
      searchQuery: query,
    });
    if (query !== this.state.prevSearchQuery) {
      localStorage.setItem('currentSearchValue', query);
      const result = await searchBooks(query);
      this.setState({
        books: result,
        prevSearchQuery: query,
      });
    }
  }

  render () {
    return (
      <div className='app-wrapper'>
        <SearchArea 
          searchQuery={this.state.searchQuery} 
          onChange={this.onSearchQueryUpdate} 
          onClick={this.onSearchClick}
        />
        <ResultArea books={this.state.books}/>
      </div>
    )
  }
}

export default App;
