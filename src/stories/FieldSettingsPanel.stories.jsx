import { fn } from 'storybook/test';
import FieldSettingsPanel from '../components/organisms/FieldSettingsPanel';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Organisms/FieldSettingsPanel',
  component: FieldSettingsPanel,
};

const noop = fn();

export const Default = {
  render: () => (
    <div style={{ width: 330 }}>
      <FieldSettingsPanel field={studentForm.fields[0]} onChange={noop} onTypeChange={noop} />
    </div>
  ),
};
