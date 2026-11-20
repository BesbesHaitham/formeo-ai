import { fn } from 'storybook/test';
import Badge from '../components/molecules/Badge';
import IconButton from '../components/molecules/IconButton';
import FormField from '../components/molecules/FormField';
import SearchField from '../components/molecules/SearchField';
import PasswordField from '../components/molecules/PasswordField';
import FieldTypeItem from '../components/molecules/FieldTypeItem';
import FormProgress from '../components/molecules/FormProgress';
import FieldControl from '../components/molecules/FieldControl';
import Logo from '../components/molecules/Logo';
import IconTile from '../components/molecules/IconTile';
import { studentForm } from '../content/fixtures';
export default { title: 'Molecules/Compositions', args: { onClick: fn(), onChange: fn() } };
export const Status = {
  render: () => (
    <div style={{ display: 'flex', gap: 15 }}>
      <Badge variant="success" icon="CheckCircle">
        Published
      </Badge>
      <Badge>Draft</Badge>
      <Badge variant="purple">Demo mode</Badge>
    </div>
  ),
};
export const Search = { render: (args) => <SearchField {...args} /> };
export const Field = {
  render: (args) => (
    <FormField id="story-email" label="Email address" placeholder="you@example.com" {...args} />
  ),
};
export const ValidationError = {
  render: (args) => (
    <FormField
      id="story-error"
      label="Email address"
      value="invalid"
      error="Please enter a valid email address."
      {...args}
    />
  ),
};
export const Password = {
  render: (args) => (
    <PasswordField aria-label="Password" placeholder="Enter your password" {...args} />
  ),
};
export const Question = {
  render: (args) => <FieldControl field={studentForm.fields[3]} {...args} />,
};
export const AddField = { render: (args) => <FieldTypeItem icon="Mail" label="Email" {...args} /> };
export const Progress = {
  args: { current: 2, total: 6, title: 'Student Registration' },
  render: (args) => <FormProgress {...args} />,
};
export const Action = {
  render: (args) => <IconButton icon="Trash2" label="Delete question" {...args} />,
};
export const Brand = { render: () => <Logo /> };
export const Tile = { render: () => <IconTile icon="Sparkles" /> };
