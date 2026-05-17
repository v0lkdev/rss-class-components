import { useNavigate } from 'react-router-dom';
import './ResultItem.css';

type ResultItemProps = {
  title: string;
  bookId: string;
  active: boolean;
};

export default function ResultItem({ title, bookId, active }: ResultItemProps) {
  const navigate = useNavigate();

  const handleOnClick = async () => {
    const slicedBookId = bookId.slice(1);
    navigate(`${slicedBookId}`);
  };

  return (
    <li
      className={active ? 'selected item-title' : 'item-title'}
      aria-label="title"
      onClick={handleOnClick}
    >
      {title}
    </li>
  );
}
