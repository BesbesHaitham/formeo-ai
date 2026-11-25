import { uiContent } from '../../content/uiContent';
import Modal from '../molecules/Modal';
import styles from '../templates/Templates.module.css';

export default function ResponseDetailsDialog({
  content = uiContent.ResponsesTemplate,
  selected,
  details = [],
  setSelected,
}) {
  return (
    <Modal
      title={content.responseDetails}
      onClose={() => setSelected(null)}
      content={uiContent.Modal}
    >
      <p>
        {new Date(selected.submittedAt).toLocaleString()}
        {selected.fixture ? content.exampleResponse : content.submittedResponse}
      </p>
      <dl>
        {details.map(({ id, label, value }) => (
          <div key={id} className={styles.responseDetail}>
            <dt className={styles.responseLabel}>{label}</dt>
            <dd className={styles.responseValue}>{value}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}
