import { useFormEditor } from '../hooks/useFormEditor';
import FormEditorTemplate from '../components/templates/FormEditorTemplate';
import NotFoundTemplate from '../components/templates/NotFoundTemplate';
export default function EditorPage() {
  const editor = useFormEditor();
  return editor.form ? <FormEditorTemplate {...editor} /> : <NotFoundTemplate />;
}
