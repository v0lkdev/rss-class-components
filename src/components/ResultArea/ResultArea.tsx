import { Component } from 'react';
import './ResultArea.css';
import ResultItem from './ResultItem/Resultem';
import ResultItemDescription from './ResultItemDescription/ResultItemDescription';

interface Book {
  title: string;
  author: string;
  publishYear: number;
  editionCount: number;
}

interface ResultAreaProps {
  books: Book[];
}

export default class ResultArea extends Component<ResultAreaProps> {
  render() {
    return (
      <div className="result-area">
        <div className="item-title-wrapper">
          <div className="list-header">Book name</div>
          <ol className="item-title-list">
            {this.props.books.map((book, index) => {
              return <ResultItem key={index} title={book.title} />;
            })}
          </ol>
        </div>
        <div className="item-description-wrapper">
          <div className="list-header">Book Description</div>
          <ol className="item-description-list">
            {this.props.books.map((book, index) => {
              return (
                <ResultItemDescription
                  key={index}
                  author={book.author}
                  publishYear={book.publishYear}
                  editionCount={book.editionCount}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
