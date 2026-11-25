import EmptyFormsMessage from '../molecules/EmptyFormsMessage';
import classNames from 'classnames';
import ActionButton from '../molecules/ActionButton';
import MenuButton from '../molecules/MenuButton';
import IconTile from '../molecules/IconTile';
import Badge from '../molecules/Badge';
import { formActions, statusLabels } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import styles from './Organisms.module.css';

export default function FormsGrid({
  forms,
  responses = [],
  actions = formActions,
  statuses = statusLabels,
  content = uiContent.FormsGrid,
  onAction,
  onCreate,
  className,
  ...rest
}) {
  if (!forms.length)
    return (
      <div className={classNames(styles.empty, className)} {...rest}>
        <EmptyFormsMessage content={content} />
        <ActionButton onClick={onCreate}>{content.createAForm}</ActionButton>
      </div>
    );

  return (
    <div className={classNames(styles.grid, className)} {...rest}>
      {forms.map((form) => {
        const count = responses.filter((response) => response.formId === form.id).length;

        return (
          <article key={form.id} className={classNames(styles.card, styles.formCard)}>
            <div className={styles.cardTop}>
              <IconTile icon={form.icon || content.icons.filetext} className={styles.formIcon} />
              <MenuButton
                label={`${content.actionsLabel} ${form.title}`}
                icon={content.icons.morehorizontal}
                items={actions.map((action) => ({
                  ...action,
                  label:
                    form.status === 'published' && action.activeLabel
                      ? action.activeLabel
                      : action.label,
                  icon:
                    form.status === 'published' && action.activeIcon
                      ? action.activeIcon
                      : action.icon,
                }))}
                onAction={(name) => onAction(name, form)}
              />
            </div>
            <button className={styles.cardTitle} onClick={() => onAction('edit', form)}>
              <h3>{form.title}</h3>
            </button>
            <p>{form.description}</p>
            <div className={styles.cardBottom}>
              <span>{count ? `${count} ${content.responsesLabel}` : content.noResponses}</span>
              <Badge variant={form.status === 'published' ? 'success' : 'neutral'}>
                {statuses[form.status]}
              </Badge>
            </div>
          </article>
        );
      })}
    </div>
  );
}
