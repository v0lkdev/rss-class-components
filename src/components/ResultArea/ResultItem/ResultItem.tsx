import { useNavigate } from 'react-router-dom';
import './ResultItem.css';
// import { useContext } from 'react';
// import { ThemeContext } from '../../../contexts';

type ResultItemProps = {
  title: string;
  bookId: string;
  active: boolean;
};

export default function ResultItem({ title, bookId, active }: ResultItemProps) {
  const navigate = useNavigate();
  // const { theme } = useContext(ThemeContext);
  // const themeClassName = theme;
  const themeClassName = 'light';

  const handleOnClick = async () => {
    const slicedBookId = bookId.slice(1);
    navigate(`${slicedBookId}`);
  };

  return (
    <li
      className={
        active
          ? `selected item-title ${themeClassName}`
          : `item-title ${themeClassName}`
      }
      aria-label="title"
      onClick={handleOnClick}
    >
      {title}
    </li>
  );
}
