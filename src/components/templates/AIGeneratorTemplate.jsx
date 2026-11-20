import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import AppHeader from '../organisms/AppHeader';
import AIFormPrompt from '../organisms/AIFormPrompt';
import { examples } from '../../content/fixtures';
import styles from './Templates.module.css';
export default function AIGeneratorTemplate({
  prompt,
  setPrompt,
  loading,
  error,
  apiKey,
  setKeyDialog,
  generate,
  demo,
  className,
}) {
  return (
    <>
      <AppHeader mode="generator" onHelp={() => setKeyDialog(true)} content={uiContent.AppHeader} />
      <main className={classNames(styles.generator, className)}>
        <AIFormPrompt
          examples={examples}
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          error={error}
          hasKey={!!apiKey}
          onConfigure={() => setKeyDialog(true)}
          onGenerate={generate}
          onDemo={demo}
          content={uiContent.AIFormPrompt}
        />
      </main>
    </>
  );
}
