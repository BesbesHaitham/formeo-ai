import { uiContent } from '../../content/uiContent';
import { useState } from 'react';
import ActionButton from '../molecules/ActionButton';
import FormField from '../molecules/FormField';
import Modal from '../molecules/Modal';

export default function WorkspaceDialogs({
  content = uiContent.WorkspaceDialogs,
  dialog,
  onClose,
  onConfirm,
  className,
  ...rest
}) {
  const [value, setValue] = useState(dialog.form.title);

  return (
    <Modal
      title={dialog.type === 'delete' ? content.deleteThisForm : content.renameForm}
      onClose={onClose}
      className={className}
      {...rest}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm(value);
        }}
      >
        {dialog.type === 'delete' ? (
          <p>
            {content.openingQuote}
            {dialog.form.title}
            {content.deleteSuffix}
          </p>
        ) : (
          <FormField
            id="rename"
            label={content.formName}
            control="input"
            value={value}
            required
            autoFocus
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <footer>
          <ActionButton variant="secondary" onClick={onClose}>
            {content.cancel}
          </ActionButton>
          <ActionButton type="submit" variant={dialog.type === 'delete' ? 'danger' : 'primary'}>
            {dialog.type === 'delete' ? content.deleteForm : content.saveName}
          </ActionButton>
        </footer>
      </form>
    </Modal>
  );
}

export function KeyDialog({
  content = uiContent.KeyDialog,
  onSave,
  onClose,
  hasKey,
  className,
  ...rest
}) {
  const [key, setKey] = useState('');

  return (
    <Modal title={content.title} onClose={onClose} className={className} {...rest}>
      <p>{content.description}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(key.trim());
          onClose();
        }}
      >
        <FormField
          id="gemini-key"
          label={content.apiKeyLabel}
          control="input"
          type="password"
          autoComplete="off"
          required
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={content.enterYourApiKey}
        />
        <footer>
          {hasKey && (
            <ActionButton
              variant="secondary"
              onClick={() => {
                onSave('');
                onClose();
              }}
            >
              {content.disconnect}
            </ActionButton>
          )}
          <ActionButton type="submit">{content.useForThisSession}</ActionButton>
        </footer>
      </form>
    </Modal>
  );
}
