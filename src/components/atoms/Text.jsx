import classNames from 'classnames';
import styles from './Primitives.module.css';
export default function Text({ as: Tag = 'span', variant, size, className, children, ...rest }) {
  return (
    <Tag className={classNames(styles.text, styles[variant], styles[size], className)} {...rest}>
      {children}
    </Tag>
  );
}
