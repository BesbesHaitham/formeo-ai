import AnalyticsOverview from '../components/organisms/AnalyticsOverview';
import { initialResponses, initialVisits } from '../content/fixtures';
import { getAnalytics } from '../utils/analytics';

export default {
  title: 'Organisms/AnalyticsOverview',
  component: AnalyticsOverview,
};

export const Default = {
  args: {
    analytics: getAnalytics(initialResponses, initialVisits, 7, new Date('2026-11-20')),
    days: 7,
  },
};
