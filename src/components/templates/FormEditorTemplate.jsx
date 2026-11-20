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
    apiKey,
    setKeyDialog,
    className,
  } = props;
  return (
    <>
      <AppHeader
        mode="editor"
        form={form}
        onPreview={preview}
        onPublish={publish}
        saved={!saveError}
        content={uiContent.AppHeader}
      />
      <main className={classNames(styles.editor, className)}>
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
          title="Your form is published"
          onClose={() => setPublishOpen(false)}
          content={uiContent.Modal}
        >
          <p>
            This link works in this browser with its saved workspace. Cross-device public sharing
            requires a backend.
          </p>
          <Input aria-label="Local form link" readOnly value={localUrl} />
          <footer>
            <Button variant="secondary" onClick={copyLink}>
              Copy local link
            </Button>
            <Button onClick={openForm}>Open form</Button>
          </footer>
        </Modal>
      )}
      {refineOpen && (
        <Modal
          title={proposal ? 'Review AI changes' : 'Refine your form with AI'}
          onClose={() => setRefineOpen(false)}
          content={uiContent.Modal}
        >
          {error && (
            <p
              role="alert"
              style={{
                color: 'var(--danger)',
              }}
            >
              {error}
            </p>
          )}

          {proposal ? (
            <>
              <p>
                Review the proposed questions before applying. Your saved form remains unchanged
                until you apply.
              </p>
              <h3>{proposal.title}</h3>
              <p>{proposal.description}</p>
              <ol>
                {proposal.fields.map((f) => (
                  <li key={f.id}>
                    {f.label}{' '}
                    <Badge>
                      {f.type}
                      {f.required ? ' · required' : ''}
                    </Badge>
                    {f.options?.length > 0 && (
                      <small
                        style={{
                          display: 'block',
                          color: 'var(--muted)',
                        }}
                      >
                        {f.options.join(' · ')}
                      </small>
                    )}
                    {f.helpText && (
                      <small
                        style={{
                          display: 'block',
                          color: 'var(--muted)',
                        }}
                      >
                        {f.helpText}
                      </small>
                    )}
                  </li>
                ))}
              </ol>
              <footer>
                <Button variant="secondary" onClick={discardProposal}>
                  Discard
                </Button>
                <Button onClick={applyProposal}>Apply changes</Button>
              </footer>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                refine();
              }}
            >
              <p>
                Describe a change, such as “Make phone optional” or “Translate all questions into
                French”.
              </p>
              <FormField id="refine" label="Requested changes">
                <Textarea
                  id="refine"
                  required
                  value={refinePrompt}
                  onChange={(e) => setRefinePrompt(e.target.value)}
                />
              </FormField>
              <footer>
                {!apiKey && (
                  <Button variant="secondary" onClick={() => setKeyDialog(true)}>
                    Configure Gemini
                  </Button>
                )}
                <Button type="submit" loading={loading} disabled={!apiKey || !refinePrompt.trim()}>
                  Preview changes
                </Button>
              </footer>
            </form>
          )}
        </Modal>
      )}
    </>
  );
}
