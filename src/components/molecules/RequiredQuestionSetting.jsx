import { uiContent } from '../../content/uiContent';
import Divider from '../atoms/Divider';
import Switch from '../atoms/Switch';
import styles from '../organisms/Organisms.module.css';

export default function RequiredQuestionSetting({
  content = uiContent.FieldSettingsPanel,
  field,
  onChange,
}) {
  return (
    <>
      <Divider />
      <div>
        <div className={styles.toggleRow}>
          <strong>{content.requiredQuestion}</strong>
          <Switch
            aria-label={content.requiredQuestion}
            checked={field.required}
            onChange={(e) =>
              onChange({
                required: e.target.checked,
              })
            }
          />
        </div>
        <small>{content.requiredHint}</small>
      </div>
      <Divider />
    </>
  );
}
