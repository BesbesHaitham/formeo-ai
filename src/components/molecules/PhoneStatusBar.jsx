import classNames from 'classnames';
import { uiContent } from '../../content/uiContent';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';

/** Decorative device chrome, excluded from the form's accessible content. */
export default function PhoneStatusBar({ content = uiContent.PhoneStatusBar, className, ...rest }) {
  return (
    <div className={classNames(styles.phoneStatusBar, className)} aria-hidden="true" {...rest}>
      <span>{content.time}</span>
      <span className={styles.phoneCamera} />
      <span className={styles.phoneIndicators}>
        {content.icons.map((icon) => (
          <Icon key={icon} name={icon} size={13} />
        ))}
      </span>
    </div>
  );
}
