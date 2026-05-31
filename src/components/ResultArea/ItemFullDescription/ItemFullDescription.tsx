import { useContext } from 'react';
import './ItemFullDescription.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../contexts';
import {
  useGetSelectedBookDescriptionQuery,
  useGetSelectedBookQuery,
} from '../../../store';

const COVER_API_URL = 'https://covers.openlibrary.org/b/id';

function composeBookCover(coverId: string | number | undefined | null) {
  if (!coverId) {
    return '../../../../public/stub-book-cover.jpg';
  }
  return `${COVER_API_URL}/${coverId}-L.jpg`;
}

export function ItemFullDescription() {
  const { bookId, page } = useParams() as { bookId: string; page: string };
  const navigate = useNavigate();

  const { data: book, isFetching: isBookFetching } =
    useGetSelectedBookQuery(bookId);
  const { data: description, isFetching: isDescriptionFetching } =
    useGetSelectedBookDescriptionQuery(bookId);

  const coverUrl = composeBookCover(book?.coverId);

  function handleOnClick(page: number) {
    navigate(`/${page}`);
  }

  const { theme } = useContext(ThemeContext);
  const themeClassname = theme;

  return (
    <>
      {isBookFetching || isDescriptionFetching ? (
        <div className={`loader ${themeClassname}`}>Loading...</div>
      ) : (
        <>
          <button
            className={`close-btn ${themeClassname}`}
            onClick={() => handleOnClick(Number(page))}
          >
            X
          </button>
          <div className={`wrapper ${themeClassname}`}>
            <img src={coverUrl} alt="book cover" />
            <p className={`book-title ${themeClassname}`}>{book?.title}</p>
            <p className={`book-author ${themeClassname}`}>by {book?.author}</p>
            <p className={`book-description ${themeClassname}`}>
              {description}
            </p>
            <p className={`publish-date ${themeClassname}`}>
              Published in{' '}
              <span className={`added-info ${themeClassname}`}>
                {book?.publishYear}
              </span>{' '}
              year
            </p>
            <p className="languages">
              Published in{' '}
              <span className={`added-info ${themeClassname}`}>
                {book?.language}
              </span>{' '}
              languages
            </p>
          </div>
        </>
      )}
    </>
  );
}
