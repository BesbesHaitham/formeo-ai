import RequiredQuestionSetting from '../molecules/RequiredQuestionSetting';
import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import FormField from '../molecules/FormField';
import { fieldTypes, choiceTypes } from '../../content/fieldTypes';
import styles from './Organisms.module.css';

export default function FieldSettingsPanel({
  content = uiContent.FieldSettingsPanel,
  field,
  onChange,
  onTypeChange,
  className,
  ...rest
}) {
  return (
    <aside aria-label={content.title} className={classNames(styles.panel, className)} {...rest}>
      <h2>{content.title}</h2>
      <p>{field ? content.description : content.emptyDescription}</p>
      {field && (
        <div className={styles.settings}>
          <FormField
            id="question-label"
            label={content.questionLabel}
            value={field.label}
            onChange={(e) =>
              onChange({
                label: e.target.value,
              })
            }
          />
          <FormField
            id="placeholder"
            label={content.placeholder}
            value={field.placeholder}
            onChange={(e) =>
              onChange({
                placeholder: e.target.value,
              })
            }
          />
          <RequiredQuestionSetting content={content} field={field} onChange={onChange} />
          <FormField
            id="help-text"
            label={content.helpTextOptional}
            value={field.helpText}
            placeholder={content.helpPlaceholder}
            onChange={(e) =>
              onChange({
                helpText: e.target.value,
              })
            }
          />
          {choiceTypes.includes(field.type) && (
            <FormField
              id="options"
              label={content.optionsLabel}
              control="textarea"
              value={field.options.join('\n')}
              onChange={(e) =>
                onChange({
                  options: e.target.value.split('\n'),
                })
              }
            />
          )}
          <details>
            <summary className={styles.advancedSummary}>{content.advancedSettings}</summary>
            <div className={styles.settings}>
              <FormField
                id="field-type"
                label={content.fieldType}
                control="select"
                value={field.type}
                onChange={(e) => onTypeChange(e.target.value)}
              >
                {fieldTypes.map((f) => (
                  <option key={f.type} value={f.type}>
                    {f.label}
                  </option>
                ))}
              </FormField>
              <FormField
                id="section"
                label={content.section}
                value={field.section || ''}
                onChange={(e) =>
                  onChange({
                    section: e.target.value,
                  })
                }
              />
              {(field.type === 'number'
                ? ['min', 'max']
                : ['text', 'textarea', 'tel'].includes(field.type)
                  ? ['minLength', 'maxLength']
                  : []
              ).map((key) => (
                <FormField
                  id={key}
                  key={key}
                  label={content.validationLabels[key]}
                  control="input"
                  type="number"
                  {...(key.includes('Length') && {
                    min: 0,
                  })}
                  value={field.validation?.[key] ?? ''}
                  onChange={(e) => {
                    const validation = {
                      ...field.validation,
                    };

                    if (e.target.value === '') delete validation[key];
                    else validation[key] = Number(e.target.value);

                    onChange({
                      validation,
                    });
                  }}
                />
              ))}
            </div>
          </details>
        </div>
      )}
    </aside>
  );
}
