import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Textarea from '../atoms/Textarea';
import Label from '../atoms/Label';
import Icon from '../atoms/Icon';
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
        <div className={styles.promptBox}>
          <header>
            <Label htmlFor="ai-prompt">{content.promptLabel}</Label>
            <Badge variant="purple" icon={content.icons.sparkles}>
              {mock ? content.mockReady : hasKey ? content.aiReady : content.exampleAvailable}
            </Badge>
          </header>
          <Textarea
            id="ai-prompt"
            maxLength={maxLength}
            required
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={content.placeholder}
          />
          <footer>
            <span>{content.promptHint}</span>
            <span>
              {prompt.length}
              {content.countSeparator}
              {maxLength.toLocaleString()}
            </span>
          </footer>
        </div>
        <div className={styles.suggestions}>
          <span>{content.tryAnExample}</span>
          {examples.map((example) => (
            <Button
              key={example.label}
              variant="secondary"
              size="sm"
              onClick={() => setPrompt(example.prompt)}
            >
              <Icon name={example.icon} size={14} />
              {example.label}
            </Button>
          ))}
        </div>
        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
        <Button type="submit" size="lg" loading={loading} disabled={!prompt.trim()}>
          {' '}
          <Icon name={content.icons.sparkles} size={18} />
          {loading ? content.creatingYourForm : content.generateMyForm}
          <Icon name={content.icons.arrowright} size={18} />
        </Button>
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
        <Button variant="link" size="sm" onClick={onConfigure}>
          {hasKey ? content.changeKey : content.configureKey}
        </Button>
        <span>{content.separator}</span>
        <Button variant="link" size="sm" onClick={onDemo}>
          {content.templateLabel}
        </Button>
      </div>
    </section>
  );
}
