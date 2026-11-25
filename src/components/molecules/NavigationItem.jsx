import { NavLink } from 'react-router-dom';
import Icon from '../atoms/Icon';
import classNames from 'classnames';
import styles from '../organisms/Organisms.module.css';

export default function NavigationItem({ to, icon, label, end }) {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) => classNames(styles.sideLink, isActive && styles.sideActive)}
    >
      <Icon name={icon} />
      {label}
    </NavLink>
  );
}
