import classNames from 'classnames';
import { useLayoutEffect, useRef } from 'react';
import styles from './Molecules.module.css';

export default function PasswordStrength({ checks, content, className, ...rest }) {
  const panel = useRef(null);
  useLayoutEffect(() => {
    const element = panel.current;
    const anchor = element.parentElement;

    function position() {
      const { top, bottom } = anchor.getBoundingClientRect();
      const gap = 8;
      const below = window.innerHeight - bottom - gap * 2;
      const above = top - gap * 2;
      const upwards = below < element.scrollHeight && above > below;
      element.dataset.placement = upwards ? 'top' : 'bottom';
      element.style.maxHeight = `${Math.max(0, upwards ? above : below)}px`;
    }

    position();
    anchor.addEventListener('focusin', position);
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);

    return () => {
      anchor.removeEventListener('focusin', position);
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, []);
  const score = checks.filter(({ met }) => met).length;
  const strength = score === checks.length ? 'strong' : score >= 3 ? 'fair' : 'weak';

  return (
    <section ref={panel} className={classNames(styles.passwordStrength, className)} {...rest}>
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
