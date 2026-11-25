import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';

export default function AccountIdentity({ initials, name, email }) {
  return (
    <>
      <span className={styles.avatar} aria-hidden="true">
        {initials}
      </span>
      <span className={styles.accountDetails}>
        <strong>{name}</strong>
        {email && <small>{email}</small>}
      </span>
      <Icon name="ChevronUp" size={16} />
    </>
  );
}
