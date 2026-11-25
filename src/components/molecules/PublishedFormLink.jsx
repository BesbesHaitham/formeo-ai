import { uiContent } from '../../content/uiContent';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

export default function PublishedFormLink({
  content = uiContent.FormEditorTemplate,
  localUrl,
  copyLink,
  openForm,
}) {
  return (
    <>
      <Input aria-label={content.formLink} readOnly value={localUrl} />
      <footer>
        <Button variant="secondary" onClick={copyLink}>
          {content.copyLink}
        </Button>
        <Button onClick={openForm}>{content.openForm}</Button>
      </footer>
    </>
  );
}
