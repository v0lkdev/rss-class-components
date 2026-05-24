import { useNavigate } from 'react-router-dom';
import './PaginationControlItem.css';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts';

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
  const { theme } = useContext(ThemeContext);
  const themeClassName = theme;

  function handleOnClick(page: number) {
    onClick(page);
    navigate(`/${page}`);
  }
  return (
    <li
      className={
        selected
          ? `pagination-control-item selected ${themeClassName}`
          : `pagination-control-item ${themeClassName}`
      }
      onClick={() => handleOnClick(page)}
    >
      {page}
    </li>
  );
}
