import './ResultDescriptionSection.css'
import ResultItemDescription from '../ResultItemDescription/ResultItemDescription';

interface Book {
  title: string;
  author: string;
  publishYear: number | string;
  editionCount: number | string;
  bookId: string;
}

interface ResultDescriptionSectionProps {
  books: Book[];
}

export function ResultDescriptionSection({books}: ResultDescriptionSectionProps) {
    return(
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
    )
}