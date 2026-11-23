import classNames from 'classnames';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';

export default function IconTile({ icon, className, ...rest }) {
  return (
    <span className={classNames(styles.tile, className)} {...rest}>
      <Icon name={icon} size={22} />
    </span>
  );
}
