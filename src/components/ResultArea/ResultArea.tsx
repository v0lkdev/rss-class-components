import { Component } from "react";
import './ResultArea.css'
import ResultItem from "./ResultItem/Resultem";
import ResultItemDescription from "./ResultItemDescription/ResultItemDescription";

export default class ResultArea extends Component {


    render() {
        return (
            <div className="result-area">
                <div className="item-title-wrapper">
                    <div className="list-header">Book name</div>
                    <ol className="item-title-list"> 
                        <ResultItem title="Oliver Twist"/>  
                        <ResultItem title="Oliver Twist"/>  
                    </ol>
                </div>
                <div className="item-description-wrapper">
                    <div className="list-header">Book Description</div>
                    <ol className="item-description-list">
                        <ResultItemDescription author='Charles Dickens' publishYear={1822} editionCount={2209}/> 
                        <ResultItemDescription author='Charles Dickens' publishYear={1822} editionCount={2209}/>  
                    </ol>
                </div>  
            </div>
        )
    }
}
