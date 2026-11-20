import classNames from 'classnames';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import styles from './Molecules.module.css';
export default function FormField({ id, label, error, help, children, className, ...rest }) {
  return (
    <div className={classNames(styles.field, className)}>
      <Label htmlFor={id}>{label}</Label>
      {children || (
        <Input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
      )}
      {help && (
        <Text variant="muted" size="small">
          {help}
        </Text>
      )}
      {error && (
        <Text id={`${id}-error`} role="alert" className={styles.error}>
          {error}
        </Text>
      )}
    </div>
  );
}
