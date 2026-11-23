import { fn } from 'storybook/test';
import { useState } from 'react';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import AIGeneratorTemplate from '../components/templates/AIGeneratorTemplate';
import FormEditorTemplate from '../components/templates/FormEditorTemplate';
import FormPreviewTemplate from '../components/templates/FormPreviewTemplate';
import TemplatesGalleryTemplate from '../components/templates/TemplatesGalleryTemplate';
import ResponsesTemplate from '../components/templates/ResponsesTemplate';
import AuthTemplate from '../components/templates/AuthTemplate';
import {
  initialForms,
  templates,
  studentForm,
  initialResponses,
  initialVisits,
} from '../content/fixtures';
import { getAnalytics } from '../utils/analytics';
import { checkPassword, passwordMinimum } from '../utils/password';

const noop = fn();
const common = {
  create: noop,
  action: noop,
  navigate: noop,
  setTheme: noop,
  setKeyDialog: noop,
  theme: 'light',
  setQuery: noop,
  query: '',
  forms: initialForms,
};

export default { title: 'Templates/Pages', parameters: { layout: 'fullscreen' } };

export const Dashboard = {
  render: () => (
    <DashboardTemplate
      {...common}
      total={6}
      responses={initialResponses}
      status="all"
      setStatus={noop}
      initialized
    />
  ),
};

export const Generator = {
  render: () => (
    <AIGeneratorTemplate
      prompt=""
      setPrompt={noop}
      generate={noop}
      demo={noop}
      setKeyDialog={noop}
    />
  ),
};

export const Editor = {
  render: () => (
    <FormEditorTemplate
      form={studentForm}
      selected={studentForm.fields[0]}
      selectedId="name"
      setSelectedId={noop}
      update={noop}
      updateField={noop}
      addField={noop}
      fieldAction={noop}
      reorder={noop}
      changeType={noop}
      tab="questions"
      setTab={noop}
      preview={noop}
      publish={noop}
      setRefineOpen={noop}
    />
  ),
};

export const Preview = {
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

export const Gallery = {
  render: () => (
    <TemplatesGalleryTemplate
      {...common}
      templates={templates}
      category="All templates"
      setCategory={noop}
    />
  ),
};

export const Responses = {
  render: () => (
    <ResponsesTemplate
      {...common}
      form={initialForms[0]}
      analytics={getAnalytics(initialResponses, initialVisits, 7, new Date('2026-11-20'))}
      days={7}
      setDays={noop}
      setSelected={noop}
      setShowAll={noop}
      exportCsv={noop}
      onCreate={noop}
    />
  ),
};

export const Login = {
  render: () => (
    <AuthTemplate
      values={{ email: '', password: '', remember: false }}
      change={noop}
      submit={noop}
      googleMock
      onGoogle={noop}
    />
  ),
};

export const Signup = {
  render: () => (
    <AuthTemplate
      signingUp
      values={{ name: '', email: '', password: '', agree: false }}
      passwordChecks={checkPassword('')}
      passwordMinimum={passwordMinimum}
      change={noop}
      submit={noop}
      googleMock
      onGoogle={noop}
    />
  ),
};

export const PasswordRecovery = {
  render: () => <AuthTemplate recovery={{ email: '', setEmail: noop, submit: noop, back: noop }} />,
};

export const ResetEmailSent = {
  render: () => (
    <AuthTemplate
      recovery={{ sent: true, email: 'you@example.com', cooldown: 60, submit: noop, back: noop }}
    />
  ),
};
