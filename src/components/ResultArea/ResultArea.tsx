import './ResultArea.css';
import ResultItem from './ResultItem/ResultItem';
import { ResultDescriptionSection } from './ResultDescriptionSection/ResultDescriptionSection';
import { useLocation, useOutlet } from 'react-router-dom';

interface Book {
  title: string;
  author: string;
  publishYear: number | string;
  editionCount: number | string;
  bookId: string;
}

interface ResultAreaProps {
  books: Book[];
}

export default function ResultArea({ books }: ResultAreaProps) {
  const outlet = useOutlet();
  const location = useLocation();

  return (
    <>
      <div className="result-area">
        {books.length > 0 ? (
          <>
            <div className="item-title-wrapper">
              <div className="list-header">Book name</div>
              <ol className="item-title-list">
                {books.map((book, index) => {
                  return (
                    <ResultItem
                      key={index}
                      title={book.title}
                      bookId={book.bookId}
                      active={location.pathname == `${book.bookId}`}
                    />
                  );
                })}
              </ol>
            </div>
            <div className="item-description-wrapper">
              <div className="list-header">Book Description</div>
              {outlet ? outlet : <ResultDescriptionSection books={books} />}
            </div>
          </>
        ) : (
          <div>No books found</div>
        )}
      </div>
    </>
  );
}
