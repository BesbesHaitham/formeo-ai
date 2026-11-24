import { uiContent } from '../../content/uiContent';
import { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
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
          <FormField id="rename" label={content.formName}>
            <Input
              id="rename"
              value={value}
              required
              autoFocus
              onChange={(e) => setValue(e.target.value)}
            />
          </FormField>
        )}
        <footer>
          <Button variant="secondary" onClick={onClose}>
            {content.cancel}
          </Button>
          <Button type="submit" variant={dialog.type === 'delete' ? 'danger' : 'primary'}>
            {dialog.type === 'delete' ? content.deleteForm : content.saveName}
          </Button>
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
        <FormField id="gemini-key" label={content.apiKeyLabel}>
          <Input
            id="gemini-key"
            type="password"
            autoComplete="off"
            required
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={content.enterYourApiKey}
          />
        </FormField>
        <footer>
          {hasKey && (
            <Button
              variant="secondary"
              onClick={() => {
                onSave('');
                onClose();
              }}
            >
              {content.disconnect}
            </Button>
          )}
          <Button type="submit">{content.useForThisSession}</Button>
        </footer>
      </form>
    </Modal>
  );
}
