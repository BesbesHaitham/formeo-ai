import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import styles from './Primitives.module.css';

export default function Spinner({ content = uiContent.Spinner, className, ...rest }) {
  return (
    <span
      role="status"
      aria-label={content.loading}
      className={classNames(styles.spinner, className)}
      {...rest}
    />
  );
}
