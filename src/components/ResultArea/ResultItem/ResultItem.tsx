import './ResultItem.css';

type ResultItemProps = {
  title: string;
};

export default function ResultItem({ title }: ResultItemProps) {
  return (
    <li className="item-title" aria-label="title">
      {title}
    </li>
  );
}
