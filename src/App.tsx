import { Component } from 'react'
import './App.css'
import SearchArea from './components/SearchArea/SearchArea';
import ResultArea from './components/ResultArea/ResultArea';

class App extends Component {
  render () {
    return (
      <div className='app-wrapper'>
        <SearchArea />
        <ResultArea />
      </div>
    )
  }
}

export default App;
