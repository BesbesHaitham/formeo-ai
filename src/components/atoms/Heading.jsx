import classNames from 'classnames';
import styles from './Primitives.module.css';
export default function Heading({ as: Tag = 'h2', className, children, ...rest }) {
  return (
    <Tag className={classNames(styles.text, className)} {...rest}>
      {children}
    </Tag>
  );
}
