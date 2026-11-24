import { uiContent } from '../../content/uiContent';
import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import IconTile from '../molecules/IconTile';
import FieldControl from '../molecules/FieldControl';
import { fieldTypes } from '../../content/fieldTypes';
import styles from './Organisms.module.css';

export default function FormPreview({
  content = uiContent.FormPreview,
  field,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack = false,
  isLast,
  error,
  complete,
  preview,
  saveError,
  onRestart,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const fieldId = field?.id;
  useEffect(() => {
    if (!fieldId) return;

    ref.current?.parentElement?.scrollTo(0, 0);
    const target =
      ref.current?.querySelector(
        'input:not([type="radio"]):not([type="checkbox"]),textarea,select',
      ) || ref.current?.querySelector('h1');
    target?.focus({ preventScroll: true });
  }, [fieldId]);

  if (complete)
    return (
      <section className={classNames(styles.preview, styles.previewComplete, className)} {...rest}>
        <IconTile icon={content.icons.checkcircle} />
        <h1>{content.completeTitle}</h1>
        <p>
          {preview
            ? content.previewDescription
            : saveError
              ? content.unsavedDescription
              : content.submittedDescription}
        </p>
        <Button className={styles.previewAction} onClick={onRestart}>
          {content.startAgain}
        </Button>
      </section>
    );

  return (
    <form
      noValidate
      ref={ref}
      className={classNames(styles.preview, className)}
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      {...rest}
    >
      <div className={styles.previewCategory}>
        <IconTile icon={fieldTypes.find((f) => f.type === field.type)?.icon} />
        <span>{field.section || content.yourDetails}</span>
      </div>
      <h1 tabIndex={-1}>
        {field.label}
        {field.required && (
          <span className={styles.requiredMark} aria-hidden="true">
            {' '}
            {content.requiredMark}
          </span>
        )}
      </h1>
      <p>{field.helpText || content.defaultHelp}</p>
      <FieldControl
        field={field}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? 'answer-error' : ''}
      />
      {field.type === 'file' && <small className={styles.fileHint}>{content.fileHint}</small>}
      {error && (
        <p id="answer-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.previewFooter}>
        <Button variant="secondary" size="lg" onClick={onBack} disabled={!canGoBack}>
          <Icon name={content.icons.arrowleft} size={17} />
          {content.back}
        </Button>
        <Button type="submit" size="lg" className={styles.previewAction}>
          {isLast ? (preview ? content.finishPreview : content.submit) : content.continue}
          <Icon name={isLast ? content.icons.checkcircle : content.icons.arrowright} size={17} />
        </Button>
      </div>
    </form>
  );
}
