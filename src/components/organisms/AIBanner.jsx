import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
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
      <Button onClick={onGenerate}>
        <Icon name={content.icons.sparkles} size={18} />
        {content.actionLabel}
      </Button>
    </section>
  );
}
