import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import FormProgress from '../molecules/FormProgress';
import PhoneStatusBar from '../molecules/PhoneStatusBar';
import styles from '../templates/Templates.module.css';

export default function PreviewFrame({
  content = uiContent.FormPreviewTemplate,
  form,
  index,
  complete,
  mobile,
  children,
}) {
  return (
    <div className={classNames(styles.previewViewport, mobile && styles.mobileDevice)}>
      {mobile && <PhoneStatusBar className={styles.phoneStatus} />}
      <div className={classNames(styles.respondentInner, mobile && styles.mobileScreen)}>
        {!complete && (
          <FormProgress
            title={form.title}
            current={index + 1}
            total={form.fields.length}
            content={uiContent.FormProgress}
          />
        )}
        {children}
        <div className={styles.respondentBottom}>
          <span>
            {content.poweredBy} <strong>{content.brand}</strong>
          </span>
        </div>
      </div>
      {mobile && <span className={styles.mobileHome} aria-hidden="true" />}
    </div>
  );
}
