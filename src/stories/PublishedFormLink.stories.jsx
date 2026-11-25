import { fn } from 'storybook/test';
import PublishedFormLink from '../components/molecules/PublishedFormLink';

export default {
  title: 'Molecules/PublishedFormLink',
  component: PublishedFormLink,
  args: {
    localUrl: 'http://localhost:5173/f/student-registration',
    copyLink: fn(),
    openForm: fn(),
  },
};

export const Default = {};
