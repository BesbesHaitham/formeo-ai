import RefineFormDialog from '../organisms/RefineFormDialog';
import PublishFormDialog from '../organisms/PublishFormDialog';
import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import AppHeader from '../organisms/AppHeader';
import FieldLibrary from '../organisms/FieldLibrary';
import { fieldTypes } from '../../content/fieldTypes';
import FieldSettingsPanel from '../organisms/FieldSettingsPanel';
import FormQuestionList from '../organisms/FormQuestionList';
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
        <PublishFormDialog
          content={content}
          setPublishOpen={setPublishOpen}
          localUrl={localUrl}
          copyLink={copyLink}
          openForm={openForm}
        />
      )}
      {refineOpen && (
        <RefineFormDialog
          content={content}
          proposal={proposal}
          error={error}
          setRefineOpen={setRefineOpen}
          discardProposal={discardProposal}
          applyProposal={applyProposal}
          refine={refine}
          refinePrompt={refinePrompt}
          setRefinePrompt={setRefinePrompt}
          aiReady={aiReady}
          setKeyDialog={setKeyDialog}
          loading={loading}
        />
      )}
    </>
  );
}
