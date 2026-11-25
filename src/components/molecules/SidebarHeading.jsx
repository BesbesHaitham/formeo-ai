import Text from '../atoms/Text';
import styles from '../organisms/Organisms.module.css';

export default function SidebarHeading({ children }) {
  return (
    <Text as="p" className={styles.eyebrow}>
      {children}
    </Text>
  );
}
