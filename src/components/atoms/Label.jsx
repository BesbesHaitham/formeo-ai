import classNames from 'classnames';
import styles from './Primitives.module.css';

export default function Label({ className, children, ...rest }) {
  return (
    <label className={classNames(styles.label, className)} {...rest}>
      {children}
    </label>
  );
}
