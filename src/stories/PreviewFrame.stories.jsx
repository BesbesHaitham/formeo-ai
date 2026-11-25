import PreviewFrame from '../components/organisms/PreviewFrame';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Organisms/PreviewFrame',
  component: PreviewFrame,
  args: {
    form: studentForm,
    index: 0,
    complete: false,
    mobile: false,
    children: <p>Your question appears here.</p>,
  },
};

export const Default = {};

export const Mobile = { args: { mobile: true } };

export const Complete = { args: { complete: true, children: <p>Thank you for your response.</p> } };
