import classNames from 'classnames';
import styles from './Primitives.module.css';

export default function Input({ className, type = 'text', ...rest }) {
  return <input type={type} className={classNames(styles.input, className)} {...rest} />;
}
