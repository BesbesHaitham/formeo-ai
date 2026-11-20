import { useForms } from '../hooks/useForms';
import DashboardTemplate from '../components/templates/DashboardTemplate';
export default function FormsPage() {
  return <DashboardTemplate {...useForms()} />;
}
