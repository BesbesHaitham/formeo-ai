import classNames from 'classnames';
import styles from './Primitives.module.css';
export default function Spinner({ className, ...rest }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={classNames(styles.spinner, className)}
      {...rest}
    />
  );
}
