import './ResultArea.css';
import ResultItem from './ResultItem/ResultItem';
import { ResultDescriptionSection } from './ResultDescriptionSection/ResultDescriptionSection';
import { useOutlet } from 'react-router-dom';
import { usePathname } from 'next/navigation';
// import { useContext } from 'react';
// import { ThemeContext } from '../../contexts';

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
  const pathname = usePathname();
  // const { theme } = useContext(ThemeContext);
  // const themeClassName = theme;
  const themeClassName = 'light';

  return (
    <>
      <div className={`result-area ${themeClassName}`}>
        {books.length > 0 ? (
          <>
            <div className={`item-title-wrapper ${themeClassName}`}>
              <div className="list-header">Book name</div>
              <ol className="item-title-list">
                {books.map((book, index) => {
                  return (
                    <ResultItem
                      key={index}
                      title={book.title}
                      bookId={book.bookId}
                      active={
                        pathname.slice(
                          pathname.indexOf('/works')
                        ) === `${book.bookId}`
                      }
                    />
                  );
                })}
              </ol>
            </div>
            <div className={`item-description-wrapper ${themeClassName}`}>
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
