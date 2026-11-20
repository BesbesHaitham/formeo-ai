import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import AppHeader from '../organisms/AppHeader';
import FormPreview from '../organisms/FormPreview';
import FormProgress from '../molecules/FormProgress';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Templates.module.css';
export default function FormPreviewTemplate({
  form,
  field,
  index,
  answers,
  error,
  complete,
  preview,
  next,
  change,
  back,
  exit,
  restart,
  saveError,
  className,
}) {
  return (
    <>
      <AppHeader
        mode={preview ? 'preview' : 'respondent'}
        onPreview={exit}
        content={uiContent.AppHeader}
      />
      <main
        className={classNames(styles.respondent, className)}
        style={
          form.appearance?.color
            ? {
                '--primary': form.appearance.color,
              }
            : undefined
        }
      >
        <div className={styles.respondentInner}>
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
            {!complete && (
              <div>
                <Button size="sm" variant="secondary" onClick={back} disabled={!index}>
                  <Icon name="ArrowLeft" size={15} />
                  Back
                </Button>
                <span>Press Enter ↵ to continue</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
