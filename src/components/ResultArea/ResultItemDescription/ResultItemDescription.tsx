import { useContext } from 'react';
import './ResultItemDescription.css';
import { ThemeContext } from '../../../contexts';

type ResultItemDescriptionProps = {
  author: string;
  publishYear: number | string;
  editionCount: number | string;
};

export default function ResultItemDescription({
  author,
  publishYear,
  editionCount,
}: ResultItemDescriptionProps) {
  const { theme } = useContext(ThemeContext);
  const themeClassName = theme;

  return (
    <li aria-label="description" className={themeClassName}>
      Author - <span className="description-data">{author}</span>; First publish
      year - <span className="description-data">{publishYear}</span>; Edition
      count - <span className="description-data">{editionCount}</span>
    </li>
  );
}
