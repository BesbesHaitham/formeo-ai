import classNames from 'classnames';
import styles from './Primitives.module.css';

export default function Select({ className, children, ...rest }) {
  return (
    <select className={classNames(styles.select, className)} {...rest}>
      {children}
    </select>
  );
}
