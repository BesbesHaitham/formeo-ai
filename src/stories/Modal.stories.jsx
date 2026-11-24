import { fn } from 'storybook/test';
import { useState } from 'react';
import Modal from '../components/molecules/Modal';
import Button from '../components/atoms/Button';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  args: {
    title: 'Confirm your changes',
    children: 'Your form is ready to publish.',
    onClose: fn(),
  },
  render: function ModalStory(args) {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        {open && (
          <Modal
            {...args}
            onClose={() => {
              args.onClose();
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const Default = {};

export const LongContent = {
  args: {
    children: Array.from({ length: 12 }, (_, i) => (
      <p key={i}>Review the form title, questions, and sharing settings before publishing.</p>
    )),
  },
};
