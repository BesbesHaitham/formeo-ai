import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import IconButton from '../molecules/IconButton';
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
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    if (!menu) return;
    const dismiss = (event) => {
      if (
        event.key === 'Escape' ||
        (event.type === 'pointerdown' &&
          event.target.closest('[data-form-actions]')?.dataset.formActions !== menu)
      )
        setMenu(null);
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, [menu]);
  if (!forms.length)
    return (
      <div className={classNames(styles.empty, className)} {...rest}>
        <Icon name={content.icons.filetext} size={36} />
        <h2>{content.emptyTitle}</h2>
        <p>{content.emptyDescription}</p>
        <Button onClick={onCreate}>{content.createAForm}</Button>
      </div>
    );
  return (
    <div className={classNames(styles.grid, className)} {...rest}>
      {forms.map((form, index) => {
        const count = responses.filter((response) => response.formId === form.id).length;
        return (
          <article
            key={form.id}
            data-form-actions={form.id}
            className={classNames(styles.card, styles.formCard)}
          >
            <div className={styles.cardTop}>
              <IconTile
                icon={form.icon || content.icons.filetext}
                style={{
                  color: `var(--card-accent-${index % 4})`,
                }}
              />
              <IconButton
                label={`${content.actionsLabel} ${form.title}`}
                icon={content.icons.morehorizontal}
                aria-expanded={menu === form.id}
                onClick={() => setMenu(menu === form.id ? null : form.id)}
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
            {menu === form.id && (
              <div
                className={styles.menu}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setMenu(null);
                }}
              >
                {actions.map(({ name, label, activeLabel, variant = 'ghost' }) => (
                  <Button
                    key={name}
                    variant={variant}
                    size="sm"
                    onClick={() => {
                      setMenu(null);
                      onAction(name, form);
                    }}
                  >
                    {activeLabel && form.status === 'published' ? activeLabel : label}
                  </Button>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
