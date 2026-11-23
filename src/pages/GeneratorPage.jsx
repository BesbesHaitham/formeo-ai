import { useFormGeneration } from '../hooks/useFormGeneration';
import AIGeneratorTemplate from '../components/templates/AIGeneratorTemplate';

export default function GeneratorPage() {
  return <AIGeneratorTemplate {...useFormGeneration()} />;
}
