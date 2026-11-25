import { uiContent } from '../../content/uiContent';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';
import styles from '../organisms/Organisms.module.css';

export default function BackToFormsLink({ content = uiContent.AppHeader }) {
  return (
    <Link to="/" className={styles.headerTitle}>
      <Icon name={content.icons.arrowleft} />
      {content.backToForms}
    </Link>
  );
}
