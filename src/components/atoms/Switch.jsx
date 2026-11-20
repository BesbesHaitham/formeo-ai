import classNames from 'classnames';
import styles from './Primitives.module.css';
export default function Switch({ className, ...rest }) {
  return (
    <input
      type="checkbox"
      role="switch"
      className={classNames(styles.switch, className)}
      {...rest}
    />
  );
}
