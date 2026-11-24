import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import Text from '../atoms/Text';
import styles from './Molecules.module.css';
import { useCssVariables } from '../../hooks/useCssVariables';

export default function FormProgress({
  content = uiContent.FormProgress,
  title,
  current,
  total,
  className,
  ...rest
}) {
  const progress = total ? (current / total) * 100 : 0;
  const progressRef = useCssVariables({ '--progress-value': progress });

  return (
    <div ref={progressRef} className={classNames(styles.progress, className)} {...rest}>
      <header>
        <Text>{title}</Text>
        <Text>
          {content.question}
          {current}
          {content.of}
          {total}
        </Text>
      </header>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={content.formProgress}
      >
        <span />
      </div>
    </div>
  );
}
