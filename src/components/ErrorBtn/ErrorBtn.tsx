import { useState } from 'react';
import './ErrorBtn.css';

export default function ErrorBtn() {
  const [hasError, setHasError] = useState(false);

  function handleOnClick() {
    setHasError(true);
  }

  if (hasError) {
    throw new Error('Example Error: Boom💥');
  }
  return (
    <button className="error-btn" onClick={handleOnClick}>
      Simulate Error
    </button>
  );
}
