import { fn } from 'storybook/test';
import FieldLibrary from '../components/organisms/FieldLibrary';
import { fieldTypes } from '../content/fieldTypes';

export default {
  title: 'Organisms/FieldLibrary',
  component: FieldLibrary,
};

const noop = fn();

export const Default = {
  render: () => (
    <div style={{ width: 308 }}>
      <FieldLibrary types={fieldTypes} onAdd={noop} />
    </div>
  ),
};
