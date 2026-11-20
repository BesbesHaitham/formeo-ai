import { fn } from 'storybook/test';
import FormsGrid from '../components/organisms/FormsGrid';
import TemplateGallery from '../components/organisms/TemplateGallery';
import AIFormPrompt from '../components/organisms/AIFormPrompt';
import FieldLibrary from '../components/organisms/FieldLibrary';
import FieldSettingsPanel from '../components/organisms/FieldSettingsPanel';
import FormQuestionList from '../components/organisms/FormQuestionList';
import FormPreview from '../components/organisms/FormPreview';
import AnalyticsOverview from '../components/organisms/AnalyticsOverview';
import AuthenticationForm from '../components/organisms/AuthenticationForm';
import AppHeader from '../components/organisms/AppHeader';
import Sidebar from '../components/organisms/Sidebar';
import ResponsesTable from '../components/organisms/ResponsesTable';
import AIBanner from '../components/organisms/AIBanner';
import {
  initialForms,
  initialResponses,
  initialVisits,
  templates,
  studentForm,
} from '../content/fixtures';
import { getAnalytics } from '../utils/analytics';
import { fieldTypes } from '../content/fieldTypes';
export default { title: 'Organisms/Sections' };
const noop = fn();
export const Forms = {
  render: () => <FormsGrid forms={initialForms} responses={initialResponses} onAction={noop} />,
};
export const EmptyForms = { render: () => <FormsGrid forms={[]} onCreate={noop} /> };
export const Templates = { render: () => <TemplateGallery templates={templates} onUse={noop} /> };
export const Prompt = {
  render: () => (
    <AIFormPrompt
      prompt="Create a student registration form"
      setPrompt={noop}
      onGenerate={noop}
      onConfigure={noop}
      onDemo={noop}
    />
  ),
};
export const Generating = {
  render: () => (
    <AIFormPrompt
      prompt="Create an internship application"
      setPrompt={noop}
      loading
      onGenerate={noop}
      onConfigure={noop}
      onDemo={noop}
    />
  ),
};
export const GenerationError = {
  render: () => (
    <AIFormPrompt
      prompt="Create a survey"
      setPrompt={noop}
      error="Gemini quota reached. Retry later or use demo mode."
      onGenerate={noop}
      onConfigure={noop}
      onDemo={noop}
    />
  ),
};
export const Library = {
  render: () => (
    <div style={{ width: 308 }}>
      <FieldLibrary types={fieldTypes} onAdd={noop} />
    </div>
  ),
};
export const Settings = {
  render: () => (
    <div style={{ width: 330 }}>
      <FieldSettingsPanel field={studentForm.fields[0]} onChange={noop} onTypeChange={noop} />
    </div>
  ),
};
export const Canvas = {
  render: () => (
    <FormQuestionList
      form={studentForm}
      selectedId="name"
      onSelect={noop}
      onUpdate={noop}
      onAction={noop}
      onReorder={noop}
      onAdd={noop}
      tab="questions"
      setTab={noop}
    />
  ),
};
export const Preview = {
  render: () => <FormPreview field={studentForm.fields[1]} onChange={noop} onNext={noop} />,
};
export const Analytics = {
  render: () => (
    <AnalyticsOverview
      analytics={getAnalytics(initialResponses, initialVisits, 7, new Date('2026-11-20'))}
      days={7}
    />
  ),
};
export const Authentication = {
  render: () => (
    <AuthenticationForm
      values={{ email: '', password: '', remember: false }}
      change={noop}
      submit={noop}
    />
  ),
};
export const Header = { render: () => <AppHeader onCreate={noop} onHelp={noop} /> };
export const Navigation = { render: () => <Sidebar onSettings={noop} /> };
export const Responses = {
  render: () => (
    <ResponsesTable
      form={initialForms[0]}
      responses={initialResponses}
      onSelect={noop}
      onShowAll={noop}
    />
  ),
};
export const Banner = { render: () => <AIBanner onGenerate={noop} /> };
