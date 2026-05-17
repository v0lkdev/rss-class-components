import { useEffect, useState } from 'react';
import './ItemFullDescription.css';
import {
  searchSelectedBook,
  searchSelectedBookDescription,
  searchBookCover,
  type Book,
} from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';

export function ItemFullDescription() {
  const { bookId, page } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({} as Book);
  const [coverUrl, setCoverUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!bookId) {
      return;
    }
    (async () => {
      setIsLoading(true);
      const book = await searchSelectedBook(bookId);
      const coverUrl = book.coverId
        ? searchBookCover(book.coverId)
        : '../../../../public/stub-book-cover.jpg';
      const description = await searchSelectedBookDescription(bookId);
      setBook(book);
      setCoverUrl(coverUrl);
      setDescription(description);
      setIsLoading(false);
    })();
  }, [bookId]);

  function handleOnClick(page: number) {
    navigate(`/${page}`);
  }

  return (
    <>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <button className="close-btn" onClick={() => handleOnClick(Number(page))}>
            X
          </button>
          <div className="wrapper">
            <img src={coverUrl} alt="book cover" />
            <p className="book-title">{book.title}</p>
            <p className="book-author">by {book.author}</p>
            <p className="book-description">{description}</p>
            <p className="publish-date">
              Published in{' '}
              <span className="added-info">{book.publishYear}</span> year
            </p>
            <p className="languages">
              Published in <span className="added-info">{book.language}</span>{' '}
              languages
            </p>
          </div>
        </>
      )}
    </>
  );
}
