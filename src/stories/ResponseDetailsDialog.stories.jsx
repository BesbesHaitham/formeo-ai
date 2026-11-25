import { fn } from 'storybook/test';
import { useState } from 'react';
import Button from '../components/atoms/Button';
import ResponseDetailsDialog from '../components/organisms/ResponseDetailsDialog';
import { initialForms, initialResponses } from '../content/fixtures';
import { responseDetails } from '../utils/analytics';

export default {
  title: 'Organisms/ResponseDetailsDialog',
  component: ResponseDetailsDialog,
  args: {
    selected: initialResponses[0],
    details: responseDetails(
      initialResponses[0],
      initialForms.find((form) => form.id === initialResponses[0].formId) || initialForms[0],
    ),
    setSelected: fn(),
  },
  render: function DialogStory(args) {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        {open && (
          <ResponseDetailsDialog
            {...args}
            setSelected={(value) => {
              args.setSelected(value);
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const Default = {};

export const NoAnswers = { args: { details: [] } };
