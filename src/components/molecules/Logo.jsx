import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Text from '../atoms/Text';
import styles from './Molecules.module.css';
export default function Logo({ content = uiContent.Logo, className, ...rest }) {
  return (
    <Link
      to="/"
      aria-label={content.homeLabel}
      className={classNames(styles.logo, className)}
      {...rest}
    >
      <span className={styles.mark} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <Text>
        {content.name}
        <strong>{content.suffix}</strong>
      </Text>
    </Link>
  );
}
