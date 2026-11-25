import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import RefineFormRequest from '../components/molecules/RefineFormRequest';

export default {
  title: 'Molecules/RefineFormRequest',
  component: RefineFormRequest,
  args: {
    refinePrompt: 'Add a phone number question.',
    setRefinePrompt: fn(),
    refine: fn(),
    aiReady: true,
    setKeyDialog: fn(),
    loading: false,
  },
  render: function RequestStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <RefineFormRequest
        {...args}
        setRefinePrompt={(refinePrompt) => {
          args.setRefinePrompt(refinePrompt);
          updateArgs({ refinePrompt });
        }}
      />
    );
  },
};

export const Default = {};

export const EmptyRequest = { args: { refinePrompt: '' } };

export const NeedsApiKey = { args: { aiReady: false } };

export const Loading = { args: { loading: true } };
