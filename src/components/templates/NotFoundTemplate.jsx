import NotFoundContent from '../organisms/NotFoundContent';
import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import styles from './Templates.module.css';

export default function NotFoundTemplate({
  content = uiContent.NotFoundTemplate,
  message = content.message,
  className,
}) {
  return (
    <main id="main-content" tabIndex={-1} className={classNames(styles.center, className)}>
      <NotFoundContent content={content} message={message} />
    </main>
  );
}
