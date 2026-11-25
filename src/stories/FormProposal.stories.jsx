import { fn } from 'storybook/test';
import FormProposal from '../components/molecules/FormProposal';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Molecules/FormProposal',
  component: FormProposal,
  args: { proposal: studentForm, discardProposal: fn(), applyProposal: fn() },
};

export const Default = {};

export const SingleQuestion = {
  args: { proposal: { ...studentForm, fields: studentForm.fields.slice(0, 1) } },
};
