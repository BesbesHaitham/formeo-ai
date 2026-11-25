import ColorControl from '../molecules/ColorControl';
import { formDefaults } from '../../config/appConfig';
import { editorTabs, fieldActions } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import { useEffect, useRef, useState } from 'react';
import { useListAnimation } from '../../hooks/useListAnimation';
import { startEditorDrag, isEditorDrag, readEditorDrag } from '../../utils/editorDrag';
import classNames from 'classnames';
import ActionButton from '../molecules/ActionButton';
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
  const questions = useListAnimation(form.fields, tab === 'questions');
  const accent = form.appearance?.color || formDefaults.color;
  const [dropIndex, setDropIndex] = useState(null);
  useEffect(() => {
    const clear = () => setDropIndex(null);
    window.addEventListener('dragend', clear);

    return () => window.removeEventListener('dragend', clear);
  }, []);
  useEffect(() => {
    canvas.current?.querySelector('[data-selected="true"]')?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
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
      {...(tab === 'questions' && {
        onDragOver: dragOver,
        onDrop: drop,
      })}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDropIndex(null);
      }}
      {...rest}
    >
      <div className={styles.tabs}>
        {tabs.map(({ id, label }) => (
          <ActionButton
            key={id}
            variant="ghost"
            className={classNames(styles.tabButton, tab === id && styles.selectedTab)}
            onClick={() => setTab(id)}
            aria-pressed={tab === id}
          >
            {label}
          </ActionButton>
        ))}
        <small className={styles.questionCount} role="status">
          {form.fields.length} {content.questionsLabel}
        </small>
        <span className={styles.tabSpacer} />
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
        <ActionButton
          variant="link"
          size="sm"
          className={styles.mobileSettings}
          onClick={onOpenSettings}
          disabled={!selectedId}
        >
          {content.editSelected}
        </ActionButton>
      </div>
      {tab === 'questions' && (
        <>
          <div className={styles.canvasTitle}>
            <IconTile icon={content.icons.filetext} />
            <div>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h2>{form.title}</h2>
              {form.description && <p>{form.description}</p>}
            </div>
          </div>
          <div ref={questions} className={styles.questions}>
            {form.fields.map((field, index) => (
              <article
                key={field.id}
                data-id={field.id}
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
                aria-label={content.editQuestion(field.label)}
                className={classNames(
                  styles.question,
                  selectedId === field.id && styles.questionSelected,
                  dropIndex === index && styles.dropBefore,
                )}
              >
                <header>
                  <label>
                    {field.label} {field.required && <em>{content.requiredMark}</em>}
                  </label>
                  <div className={styles.questionActions}>
                    {actions.map(({ name: action, icon, label }) => (
                      <IconButton
                        key={action}
                        icon={icon}
                        label={`${label} ${field.label}`}
                        className={action === 'delete' && styles.deleteAction}
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
          <ActionButton
            variant="secondary"
            className={styles.addQuestion}
            onClick={() => onAdd('text', form.fields.length)}
            icon={content.icons.plus}
            iconSize={17}
          >
            {content.addQuestion}
          </ActionButton>
          <ActionButton
            variant="link"
            size="sm"
            className={styles.refineAction}
            onClick={onRefine}
            icon={content.icons.sparkles}
            iconSize={16}
          >
            {content.refineWithAi}
          </ActionButton>
        </>
      )}
      {tab === 'design' && (
        <div className={styles.settings}>
          <h2>{content.makeItYours}</h2>
          <p>{content.designDescription}</p>
          <FormField id="accent" label={content.accentColor}>
            <ColorControl accent={accent} form={form} onUpdate={onUpdate} />
          </FormField>
        </div>
      )}
      {tab === 'settings' && (
        <div className={styles.settings}>
          <h2>{content.formSettings}</h2>
          <p className={styles.settingsDescription}>{content.settingsDescription}</p>
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
          <FormField
            id="settings-description"
            label={content.description}
            control="textarea"
            value={form.description}
            onChange={(e) =>
              onUpdate({
                description: e.target.value,
              })
            }
          />
        </div>
      )}
    </section>
  );
}
