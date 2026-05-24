import { useContext, type ChangeEvent } from 'react';
import './SearchArea.css';
import { ThemeContext } from '../../contexts';

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
  const { theme } = useContext(ThemeContext);
  const themeClassName = theme;

  return (
    <div className={`search-area ${themeClassName}`}>
      <input
        type="text"
        className={`search-input ${themeClassName}`}
        placeholder="Type book name..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        className={`search-btn ${themeClassName}`}
        onClick={onClick}
        disabled={buttonIsDisabled}
      >
        Search
      </button>
    </div>
  );
}
