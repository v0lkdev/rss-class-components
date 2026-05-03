import { Component } from "react";
import type { ChangeEvent } from 'react';
import './SearchArea.css';

export default class SearchArea extends Component {
    state = {
        inputInitialValue: localStorage.getItem('currentSearchValue') || '',
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputInitialValue: e.target.value
        });
        localStorage.setItem('currentSearchValue',  e.target.value);
    }

    render() {
        return (
            <div className="search-area">
                <input
                    type="text" 
                    className="search-input"
                    placeholder="Type book name..." 
                    value={this.state.inputInitialValue}
                    onChange={this.handleInputChange}
                />
                <button className="search-btn">Search</button>
            </div>
        )
    }
}
