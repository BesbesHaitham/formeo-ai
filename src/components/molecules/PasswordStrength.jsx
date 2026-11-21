import classNames from 'classnames';
import styles from './Molecules.module.css';

export default function PasswordStrength({ checks, content, className, ...rest }) {
  const score = checks.filter(({ met }) => met).length;
  const strength = score === checks.length ? 'strong' : score >= 3 ? 'fair' : 'weak';
  return (
    <section className={classNames(styles.passwordStrength, className)} {...rest}>
      <p>{content.title}</p>
      <div
        className={styles.strengthTrack}
        role="meter"
        aria-label={content.meterLabel}
        aria-valuemin={0}
        aria-valuemax={checks.length}
        aria-valuenow={score}
        aria-valuetext={content.levels[strength]}
        data-strength={strength}
      >
        <span style={{ width: `${(score / checks.length) * 100}%` }} />
      </div>
      <strong aria-live="polite">{content.levels[strength]}</strong>
      <p>{content.requirementsTitle}</p>
      <ul>
        {checks.map(({ id, met }) => (
          <li
            key={id}
            className={classNames(met && styles.requirementMet)}
            aria-label={`${content.requirements[id]}: ${met ? content.met : content.unmet}`}
          >
            <span aria-hidden="true">{met ? '✓' : '•'}</span>
            {content.requirements[id]}
          </li>
        ))}
      </ul>
    </section>
  );
}
