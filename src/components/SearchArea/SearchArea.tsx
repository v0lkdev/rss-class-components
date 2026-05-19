import type { ChangeEvent } from 'react';
import './SearchArea.css';

type SearchAreaProps = {
  searchQuery: string;
  onChange: (query: string) => void;
  onClick: () => void;
  buttonIsDisabled: boolean;
};

export default function SearchArea({
  searchQuery,
  onChange,
  onClick,
  buttonIsDisabled,
}: SearchAreaProps) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className="search-area">
      <input
        type="text"
        className="search-input"
        placeholder="Type book name..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        className="search-btn"
        onClick={onClick}
        disabled={buttonIsDisabled}
      >
        Search
      </button>
    </div>
  );
}
