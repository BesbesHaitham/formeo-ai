import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import ActionButton from '../molecules/ActionButton';
import IconTile from '../molecules/IconTile';
import styles from './Organisms.module.css';

export default function AIBanner({ content = uiContent.AIBanner, onGenerate, className, ...rest }) {
  return (
    <section className={classNames(styles.banner, className)} {...rest}>
      <IconTile icon={content.icons.sparkles} />
      <div>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>
      <ActionButton onClick={onGenerate} icon={content.icons.sparkles} iconSize={18}>
        {content.actionLabel}
      </ActionButton>
    </section>
  );
}
