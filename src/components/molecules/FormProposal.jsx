import { uiContent } from '../../content/uiContent';
import Text from '../atoms/Text';
import badgeStyles from './Molecules.module.css';
import Button from '../atoms/Button';
import styles from '../templates/Templates.module.css';

export default function FormProposal({
  content = uiContent.FormEditorTemplate,
  proposal,
  discardProposal,
  applyProposal,
}) {
  return (
    <>
      <p>{content.reviewDescription}</p>
      <h3>{proposal.title}</h3>
      <p>{proposal.description}</p>
      <ol>
        {proposal.fields.map((f) => (
          <li key={f.id}>
            {f.label}{' '}
            <span className={badgeStyles.badge}>
              <Text>
                {f.type}
                {f.required ? content.requiredSuffix : ''}
              </Text>
            </span>
            {f.options?.length > 0 && (
              <small className={styles.proposalDetail}>
                {f.options.join(content.optionSeparator)}
              </small>
            )}
            {f.helpText && <small className={styles.proposalDetail}>{f.helpText}</small>}
          </li>
        ))}
      </ol>
      <footer>
        <Button variant="secondary" onClick={discardProposal}>
          {content.discard}
        </Button>
        <Button onClick={applyProposal}>{content.applyChanges}</Button>
      </footer>
    </>
  );
}
