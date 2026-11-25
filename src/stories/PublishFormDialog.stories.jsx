import { fn } from 'storybook/test';
import { useState } from 'react';
import Button from '../components/atoms/Button';
import PublishFormDialog from '../components/organisms/PublishFormDialog';

export default {
  title: 'Organisms/PublishFormDialog',
  component: PublishFormDialog,
  args: {
    localUrl: 'http://localhost:5173/f/student-registration',
    copyLink: fn(),
    openForm: fn(),
    setPublishOpen: fn(),
  },
  render: function DialogStory(args) {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        {open && (
          <PublishFormDialog
            {...args}
            setPublishOpen={(value) => {
              args.setPublishOpen(value);
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const Default = {};
