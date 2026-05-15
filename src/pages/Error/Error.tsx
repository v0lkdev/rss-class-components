import './Error.css';
import { NavLink } from 'react-router-dom';

export function Error() {
  return (
    <div className="container">
      <div className="test-error">
        Oops😢 Something went wrong. Please, reload the page
      </div>
      <NavLink to="/" className="nav-link-go-back">
        Go back
      </NavLink>
    </div>
  );
}
