import './About.css';

export function About() {
  return (
    <div className="about-wrapper">
      <div className="author-info">
        <p className="title">Website author info:</p>
        <div className="name">
          <span className="descriptive-column">Name:</span>{' '}
          <span>Yulia Volk</span>
        </div>
        <div className="git-link">
          <span className="descriptive-column">Github page:</span>{' '}
          <a
            href="https://github.com/v0lkdev"
            className="link-to-author-github"
          >
            here
          </a>
        </div>
      </div>

      <div className="school-link-wrapper">
        <span>Link to the RS-school React Course</span>{' '}
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
