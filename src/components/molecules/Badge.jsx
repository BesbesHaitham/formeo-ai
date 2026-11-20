import classNames from 'classnames';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';
export default function Badge({ children, variant, icon, className, ...rest }) {
  return (
    <span className={classNames(styles.badge, styles[variant], className)} {...rest}>
      {icon && <Icon name={icon} size={14} />}
      <Text>{children}</Text>
    </span>
  );
}
