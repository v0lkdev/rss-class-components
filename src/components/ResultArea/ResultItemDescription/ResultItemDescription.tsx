import './ResultItemDescription.css';

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
  return (
    <li aria-label="description">
      Author - <span className="description-data">{author}</span>; First publish
      year - <span className="description-data">{publishYear}</span>; Edition
      count - <span className="description-data">{editionCount}</span>
    </li>
  );
}
