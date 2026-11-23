import classNames from 'classnames';
import { useState } from 'react';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Select from '../atoms/Select';
import Checkbox from '../atoms/Checkbox';
import Radio from '../atoms/Radio';
import Icon from '../atoms/Icon';
import { uiContent } from '../../content/uiContent';
import styles from './Molecules.module.css';

/** Renders a shared field schema; the caller owns the answer and validation. */
export default function FieldControl({
  field,
  value,
  onChange = () => {},
  disabled = false,
  content = uiContent.FieldControl,
  className,
  ...rest
}) {
  const { id, type, label, placeholder, required, options } = field;
  const [hoveredRating, setHoveredRating] = useState(null);
  const common = {
    id: `field-${id}`,
    'aria-label': label,
    'aria-required': required,
    disabled,
    ...rest,
  };
  const update = (event) => onChange(event.target.value);
  let control;
  switch (type) {
    case 'textarea':
      control = (
        <Textarea {...common} placeholder={placeholder} value={value ?? ''} onChange={update} />
      );
      break;
    case 'select':
      control = (
        <Select {...common} value={value ?? ''} onChange={update}>
          <option value="">{placeholder || content.chooseOption}</option>
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </Select>
      );
      break;
    case 'file':
      control = (
        <label className={styles.upload}>
          <Icon name={content.uploadIcon} size={17} />
          <input
            {...common}
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
              onChange(
                file
                  ? {
                      name: file.name,
                      size: file.size,
                      type: file.type,
                    }
                  : null,
              );
            }}
          />
          <span>{value?.name || content.chooseFile}</span>
        </label>
      );
      break;
    case 'rating': {
      const activeIndex = hoveredRating?.id === id ? hoveredRating.index : options.indexOf(value);
      let caption = disabled ? '' : content.chooseRating;

      if (activeIndex >= 0) {
        caption = options[activeIndex];

        if (options.every((option, index) => option === String(index + 1)))
          caption += ` / ${options.length}`;
      }

      control = (
        <div className={styles.ratingControl}>
          <div
            className={styles.ratingStars}
            role="radiogroup"
            aria-label={label}
            aria-required={required}
            onPointerLeave={() => setHoveredRating(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setHoveredRating(null);
            }}
            {...rest}
          >
            {options.map((option, index) => (
              <label
                key={option}
                className={classNames(
                  styles.ratingChoice,
                  index <= activeIndex && styles.ratingFilled,
                )}
                title={option}
                onPointerEnter={() => {
                  if (!disabled) setHoveredRating({ id, index });
                }}
              >
                <Radio
                  name={id}
                  value={option}
                  aria-label={option}
                  checked={value === option}
                  disabled={disabled}
                  onChange={() => {
                    setHoveredRating(null);
                    onChange(option);
                  }}
                />
                <Icon name={content.ratingIcon} size={28} />
              </label>
            ))}
          </div>
          <span className={styles.ratingCaption} aria-hidden="true">
            {caption}
          </span>
        </div>
      );
      break;
    }
    case 'radio':
    case 'checkbox':
      control = (
        <div
          className={styles.options}
          role={type === 'checkbox' ? 'group' : 'radiogroup'}
          aria-label={label}
          aria-required={required}
          {...rest}
        >
          {options.map((option, index) => (
            <label key={index} className={styles.option}>
              {type === 'checkbox' ? (
                <Checkbox
                  name={id}
                  checked={(value ?? []).includes(option)}
                  disabled={disabled}
                  onChange={(event) =>
                    onChange(
                      event.target.checked
                        ? [...(value ?? []), option]
                        : value.filter((item) => item !== option),
                    )
                  }
                />
              ) : (
                <Radio
                  name={id}
                  value={option}
                  checked={value === option}
                  disabled={disabled}
                  onChange={() => onChange(option)}
                />
              )}
              {option}
            </label>
          ))}
        </div>
      );
      break;
    default:
      control = (
        <Input
          {...common}
          type={type}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={update}
        />
      );
  }

  return <div className={classNames(styles.control, className)}>{control}</div>;
}
