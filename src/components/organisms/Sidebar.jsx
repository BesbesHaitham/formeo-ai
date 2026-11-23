import { navigation } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import styles from './Organisms.module.css';

export default function Sidebar({
  items = navigation,
  content = uiContent.Sidebar,
  account,
  className,
  ...rest
}) {
  return (
    <aside className={classNames(styles.sidebar, className)} {...rest}>
      <Text as="p" className={styles.eyebrow}>
        {content.workspace}
      </Text>
      <nav aria-label={content.workspace}>
        {items.map(({ to, icon, label, end }) => (
          <NavLink
            end={end}
            key={to}
            to={to}
            className={({ isActive }) => classNames(styles.sideLink, isActive && styles.sideActive)}
          >
            <Icon name={icon} />
            {label}
          </NavLink>
        ))}
      </nav>
      {account && <div className={styles.sidebarAccount}>{account}</div>}
    </aside>
  );
}
