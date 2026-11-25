import { uiContent } from '../../content/uiContent';
import Modal from '../molecules/Modal';
import FormProposal from '../molecules/FormProposal';
import RefineFormRequest from '../molecules/RefineFormRequest';
import styles from '../templates/Templates.module.css';

export default function RefineFormDialog({
  content = uiContent.FormEditorTemplate,
  proposal,
  error,
  setRefineOpen,
  discardProposal,
  applyProposal,
  refine,
  refinePrompt,
  setRefinePrompt,
  aiReady,
  setKeyDialog,
  loading,
}) {
  return (
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
        <FormProposal
          content={content}
          proposal={proposal}
          discardProposal={discardProposal}
          applyProposal={applyProposal}
        />
      ) : (
        <RefineFormRequest
          content={content}
          refine={refine}
          refinePrompt={refinePrompt}
          setRefinePrompt={setRefinePrompt}
          aiReady={aiReady}
          setKeyDialog={setKeyDialog}
          loading={loading}
        />
      )}
    </Modal>
  );
}
