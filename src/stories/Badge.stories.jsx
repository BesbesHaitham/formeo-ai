import { fn } from 'storybook/test';
import Badge from '../components/molecules/Badge';

export default {
  title: 'Molecules/Badge',
  component: Badge,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  render: () => (
    <div style={{ display: 'flex', gap: 15 }}>
      <Badge variant="success" icon="CheckCircle">
        Published
      </Badge>
      <Badge>Draft</Badge>
      <Badge variant="purple">Ready to customize</Badge>
    </div>
  ),
};
