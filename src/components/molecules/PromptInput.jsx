import { uiContent } from '../../content/uiContent';
import Label from '../atoms/Label';
import Textarea from '../atoms/Textarea';
import styles from '../organisms/Organisms.module.css';

export default function PromptInput({
  content = uiContent.AIFormPrompt,
  prompt,
  setPrompt,
  maxLength,
  status,
}) {
  return (
    <div className={styles.promptBox}>
      <header>
        <Label htmlFor="ai-prompt">{content.promptLabel}</Label>
        {status}
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
  );
}
