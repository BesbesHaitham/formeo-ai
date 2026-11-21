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
  aiReady,
  mockMode,
  theme,
  setTheme,
  setKeyDialog,
  generate,
  demo,
  className,
}) {
  return (
    <>
      <AppHeader mode="generator" theme={theme} onTheme={setTheme} content={uiContent.AppHeader} />
      <main id="main-content" tabIndex={-1} className={classNames(styles.generator, className)}>
        <AIFormPrompt
          examples={examples}
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          error={error}
          hasKey={aiReady}
          mock={mockMode}
          onConfigure={() => setKeyDialog(true)}
          onGenerate={generate}
          onDemo={demo}
          content={uiContent.AIFormPrompt}
        />
      </main>
    </>
  );
}
