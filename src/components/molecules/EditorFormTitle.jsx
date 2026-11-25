import { uiContent } from '../../content/uiContent';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';
import styles from '../organisms/Organisms.module.css';

export default function EditorFormTitle({ content = uiContent.AppHeader, form }) {
  return (
    <>
      <Link to="/" aria-label={content.backToForms} className={styles.editorBack}>
        <Icon name={content.icons.arrowleft} />
      </Link>
      <Icon name={content.icons.filetext} />
      <h1>{form?.title}</h1>
    </>
  );
}
