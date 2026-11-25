import NavigationItem from '../molecules/NavigationItem';
import SidebarHeading from '../molecules/SidebarHeading';
import { navigation } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
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
      <SidebarHeading>{content.workspace}</SidebarHeading>
      <nav aria-label={content.workspace}>
        {items.map(({ to, icon, label, end }) => (
          <NavigationItem key={to} to={to} icon={icon} label={label} end={end} />
        ))}
      </nav>
      {account && <div className={styles.sidebarAccount}>{account}</div>}
    </aside>
  );
}
