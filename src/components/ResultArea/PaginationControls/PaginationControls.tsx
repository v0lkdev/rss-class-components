import './PaginationControls.css';
import { PaginationControlItem } from '../PaginationControlItem/PaginationControlItem';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts';

interface PaginationControlsProps {
  itemsTotal: number;
  limit: number;
  onPageChange: (page: number) => void;
}
export function PaginationControls({
  itemsTotal,
  limit,
  onPageChange,
}: PaginationControlsProps) {
  const { page } = useParams();

  const pagesTotal = Math.ceil(itemsTotal / limit);
  const pages = Array.from({ length: pagesTotal < 100 ? pagesTotal : 100 }, (_, index) => index + 1);
  const { theme } = useContext(ThemeContext);
  const themeClassName = theme;

  return (
    <ul className={`pagination-wrapper ${themeClassName}`}>
      {pages.map((pageNumber) => {
        return (
          <PaginationControlItem
            key={pageNumber}
            page={pageNumber}
            onClick={onPageChange}
            selected={pageNumber === Number(page)}
          />
        );
      })}
    </ul>
  );
}
