import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import PromptInput from '../components/molecules/PromptInput';
import Badge from '../components/molecules/Badge';

export default {
  title: 'Molecules/PromptInput',
  component: PromptInput,
  args: { prompt: '', maxLength: 1000, setPrompt: fn() },
  render: function PromptStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <PromptInput
        {...args}
        setPrompt={(prompt) => {
          args.setPrompt(prompt);
          updateArgs({ prompt });
        }}
      />
    );
  },
};

export const Default = {};

export const WithDescription = {
  args: { prompt: 'Create a student registration form with name, email, and education level.' },
};

export const WithStatus = { args: { status: <Badge variant="success">AI ready</Badge> } };
