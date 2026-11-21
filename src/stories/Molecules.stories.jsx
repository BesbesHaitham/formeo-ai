import { fn } from 'storybook/test';
import { useState } from 'react';
import { createField } from '../utils/formSchema';
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
import ThemeSwitch from '../components/molecules/ThemeSwitch';
import PreviewDeviceSwitch from '../components/molecules/PreviewDeviceSwitch';
import PhoneStatusBar from '../components/molecules/PhoneStatusBar';
import MenuButton from '../components/molecules/MenuButton';
import { formActions } from '../content/navigation';
import GoogleSignInButton from '../components/molecules/GoogleSignInButton';
import PasswordStrength from '../components/molecules/PasswordStrength';
import { checkPassword } from '../utils/password';
import { uiContent } from '../content/uiContent';
import { studentForm } from '../content/fixtures';
export default { title: 'Molecules/Compositions', args: { onClick: fn(), onChange: fn() } };
export const Status = {
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
export const Search = { render: (args) => <SearchField {...args} /> };
export const PasswordGuidance = {
  render: () => (
    <PasswordStrength
      checks={checkPassword('Example')}
      content={uiContent.PasswordStrength}
      style={{ position: 'static', maxWidth: 360 }}
    />
  ),
};
export const GoogleSignIn = {
  render: () => (
    <GoogleSignInButton
      label="Continue with Google"
      notice="Test account provided by WireMock"
      onClick={fn()}
    />
  ),
};
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

export const Theme = { render: () => <ThemeSwitch theme="light" onChange={fn()} /> };
export const ActionMenu = {
  render: () => (
    <MenuButton label="Form actions" icon="MoreHorizontal" items={formActions} onAction={fn()} />
  ),
};

export const Rating = {
  args: {
    field: createField('rating', {
      id: 'story-rating',
      label: 'Overall satisfaction',
      required: true,
    }),
    value: '',
  },
  render: function RatingStory(args) {
    const [value, setValue] = useState(args.value);
    return (
      <FieldControl
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange(next);
        }}
      />
    );
  },
};
export const CustomRating = {
  ...Rating,
  args: {
    ...Rating.args,
    field: createField('rating', {
      id: 'story-custom-rating',
      label: 'Your experience',
      options: ['Poor', 'Average', 'Excellent'],
    }),
  },
};
export const DisabledRating = { ...Rating, args: { ...Rating.args, disabled: true, value: '3' } };

export const PreviewDevices = {
  render: function PreviewDevicesStory() {
    const [device, setDevice] = useState('desktop');
    return <PreviewDeviceSwitch value={device} onChange={setDevice} />;
  },
};

export const PhoneChrome = { render: () => <PhoneStatusBar style={{ width: 280 }} /> };
