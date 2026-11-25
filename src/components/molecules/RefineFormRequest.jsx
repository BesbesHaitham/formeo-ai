import { uiContent } from '../../content/uiContent';
import Label from '../atoms/Label';
import styles from './Molecules.module.css';
import Button from '../atoms/Button';
import Textarea from '../atoms/Textarea';

export default function RefineFormRequest({
  content = uiContent.FormEditorTemplate,
  refine,
  refinePrompt,
  setRefinePrompt,
  aiReady,
  setKeyDialog,
  loading,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        refine();
      }}
    >
      <p>{content.refineDescription}</p>
      <div className={styles.field}>
        <Label htmlFor="refine">{content.requestedChanges}</Label>
        <Textarea
          id="refine"
          required
          value={refinePrompt}
          onChange={(e) => setRefinePrompt(e.target.value)}
        />
      </div>
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
  );
}
