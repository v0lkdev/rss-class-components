import { Component } from "react";
import './SearchArea.css';

export default class SearchArea extends Component {
    render() {
        return (
            <div className="search-area">
                <input type="text" className="search-input" placeholder="Type book name..."/>
                <button className="search-btn">Search</button>
            </div>
        )
    }
}
