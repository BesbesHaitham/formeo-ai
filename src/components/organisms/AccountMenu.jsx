import classNames from 'classnames';
import { uiContent } from '../../content/uiContent';
import MenuButton from '../molecules/MenuButton';
import Icon from '../atoms/Icon';
import styles from '../molecules/Molecules.module.css';

export default function AccountMenu({
  name,
  email,
  compact = false,
  content = uiContent.AccountMenu,
  onLogout,
  className,
  ...rest
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <MenuButton
      className={classNames(styles.accountButton, compact && styles.compactAccount, className)}
      label={`${name}: ${content.label}`}
      items={[{ name: 'logout', label: content.logout, icon: 'LogOut', variant: 'danger' }]}
      onAction={onLogout}
      title={name}
      {...rest}
    >
      <span className={styles.avatar} aria-hidden="true">
        {initials}
      </span>
      <span className={styles.accountDetails}>
        <strong>{name}</strong>
        {email && <small>{email}</small>}
      </span>
      <Icon name="ChevronUp" size={16} />
    </MenuButton>
  );
}
