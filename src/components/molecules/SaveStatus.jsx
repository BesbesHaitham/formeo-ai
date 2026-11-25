import { uiContent } from '../../content/uiContent';
import Icon from '../atoms/Icon';
import styles from '../organisms/Organisms.module.css';

export default function SaveStatus({ content = uiContent.AppHeader, saved }) {
  return (
    <span className={styles.saveStatus}>
      <Icon name={saved ? content.icons.checkcircle : 'CircleAlert'} size={16} />
      <span role="status">{saved ? content.allChangesSaved : content.savingUnavailable}</span>
    </span>
  );
}
