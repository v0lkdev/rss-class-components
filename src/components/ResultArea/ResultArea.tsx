import { Component } from "react";
import './ResultArea.css'

export default class ResultArea extends Component {
    render() {
        return (
            <div className="result-area">
                <div className="item-name-wrapper">
                    <div className="list-header">Book name</div>
                    <ol className="item-name"></ol>
                </div>
                <div className="item-description-wrapper">
                    <div className="list-header">Book Description</div>
                    <ol className="item-description">
                    </ol>
                </div>
            </div>
        )
    }
}