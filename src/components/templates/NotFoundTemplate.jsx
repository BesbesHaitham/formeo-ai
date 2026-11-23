import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from '../molecules/Logo';
import styles from './Templates.module.css';

export default function NotFoundTemplate({ message = 'This form could not be found', className }) {
  return (
    <main id="main-content" tabIndex={-1} className={classNames(styles.center, className)}>
      <Logo content={uiContent.Logo} />
      <h1
        style={{
          marginTop: 45,
        }}
      >
        {message}
      </h1>
      <p>
        This form may be unavailable or unpublished. Check the link, or return to your workspace.
      </p>
      <Link
        to="/"
        style={{
          color: 'var(--primary)',
        }}
      >
        ← Back to forms
      </Link>
    </main>
  );
}
