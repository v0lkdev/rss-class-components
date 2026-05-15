import './Error.css';
import { Link } from 'react-router-dom';

export function Error() {
  return (
    <div className="container">
      <div className="test-error">
        Oops😢 Something went wrong. Please, reload the page
      </div>
      <Link to="/" className="nav-link-go-back">
        Go back
      </Link>
    </div>
  );
}
