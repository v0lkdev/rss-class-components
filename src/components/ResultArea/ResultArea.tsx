import './ResultArea.css';
import ResultItem from './ResultItem/ResultItem';
import ResultItemDescription from './ResultItemDescription/ResultItemDescription';

interface Book {
  title: string;
  author: string;
  publishYear: number | string;
  editionCount: number | string;
}

interface ResultAreaProps {
  books: Book[];
}

export default function ResultArea({ books }: ResultAreaProps) {
  return (
    <div className="result-area">
      {books.length > 0 ? (
        <>
          <div className="item-title-wrapper">
            <div className="list-header">Book name</div>
            <ol className="item-title-list">
              {books.map((book, index) => {
                return <ResultItem key={index} title={book.title} />;
              })}
            </ol>
          </div>
          <div className="item-description-wrapper">
            <div className="list-header">Book Description</div>
            <ol className="item-description-list">
              {books.map((book, index) => {
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
        </>
      ) : (
        <div>No books found</div>
      )}
    </div>
  );
}
