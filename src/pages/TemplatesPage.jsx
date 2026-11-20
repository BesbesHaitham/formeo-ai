import { useTemplates } from '../hooks/useTemplates';
import TemplatesGalleryTemplate from '../components/templates/TemplatesGalleryTemplate';
export default function TemplatesPage() {
  return <TemplatesGalleryTemplate {...useTemplates()} />;
}
