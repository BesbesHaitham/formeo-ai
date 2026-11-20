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
  onSettings,
  saveError,
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
        <button className={styles.sideLink} onClick={onSettings}>
          <Icon name={content.icons.settings} />
          {content.settings}
        </button>
      </nav>
      <div className={styles.saved}>
        <Icon name={content.icons.checkcircle} size={14} />
        {saveError ? content.changesNotSaved : content.everythingSavedLocally}
      </div>
    </aside>
  );
}
