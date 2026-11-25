import PublishedFormLink from '../molecules/PublishedFormLink';
import { uiContent } from '../../content/uiContent';
import Modal from '../molecules/Modal';

export default function PublishFormDialog({
  content = uiContent.FormEditorTemplate,
  setPublishOpen,
  localUrl,
  copyLink,
  openForm,
}) {
  return (
    <Modal
      title={content.publishedTitle}
      onClose={() => setPublishOpen(false)}
      content={uiContent.Modal}
    >
      <p>{content.publishedDescription}</p>
      <PublishedFormLink
        content={content}
        localUrl={localUrl}
        copyLink={copyLink}
        openForm={openForm}
      />
    </Modal>
  );
}
