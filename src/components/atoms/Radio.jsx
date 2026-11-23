import classNames from 'classnames';
import styles from './Primitives.module.css';

export default function Radio({ className, ...rest }) {
  return <input type="radio" className={classNames(styles.radio, className)} {...rest} />;
}
