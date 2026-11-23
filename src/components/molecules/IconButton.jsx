import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';

export default function IconButton({ icon, label, variant = 'ghost', className, ...rest }) {
  return (
    <Button
      variant={variant}
      className={classNames(styles.iconButton, className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      <Icon name={icon} size={18} />
    </Button>
  );
}
