import PromptInput from '../molecules/PromptInput';
import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import ActionButton from '../molecules/ActionButton';
import Badge from '../molecules/Badge';
import IconTile from '../molecules/IconTile';
import styles from './Organisms.module.css';

export default function AIFormPrompt({
  content = uiContent.AIFormPrompt,
  examples = [],
  maxLength = 1000,
  prompt,
  setPrompt,
  loading,
  error,
  hasKey,
  mock,
  onGenerate,
  onConfigure,
  onDemo,
  className,
  ...rest
}) {
  return (
    <section className={classNames(styles.prompt, className)} {...rest}>
      <IconTile icon={content.icons.sparkles} />
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
      >
        <PromptInput
          content={content}
          prompt={prompt}
          setPrompt={setPrompt}
          maxLength={maxLength}
          status={
            <Badge variant="purple" icon={content.icons.sparkles}>
              {mock ? content.mockReady : hasKey ? content.aiReady : content.exampleAvailable}
            </Badge>
          }
        />
        <div className={styles.suggestions}>
          <span>{content.tryAnExample}</span>
          {examples.map((example) => (
            <ActionButton
              key={example.label}
              variant="secondary"
              size="sm"
              onClick={() => setPrompt(example.prompt)}
              icon={example.icon}
              iconSize={14}
            >
              {example.label}
            </ActionButton>
          ))}
        </div>
        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
        <ActionButton
          type="submit"
          size="lg"
          loading={loading}
          disabled={!prompt.trim()}
          icon={content.icons.sparkles}
          iconSize={18}
          endIcon={content.icons.arrowright}
          endIconSize={18}
          prefix=" "
        >
          {loading ? content.creatingYourForm : content.generateMyForm}
        </ActionButton>
      </form>
      <div className={styles.understand}>
        <IconTile icon={content.icons.squarecheck} />
        <div>
          <strong>{content.summaryTitle}</strong>
          <p>{content.summaryDescription}</p>
        </div>
        <Badge variant="success">{content.editableAfterGeneration}</Badge>
      </div>
      <div className={styles.demoNote}>
        <span>
          {mock ? content.mockMessage : hasKey ? content.connectedMessage : content.connectionHint}
        </span>
        <ActionButton variant="link" size="sm" onClick={onConfigure}>
          {hasKey ? content.changeKey : content.configureKey}
        </ActionButton>
        <span>{content.separator}</span>
        <ActionButton variant="link" size="sm" onClick={onDemo}>
          {content.templateLabel}
        </ActionButton>
      </div>
    </section>
  );
}
