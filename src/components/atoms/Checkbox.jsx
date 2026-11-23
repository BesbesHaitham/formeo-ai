import classNames from 'classnames';
import styles from './Primitives.module.css';

export default function Checkbox({ className, ...rest }) {
  return <input type="checkbox" className={classNames(styles.checkbox, className)} {...rest} />;
}
