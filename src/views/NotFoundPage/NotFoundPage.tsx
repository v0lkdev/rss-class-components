import './NotFoundPage.css';
import { NavLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="wrapper">
      <div className="img">
        <img src="/404.png" alt="404 image" />
      </div>
      <p className="not-found">Page not found</p>
      <p className="oops">Oops! The page you are looking for does not exist</p>
      <NavLink to="/" className="nav-link-back-home">
        BACK TO HOME
      </NavLink>
    </div>
  );
}
