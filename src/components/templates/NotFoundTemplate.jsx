import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from '../molecules/Logo';
import styles from './Templates.module.css';

export default function NotFoundTemplate({
  content = uiContent.NotFoundTemplate,
  message = content.message,
  className,
}) {
  return (
    <main id="main-content" tabIndex={-1} className={classNames(styles.center, className)}>
      <Logo content={uiContent.Logo} />
      <h1 className={styles.notFoundTitle}>{message}</h1>
      <p>{content.description}</p>
      <Link to="/" className={styles.returnLink}>
        {content.backToForms}
      </Link>
    </main>
  );
}
