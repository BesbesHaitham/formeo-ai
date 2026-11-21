import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import { accentStyle } from '../../utils/colors';
import AppHeader from '../organisms/AppHeader';
import FormPreview from '../organisms/FormPreview';
import FormProgress from '../molecules/FormProgress';
import PhoneStatusBar from '../molecules/PhoneStatusBar';
import styles from './Templates.module.css';
export default function FormPreviewTemplate({
  form,
  field,
  index,
  answers,
  error,
  complete,
  preview,
  previewDevice = 'desktop',
  setPreviewDevice,
  next,
  change,
  back,
  exit,
  restart,
  saveError,
  theme,
  setTheme,
  className,
}) {
  const mobile = preview && previewDevice === 'mobile';
  return (
    <>
      <AppHeader
        mode={preview ? 'preview' : 'respondent'}
        onPreview={exit}
        previewDevice={previewDevice}
        onPreviewDevice={setPreviewDevice}
        theme={theme}
        onTheme={setTheme}
        content={uiContent.AppHeader}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className={classNames(styles.respondent, className)}
        style={accentStyle(form.appearance?.color)}
      >
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
            <FormPreview
              field={field}
              value={answers[field?.id]}
              onChange={change}
              onNext={next}
              onBack={back}
              canGoBack={index > 0}
              isLast={index === form.fields.length - 1}
              error={error}
              complete={complete}
              preview={preview}
              saveError={saveError}
              onRestart={restart}
              content={uiContent.FormPreview}
            />
            <div className={styles.respondentBottom}>
              <span>
                Powered by <strong>Formeo AI</strong>
              </span>
            </div>
          </div>
          {mobile && <span className={styles.mobileHome} aria-hidden="true" />}
        </div>
      </main>
    </>
  );
}
