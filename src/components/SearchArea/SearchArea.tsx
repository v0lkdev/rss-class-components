import { Component } from "react";
import type { ChangeEvent } from 'react';
import './SearchArea.css';

type SearchAreaProps = {
    searchQuery: string,
    onChange: (query: string) => void;
}

export default class SearchArea extends Component<SearchAreaProps> {

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <div className="search-area">
                <input
                    type="text" 
                    className="search-input"
                    placeholder="Type book name..." 
                    defaultValue={this.props.searchQuery}
                    onChange={this.handleInputChange}
                />
                <button className="search-btn">Search</button>
            </div>
        )
    }
}
