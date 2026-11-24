import { fn } from 'storybook/test';
import FormEditorTemplate from '../components/templates/FormEditorTemplate';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Templates/FormEditorTemplate',
  component: FormEditorTemplate,
  parameters: { layout: 'fullscreen' },
};

const noop = fn();

export const Default = {
  args: {
    form: studentForm,
    selected: studentForm.fields[0],
    selectedId: 'name',
    setSelectedId: noop,
    update: noop,
    updateField: noop,
    addField: noop,
    fieldAction: noop,
    reorder: noop,
    changeType: noop,
    tab: 'questions',
    setTab: noop,
    preview: noop,
    publish: noop,
    setRefineOpen: noop,
  },
};
