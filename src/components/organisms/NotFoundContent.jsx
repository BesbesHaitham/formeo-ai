import { uiContent } from '../../content/uiContent';
import { Link } from 'react-router-dom';
import Logo from '../molecules/Logo';
import styles from '../templates/Templates.module.css';

export default function NotFoundContent({ content = uiContent.NotFoundTemplate, message }) {
  return (
    <>
      <Logo content={uiContent.Logo} />
      <h1 className={styles.notFoundTitle}>{message}</h1>
      <p>{content.description}</p>
      <Link to="/" className={styles.returnLink}>
        {content.backToForms}
      </Link>
    </>
  );
}
