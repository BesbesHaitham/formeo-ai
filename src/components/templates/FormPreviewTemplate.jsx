import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import { accentVariables } from '../../utils/colors';
import AppHeader from '../organisms/AppHeader';
import FormPreview from '../organisms/FormPreview';
import FormProgress from '../molecules/FormProgress';
import PhoneStatusBar from '../molecules/PhoneStatusBar';
import styles from './Templates.module.css';
import { useCssVariables } from '../../hooks/useCssVariables';

export default function FormPreviewTemplate({
  content = uiContent.FormPreviewTemplate,
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
  const accentRef = useCssVariables(accentVariables(form.appearance?.color));

  return (
    <>
      {preview && (
        <AppHeader
          mode="preview"
          onPreview={exit}
          previewDevice={previewDevice}
          onPreviewDevice={setPreviewDevice}
          theme={theme}
          onTheme={setTheme}
          content={uiContent.AppHeader}
        />
      )}
      <main
        id="main-content"
        tabIndex={-1}
        className={classNames(styles.respondent, !preview && styles.publicRespondent, className)}
        ref={accentRef}
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
                {content.poweredBy} <strong>{content.brand}</strong>
              </span>
            </div>
          </div>
          {mobile && <span className={styles.mobileHome} aria-hidden="true" />}
        </div>
      </main>
    </>
  );
}
