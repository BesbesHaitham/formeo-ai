import { formDefaults } from '../../config/appConfig';
import { editorTabs, fieldActions } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import { useEffect, useRef, useState } from 'react';
import { startEditorDrag, isEditorDrag, readEditorDrag } from '../../utils/editorDrag';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Icon from '../atoms/Icon';
import IconTile from '../molecules/IconTile';
import IconButton from '../molecules/IconButton';
import FieldControl from '../molecules/FieldControl';
import FormField from '../molecules/FormField';
import styles from './Organisms.module.css';
export default function FormQuestionList({
  actions = fieldActions,
  tabs = editorTabs,
  content = uiContent.FormQuestionList,
  form,
  selectedId,
  onSelect,
  onUpdate,
  onAction,
  onReorder,
  onAdd,
  tab,
  setTab,
  onRefine,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onOpenSettings,
  className,
  ...rest
}) {
  const canvas = useRef(null);
  const [dropIndex, setDropIndex] = useState(null);
  useEffect(() => {
    const clear = () => setDropIndex(null);
    window.addEventListener('dragend', clear);
    return () => window.removeEventListener('dragend', clear);
  }, []);
  useEffect(() => {
    canvas.current
      ?.querySelector('[data-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [selectedId]);
  function dragOver(event) {
    if (!isEditorDrag(event.dataTransfer)) return;
    event.preventDefault();
    const card = event.target.closest('[data-question-index]');
    if (!card) {
      setDropIndex(form.fields.length);
      return;
    }
    const rect = card.getBoundingClientRect();
    setDropIndex(
      Number(card.dataset.questionIndex) + (event.clientY > rect.top + rect.height / 2 ? 1 : 0),
    );
  }
  function drop(event) {
    const payload = readEditorDrag(event.dataTransfer);
    if (!payload) return;
    event.preventDefault();
    event.stopPropagation();
    const index = dropIndex ?? form.fields.length;
    if (payload.kind === 'field') onAdd(payload.value, index);
    else onReorder(payload.value, index);
    setDropIndex(null);
  }
  return (
    <section
      ref={canvas}
      className={classNames(styles.panel, styles.canvas, className)}
      onDragOver={tab === 'questions' ? dragOver : undefined}
      onDrop={tab === 'questions' ? drop : undefined}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDropIndex(null);
      }}
      {...rest}
    >
      <div className={styles.tabs}>
        {tabs.map(({ id, label }) => (
          <Button
            key={id}
            variant="ghost"
            className={tab === id ? styles.selectedTab : ''}
            onClick={() => setTab(id)}
          >
            {label}
          </Button>
        ))}
        <small className={styles.questionCount} role="status">
          {form.fields.length} {content.questionsLabel}
        </small>
        <span
          style={{
            flex: 1,
          }}
        />
        <IconButton
          label={content.undo}
          icon={content.icons.undo2}
          disabled={!canUndo}
          onClick={onUndo}
        />
        <IconButton
          label={content.redo}
          icon={content.icons.redo2}
          disabled={!canRedo}
          onClick={onRedo}
        />
        <Button
          variant="link"
          size="sm"
          className={styles.mobileSettings}
          onClick={onOpenSettings}
          disabled={!selectedId}
        >
          {content.editSelected}
        </Button>
      </div>
      {tab === 'questions' && (
        <>
          <div className={styles.canvasTitle}>
            <IconTile icon={content.icons.filetext} />
            <div>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <Input
                aria-label={content.formTitle}
                value={form.title}
                onChange={(e) =>
                  onUpdate({
                    title: e.target.value,
                  })
                }
              />
              <Textarea
                aria-label={content.formDescription}
                value={form.description}
                onChange={(e) =>
                  onUpdate({
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.questions}>
            {form.fields.map((field, index) => (
              <article
                key={field.id}
                data-question-index={index}
                data-selected={selectedId === field.id}
                onClick={() => onSelect(field.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.target === e.currentTarget && ['Enter', ' '].includes(e.key)) {
                    e.preventDefault();
                    onSelect(field.id);
                  }
                }}
                aria-label={`Edit ${field.label}`}
                className={classNames(
                  styles.question,
                  selectedId === field.id && styles.questionSelected,
                  dropIndex === index && styles.dropBefore,
                )}
              >
                <header>
                  <label>
                    {field.label} {field.required && <em>*</em>}
                  </label>
                  <div className={styles.questionActions}>
                    {actions.map(({ name: action, icon, label }) => (
                      <IconButton
                        key={action}
                        icon={icon}
                        label={`${label} ${field.label}`}
                        disabled={
                          (action === 'up' && index === 0) ||
                          (action === 'down' && index === form.fields.length - 1)
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          onAction(action, field.id);
                        }}
                      />
                    ))}
                    <IconButton
                      icon={content.icons.gripvertical}
                      label={content.dragQuestion}
                      className={styles.dragHandle}
                      draggable
                      onDragStart={(event) => startEditorDrag(event, 'question', field.id)}
                    />
                  </div>
                </header>
                <FieldControl field={field} disabled />
              </article>
            ))}
          </div>
          <div
            className={classNames(
              styles.dropTail,
              dropIndex === form.fields.length && styles.dropActive,
            )}
          >
            {!form.fields.length && <p>{content.emptyHint}</p>}
          </div>
          <Button
            variant="secondary"
            className={styles.addQuestion}
            onClick={() => onAdd('text', form.fields.length)}
          >
            <Icon name={content.icons.plus} size={17} />
            {content.addQuestion}
          </Button>
          <Button
            variant="link"
            size="sm"
            style={{
              marginTop: 15,
            }}
            onClick={onRefine}
          >
            <Icon name={content.icons.sparkles} size={16} />
            {content.refineWithAi}
          </Button>
        </>
      )}
      {tab === 'design' && (
        <div className={styles.settings}>
          <h2>{content.makeItYours}</h2>
          <p>{content.designDescription}</p>
          <FormField id="accent" label={content.accentColor}>
            <Input
              id="accent"
              type="color"
              value={form.appearance?.color || formDefaults.color}
              onChange={(e) =>
                onUpdate({
                  appearance: {
                    ...form.appearance,
                    color: e.target.value,
                  },
                })
              }
            />
          </FormField>
        </div>
      )}
      {tab === 'settings' && (
        <div className={styles.settings}>
          <h2>{content.formSettings}</h2>
          <p
            style={{
              color: 'var(--muted)',
            }}
          >
            {content.settingsDescription}
          </p>
          <FormField
            id="settings-title"
            label={content.formTitle}
            value={form.title}
            onChange={(e) =>
              onUpdate({
                title: e.target.value,
              })
            }
          />
          <FormField id="settings-description" label={content.description}>
            <Textarea
              id="settings-description"
              value={form.description}
              onChange={(e) =>
                onUpdate({
                  description: e.target.value,
                })
              }
            />
          </FormField>
        </div>
      )}
    </section>
  );
}
