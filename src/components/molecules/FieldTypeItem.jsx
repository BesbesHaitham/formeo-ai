import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import styles from './Molecules.module.css';

export default function FieldTypeItem({ label, icon, className, ...rest }) {
  return (
    <Button variant="secondary" className={classNames(styles.typeItem, className)} {...rest}>
      <span>
        <Icon name={icon} size={18} />
      </span>
      <Text>{label}</Text>
      <span aria-hidden="true">+</span>
    </Button>
  );
}
