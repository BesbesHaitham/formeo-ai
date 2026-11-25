import classNames from 'classnames';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Select from '../atoms/Select';
import Text from '../atoms/Text';
import styles from './Molecules.module.css';

export default function FormField({
  id,
  label,
  labelAction,
  error,
  help,
  children,
  control,
  className,
  ...rest
}) {
  const Control = { input: Input, textarea: Textarea, select: Select }[control];

  return (
    <div className={classNames(styles.field, className)}>
      {labelAction ? (
        <div className={styles.fieldLabel}>
          <Label htmlFor={id}>{label}</Label>
          {labelAction}
        </div>
      ) : (
        <Label htmlFor={id}>{label}</Label>
      )}
      {Control ? (
        <Control id={id} {...rest}>
          {children}
        </Control>
      ) : (
        children || (
          <Input
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : help ? `${id}-help` : ''}
            {...rest}
          />
        )
      )}
      {help && (
        <Text id={`${id}-help`} variant="muted" size="small">
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
