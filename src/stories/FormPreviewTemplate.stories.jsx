import { fn } from 'storybook/test';
import { useState } from 'react';
import FormPreviewTemplate from '../components/templates/FormPreviewTemplate';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Templates/FormPreviewTemplate',
  component: FormPreviewTemplate,
  parameters: { layout: 'fullscreen' },
};

const noop = fn();

const Preview = {
  args: {
    form: studentForm,
    field: studentForm.fields[1],
    index: 1,
    answers: {},
    change: noop,
    next: noop,
    back: noop,
    exit: noop,
    preview: true,
    previewDevice: 'desktop',
  },
  render: function PreviewStory(args) {
    const [device, setDevice] = useState(args.previewDevice);

    return <FormPreviewTemplate {...args} previewDevice={device} setPreviewDevice={setDevice} />;
  },
};

export const MobilePreview = { ...Preview, args: { ...Preview.args, previewDevice: 'mobile' } };

export const Default = Preview;
