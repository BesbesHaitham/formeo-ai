import { fn } from 'storybook/test';
import { useState } from 'react';
import Button from '../components/atoms/Button';
import RefineFormDialog from '../components/organisms/RefineFormDialog';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Organisms/RefineFormDialog',
  component: RefineFormDialog,
  args: {
    refinePrompt: 'Add a phone number question.',
    setRefinePrompt: fn(),
    refine: fn(),
    aiReady: true,
    setKeyDialog: fn(),
    loading: false,
    setRefineOpen: fn(),
    discardProposal: fn(),
    applyProposal: fn(),
  },
  render: function DialogStory(args) {
    const [open, setOpen] = useState(true);
    const [prompt, setPrompt] = useState(args.refinePrompt);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        {open && (
          <RefineFormDialog
            {...args}
            setRefinePrompt={(value) => {
              args.setRefinePrompt(value);
              setPrompt(value);
            }}
            refinePrompt={prompt}
            setRefineOpen={(value) => {
              args.setRefineOpen(value);
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const Default = {};

export const ReviewProposal = { args: { proposal: studentForm } };

export const Error = { args: { error: 'Unable to generate changes. Please try again.' } };

export const NeedsApiKey = { args: { aiReady: false } };

export const Loading = { args: { loading: true } };
