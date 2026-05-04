import { Component } from 'react'
import './App.css'
import SearchArea from './components/SearchArea/SearchArea';
import ResultArea from './components/ResultArea/ResultArea';
import {searchBooks} from './api';
import { Hourglass } from 'react-loader-spinner';

class App extends Component {

  state = {
    prevSearchQuery: '',
    searchQuery: localStorage.getItem('currentSearchValue') || '',
    books: [],
    isLoading: false,
    btnIsDisabled: false,
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    this.setState({btnIsDisabled: true});
    try {
      const result = await searchBooks(this.state.searchQuery);
      this.setState({
        books: result,
        prevSearchQuery: this.state.searchQuery,
      });
    }
    catch (err: unknown) {
        alert (`Oops! Something went wrong. We couldn’t load the results. Please try again. Error: ${(err as Error).message}`)
    }
    this.setState({isLoading: false});
    this.setState({btnIsDisabled: false});
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
      this.setState({isLoading: true});
      this.setState({btnIsDisabled: true});
      localStorage.setItem('currentSearchValue', query);
      try {
        const result = await searchBooks(query);
        this.setState({
          books: result,
          prevSearchQuery: query,
        });
      }
      catch (err: unknown) {
        alert (`Oops! Something went wrong. We couldn’t load the results. Please try again. Error: ${(err as Error).message}`)
      }
      this.setState({isLoading: false});
      this.setState({btnIsDisabled: false});
    }
  }

  render () {
    return (
      <div className='app-wrapper'>
        <SearchArea 
          searchQuery={this.state.searchQuery} 
          onChange={this.onSearchQueryUpdate} 
          onClick={this.onSearchClick}
          buttonIsDisabled={this.state.btnIsDisabled}
        />
        {
          this.state.isLoading
          ? <Hourglass
            height="500"
            width="500"
            colors={['#3A8AA6', '#ADE5FF']}
          />
          : <ResultArea books={this.state.books}/>
        }
        
        
      </div>
    )
  }
}

export default App;
