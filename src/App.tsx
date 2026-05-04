import { Component } from 'react'
import './App.css'
import SearchArea from './components/SearchArea/SearchArea';
import ResultArea from './components/ResultArea/ResultArea';
import {searchBooks} from './api';


class App extends Component {

  state = {
      searchQuery: localStorage.getItem('currentSearchValue') || '',
      books: [],
  }
    
  async componentDidMount() {
    let query = this.state.searchQuery;
    if (query.length < 3) {
      query = 'new';
    }
    const result = await searchBooks(query);
    this.setState({books: result});
  }

  onSearchQueryUpdate = (query: string) => {
    this.setState({searchQuery: query});
    localStorage.setItem('currentSearchValue', query);
  }

  render () {
    return (
      <div className='app-wrapper'>
        <SearchArea searchQuery={this.state.searchQuery} onChange={this.onSearchQueryUpdate}/>
        <ResultArea books={this.state.books} />
      </div>
    )
  }
}

export default App;
