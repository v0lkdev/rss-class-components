import { useContext } from 'react';
import './About.css';
import { ThemeContext } from '../../contexts';

export function About() {
  const { theme } = useContext(ThemeContext);
  const themeClassName = theme;

  return (
    <div className="about-wrapper">
      <div className="author-info">
        <p className={`title ${themeClassName}`}>Website author info:</p>
        <div className="name">
          <span className={`descriptive-column ${themeClassName}`}>Name:</span>{' '}
          <span className={themeClassName}>Yulia Volk</span>
        </div>
        <div className="git-link">
          <span className={`descriptive-column ${themeClassName}`}>
            Github page:
          </span>{' '}
          <a
            href="https://github.com/v0lkdev"
            className={`link-to-author-github ${themeClassName}`}
          >
            here
          </a>
        </div>
      </div>

      <div className="school-link-wrapper">
        <span className={themeClassName}>
          Link to the RS-school React Course
        </span>{' '}
        <a
          href="https://wearecommunity.io/events/rs-react-2026q2"
          className="link-to-course"
        >
          here
        </a>
      </div>
    </div>
  );
}
