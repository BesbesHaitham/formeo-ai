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
    if (fieldId) ref.current?.querySelector('input,textarea,select')?.focus();
  }, [fieldId]);
  if (complete)
    return (
      <section
        className={classNames(styles.preview, className)}
        style={{
          textAlign: 'center',
        }}
        {...rest}
      >
        <IconTile icon={content.icons.checkcircle} />
        <h1>{content.completeTitle}</h1>
        <p>
          {preview
            ? content.previewDescription
            : saveError
              ? content.unsavedDescription
              : content.submittedDescription}
        </p>
        <Button onClick={onRestart}>{content.startAgain}</Button>
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
      <h1>
        {field.label}
        {field.required && (
          <span
            style={{
              color: 'var(--primary)',
            }}
          >
            {' '}
            *
          </span>
        )}
      </h1>
      <p>{field.helpText || content.defaultHelp}</p>
      <FieldControl
        field={field}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? 'answer-error' : undefined}
      />
      {field.type === 'file' && (
        <small
          style={{
            color: 'var(--muted)',
          }}
        >
          {content.fileHint}
        </small>
      )}
      {error && (
        <p id="answer-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.previewFooter}>
        <small>
          <Icon name={content.icons.lock} size={14} />
          {content.privacyHint}
        </small>
        <Button type="submit" size="lg">
          {content.continue}
          <Icon name={content.icons.arrowright} size={17} />
        </Button>
      </div>
    </form>
  );
}
