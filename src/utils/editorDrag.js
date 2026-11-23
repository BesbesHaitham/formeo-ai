import { fieldTypes } from '../content/fieldTypes';

const fieldType = 'application/x-formeo-field-type';
const questionId = 'application/x-formeo-question-id';

/** Only accept our own drag payloads; external text/files never become questions. */
export function startEditorDrag(event, kind, value) {
  event.dataTransfer.setData(kind === 'field' ? fieldType : questionId, value);
  event.dataTransfer.effectAllowed = kind === 'field' ? 'copy' : 'move';
}

export function isEditorDrag(transfer) {
  return Array.from(transfer.types).some((type) => type === fieldType || type === questionId);
}

export function readEditorDrag(transfer) {
  const type = transfer.getData(fieldType);

  if (fieldTypes.some((field) => field.type === type)) return { kind: 'field', value: type };

  const id = transfer.getData(questionId);

  return id ? { kind: 'question', value: id } : null;
}
