import { fn } from 'storybook/test';
import IconTile from '../components/molecules/IconTile';

export default {
  title: 'Molecules/IconTile',
  component: IconTile,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = { args: { icon: 'Sparkles' } };
