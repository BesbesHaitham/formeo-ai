import { fn } from 'storybook/test';
import FormQuestionList from '../components/organisms/FormQuestionList';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Organisms/FormQuestionList',
  component: FormQuestionList,
};

const noop = fn();

export const Default = {
  args: {
    form: studentForm,
    selectedId: 'name',
    onSelect: noop,
    onUpdate: noop,
    onAction: noop,
    onReorder: noop,
    onAdd: noop,
    tab: 'questions',
    setTab: noop,
  },
};
