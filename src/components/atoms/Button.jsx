import classNames from 'classnames';
import styles from './Primitives.module.css';
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  loading = false,
  disabled,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[variant], styles[size], className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
