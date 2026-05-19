import { useNavigate } from 'react-router-dom';
import './PaginationControlItem.css';

interface PaginationControlItemProps {
  page: number;
  onClick: (page: number) => void;
  selected: boolean;
}

export function PaginationControlItem({
  page,
  onClick,
  selected,
}: PaginationControlItemProps) {
  const navigate = useNavigate();

  function handleOnClick(page: number) {
    onClick(page);
    navigate(`/${page}`);
  }
  return (
    <li
      className={
        selected
          ? 'pagination-control-item selected'
          : 'pagination-control-item'
      }
      onClick={() => handleOnClick(page)}
    >
      {page}
    </li>
  );
}
