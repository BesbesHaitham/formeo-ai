import classNames from 'classnames';
import styles from './Primitives.module.css';

export default function Textarea({ className, ...rest }) {
  return <textarea className={classNames(styles.textarea, className)} {...rest} />;
}
