import { fn } from 'storybook/test';
import GlobalFeedback from '../components/templates/GlobalFeedback';

export default {
  title: 'Templates/GlobalFeedback',
  component: GlobalFeedback,
  parameters: { layout: 'fullscreen' },
  args: { setKeyDialog: fn(), setApiKey: fn() },
};

export const Notice = { args: { notice: 'Form duplicated.' } };

export const SaveError = {
  args: { saveError: 'Your browser storage is full. Changes could not be saved.' },
};

export const ConnectKey = { args: { keyDialog: true } };

export const Hidden = {};
