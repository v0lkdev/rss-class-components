import './PaginationControls.css';
import { PaginationControlItem } from '../PaginationControlItem/PaginationControlItem';
import { useParams } from 'react-router-dom';


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
  const pages = Array.from({ length: pagesTotal }, (_, index) => index + 1);

  return (
    <ul className="pagination-wrapper">
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
