import { uiContent } from '../../content/uiContent';
import Icon from '../atoms/Icon';

export default function EmptyFormsMessage({ content = uiContent.FormsGrid }) {
  return (
    <>
      <Icon name={content.icons.filetext} size={36} />
      <h2>{content.emptyTitle}</h2>
      <p>{content.emptyDescription}</p>
    </>
  );
}
