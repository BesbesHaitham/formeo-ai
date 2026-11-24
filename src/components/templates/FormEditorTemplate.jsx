import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import AppHeader from '../organisms/AppHeader';
import FieldLibrary from '../organisms/FieldLibrary';
import { fieldTypes } from '../../content/fieldTypes';
import FieldSettingsPanel from '../organisms/FieldSettingsPanel';
import FormQuestionList from '../organisms/FormQuestionList';
import Modal from '../molecules/Modal';
import FormField from '../molecules/FormField';
import Badge from '../molecules/Badge';
import Button from '../atoms/Button';
import Textarea from '../atoms/Textarea';
import Input from '../atoms/Input';
import styles from './Templates.module.css';

export default function FormEditorTemplate(props) {
  const {
    content = uiContent.FormEditorTemplate,
    form,
    selected,
    selectedId,
    setSelectedId,
    update,
    updateField,
    addField,
    fieldAction,
    reorder,
    changeType,
    tab,
    setTab,
    undo,
    redo,
    canUndo,
    canRedo,
    preview,
    publish,
    saveError,
    publishOpen,
    setPublishOpen,
    localUrl,
    copyLink,
    openForm,
    refineOpen,
    setRefineOpen,
    refinePrompt,
    setRefinePrompt,
    refine,
    loading,
    error,
    proposal,
    applyProposal,
    discardProposal,
    aiReady,
    setKeyDialog,
    theme,
    setTheme,
    className,
  } = props;

  return (
    <>
      <AppHeader
        mode="editor"
        theme={theme}
        onTheme={setTheme}
        form={form}
        onPreview={preview}
        onPublish={publish}
        saved={!saveError}
        content={uiContent.AppHeader}
      />
      <main id="main-content" tabIndex={-1} className={classNames(styles.editor, className)}>
        <FieldLibrary types={fieldTypes} onAdd={addField} content={uiContent.FieldLibrary} />
        <FormQuestionList
          form={form}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpdate={update}
          onAction={fieldAction}
          onReorder={reorder}
          onAdd={addField}
          tab={tab}
          setTab={setTab}
          onRefine={() => setRefineOpen(true)}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          onOpenSettings={() =>
            document
              .getElementById('question-settings')
              ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
          }
          content={uiContent.FormQuestionList}
        />
        <FieldSettingsPanel
          id="question-settings"
          field={selected}
          onChange={updateField}
          onTypeChange={changeType}
          content={uiContent.FieldSettingsPanel}
        />
      </main>
      {publishOpen && (
        <Modal
          title={content.publishedTitle}
          onClose={() => setPublishOpen(false)}
          content={uiContent.Modal}
        >
          <p>{content.publishedDescription}</p>
          <Input aria-label={content.formLink} readOnly value={localUrl} />
          <footer>
            <Button variant="secondary" onClick={copyLink}>
              {content.copyLink}
            </Button>
            <Button onClick={openForm}>{content.openForm}</Button>
          </footer>
        </Modal>
      )}
      {refineOpen && (
        <Modal
          title={proposal ? content.reviewTitle : content.refineTitle}
          onClose={() => setRefineOpen(false)}
          content={uiContent.Modal}
        >
          {error && (
            <p role="alert" className={styles.refineError}>
              {error}
            </p>
          )}

          {proposal ? (
            <>
              <p>{content.reviewDescription}</p>
              <h3>{proposal.title}</h3>
              <p>{proposal.description}</p>
              <ol>
                {proposal.fields.map((f) => (
                  <li key={f.id}>
                    {f.label}{' '}
                    <Badge>
                      {f.type}
                      {f.required ? content.requiredSuffix : ''}
                    </Badge>
                    {f.options?.length > 0 && (
                      <small className={styles.proposalDetail}>
                        {f.options.join(content.optionSeparator)}
                      </small>
                    )}
                    {f.helpText && <small className={styles.proposalDetail}>{f.helpText}</small>}
                  </li>
                ))}
              </ol>
              <footer>
                <Button variant="secondary" onClick={discardProposal}>
                  {content.discard}
                </Button>
                <Button onClick={applyProposal}>{content.applyChanges}</Button>
              </footer>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                refine();
              }}
            >
              <p>{content.refineDescription}</p>
              <FormField id="refine" label={content.requestedChanges}>
                <Textarea
                  id="refine"
                  required
                  value={refinePrompt}
                  onChange={(e) => setRefinePrompt(e.target.value)}
                />
              </FormField>
              <footer>
                {!aiReady && (
                  <Button variant="secondary" onClick={() => setKeyDialog(true)}>
                    {content.configureGemini}
                  </Button>
                )}
                <Button type="submit" loading={loading} disabled={!aiReady || !refinePrompt.trim()}>
                  {content.previewChanges}
                </Button>
              </footer>
            </form>
          )}
        </Modal>
      )}
    </>
  );
}
