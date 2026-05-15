import { useNavigate } from 'react-router-dom';
import './ResultItem.css';

type ResultItemProps = {
  title: string;
  bookId: string;
};

export default function ResultItem({ title, bookId }: ResultItemProps) {
  const navigate = useNavigate();

  const handleOnClick = async () => {
    navigate(`/${bookId}`);
  };

  return (
    <li className="item-title" aria-label="title" onClick={handleOnClick}>
      {title}
    </li>
  );
}
