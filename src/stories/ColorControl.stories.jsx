import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import ColorControl from '../components/molecules/ColorControl';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Molecules/ColorControl',
  component: ColorControl,
  args: { accent: '#5b43e7', form: studentForm, onUpdate: fn() },
  render: function ColorStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <ColorControl
        {...args}
        onUpdate={(patch) => {
          args.onUpdate(patch);
          updateArgs({ accent: patch.appearance.color, form: { ...args.form, ...patch } });
        }}
      />
    );
  },
};

export const Default = {};

export const BrightAccent = { args: { accent: '#ffcc00' } };
