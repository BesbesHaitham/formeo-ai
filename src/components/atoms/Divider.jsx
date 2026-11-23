import classNames from 'classnames';
import styles from './Primitives.module.css';

export default function Divider({ className, ...rest }) {
  return <hr className={classNames(styles.divider, className)} {...rest} />;
}
