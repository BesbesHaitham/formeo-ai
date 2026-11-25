import SaveStatus from '../components/molecules/SaveStatus';

export default {
  title: 'Molecules/SaveStatus',
  component: SaveStatus,
  args: { saved: true },
};

export const Default = {};

export const SaveUnavailable = { args: { saved: false } };
