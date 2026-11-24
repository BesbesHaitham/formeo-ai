import { fn } from 'storybook/test';
import { useState } from 'react';
import WorkspaceDialogs, { KeyDialog } from '../components/organisms/WorkspaceDialogs';
import Button from '../components/atoms/Button';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Organisms/WorkspaceDialogs',
  component: WorkspaceDialogs,
  subcomponents: { KeyDialog },
  args: {
    dialog: { type: 'rename', form: studentForm },
    onClose: fn(),
    onConfirm: fn(),
    onSave: fn(),
  },
  render: function DialogStory({ keySettings, onSave, ...args }) {
    const [open, setOpen] = useState(true);
    const close = () => {
      args.onClose();
      setOpen(false);
    };

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        {open &&
          (keySettings ? (
            <KeyDialog {...keySettings} onClose={close} onSave={onSave} />
          ) : (
            <WorkspaceDialogs
              {...args}
              onClose={close}
              onConfirm={(value) => {
                args.onConfirm(value);
                setOpen(false);
              }}
            />
          ))}
      </>
    );
  },
};

export const Rename = {};

export const Delete = { args: { dialog: { type: 'delete', form: studentForm } } };

export const ConnectKey = { args: { keySettings: { hasKey: false } } };

export const ConnectedKey = { args: { keySettings: { hasKey: true } } };
