import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from '../molecules/Logo';
import styles from './Templates.module.css';
export default function NotFoundTemplate({ message = 'This form could not be found', className }) {
  return (
    <main className={classNames(styles.center, className)}>
      <Logo content={uiContent.Logo} />
      <h1
        style={{
          marginTop: 45,
        }}
      >
        {message}
      </h1>
      <p>Forms are available only in the browser where they were created.</p>
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
