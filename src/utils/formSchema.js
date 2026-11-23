import { fieldTypes, choiceTypes } from '../content/fieldTypes.js';
import { formDefaults } from '../config/appConfig.js';

/** @typedef {{id:string,type:string,label:string,placeholder:string,required:boolean,helpText:string,section:string,options:string[],validation:Object}} Field */
/** @typedef {{id:string,title:string,description:string,status:'draft'|'published',fields:Field[],sections:Array,appearance:Object,createdAt:string,updatedAt:string}} FormSchema */
export const uid = () => crypto.randomUUID();

export function createField(type = 'text', patch = {}) {
  const definition = fieldTypes.find((item) => item.type === type);

  if (!definition) throw new Error(`Unsupported field type: ${type}`);

  return {
    id: uid(),
    type,
    label: definition.label,
    placeholder: definition.placeholder || '',
    required: false,
    helpText: '',
    section: '',
    options: [...(definition.options || [])],
    validation: {},
    ...patch,
  };
}

export function createForm(patch = {}) {
  const now = new Date().toISOString();

  return {
    id: uid(),
    title: formDefaults.title,
    description: formDefaults.description,
    status: formDefaults.status,
    sections: [],
    fields: [],
    appearance: { color: formDefaults.color },
    createdAt: now,
    updatedAt: now,
    ...patch,
  };
}

export function copyForm(source, title = source.title) {
  const { id, createdAt, updatedAt } = createForm();

  return {
    ...structuredClone(source),
    id,
    createdAt,
    updatedAt,
    title,
    status: 'draft',
    fields: source.fields.map((field) => ({ ...structuredClone(field), id: uid() })),
  };
}

export function validateGeneratedForm(data, current) {
  if (
    !data ||
    typeof data.title !== 'string' ||
    !data.title.trim() ||
    typeof data.description !== 'string' ||
    !Array.isArray(data.fields) ||
    data.fields.length > 100 ||
    !data.fields.length
  )
    throw new Error('The AI returned an invalid form. Please retry.');

  const ids = new Set();
  const suppliedIds = data.fields
    .filter((field) => typeof field?.id === 'string')
    .map((field) => field.id);

  if (
    new Set(suppliedIds).size !== suppliedIds.length ||
    (current && data.fields.some((field) => !field.id))
  )
    throw new Error(
      'Gemini returned missing or duplicate question IDs. Please retry the refinement.',
    );

  const fields = data.fields.map((field) => {
    const definition = fieldTypes.find((item) => item.type === field?.type);

    if (
      !field ||
      !definition ||
      typeof field.label !== 'string' ||
      !field.label.trim() ||
      typeof field.required !== 'boolean'
    )
      throw new Error('The AI returned an unsupported or incomplete question.');

    const id =
      current?.fields.some((old) => old.id === field.id) && !ids.has(field.id) ? field.id : uid();
    ids.add(id);
    const existing = current?.fields.find((old) => old.id === id);
    // Ratings have a configured scale; empty AI options should not discard it.
    const options =
      field.type === 'rating' &&
      (field.options === undefined || (Array.isArray(field.options) && !field.options.length))
        ? existing?.type === 'rating' && existing.options.length
          ? existing.options
          : definition.options
        : field.options;

    if (
      choiceTypes.includes(field.type) &&
      (!Array.isArray(options) ||
        !options.length ||
        options.some((option) => typeof option !== 'string' || !option.trim()))
    )
      throw new Error('A choice question has invalid options.');

    for (const key of ['placeholder', 'helpText', 'section'])
      if (field[key] !== undefined && typeof field[key] !== 'string')
        throw new Error('The AI returned invalid question text.');
    const validation = {};

    if (
      field.validation !== undefined &&
      (!field.validation || typeof field.validation !== 'object' || Array.isArray(field.validation))
    )
      throw new Error('Gemini returned invalid validation settings. Please retry.');

    for (const key of ['min', 'max', 'minLength', 'maxLength']) {
      const value = field.validation?.[key];

      if (value === undefined) continue;

      if (!Number.isFinite(value))
        throw new Error('Gemini returned a nonnumeric validation rule. Please retry.');

      validation[key] = value;
    }

    if (
      ['minLength', 'maxLength'].some(
        (key) =>
          validation[key] !== undefined &&
          (!Number.isInteger(validation[key]) || validation[key] < 0),
      )
    )
      throw new Error('Question lengths must be nonnegative whole numbers. Please retry.');

    return createField(field.type, {
      ...existing,
      type: field.type,
      label: field.label.trim(),
      required: field.required,
      placeholder: field.placeholder ?? existing?.placeholder ?? '',
      helpText: field.helpText ?? existing?.helpText ?? '',
      section: field.section ?? existing?.section ?? '',
      id,
      validation: field.validation === undefined ? existing?.validation || {} : validation,
      options: choiceTypes.includes(field.type)
        ? [...new Set(options.map((option) => option.trim()))]
        : [],
    });
  });
  const form = createForm({
    ...current,
    title: data.title.trim(),
    description: data.description.trim(),
    fields,
    sections: [...new Set(fields.map((f) => f.section).filter(Boolean))],
    updatedAt: new Date().toISOString(),
  });
  const error = publishError(form);

  if (error) throw new Error(error);

  return form;
}

export function validStoredForm(form) {
  return (
    form &&
    typeof form.id === 'string' &&
    typeof form.title === 'string' &&
    typeof form.description === 'string' &&
    (form.icon === undefined || typeof form.icon === 'string') &&
    (form.appearance === undefined ||
      (form.appearance &&
        typeof form.appearance === 'object' &&
        (form.appearance.color === undefined || /^#[0-9a-f]{6}$/i.test(form.appearance.color)))) &&
    ['draft', 'published'].includes(form.status) &&
    Array.isArray(form.fields) &&
    new Set(form.fields.map((f) => f?.id)).size === form.fields.length &&
    form.fields.every(
      (f) =>
        f &&
        typeof f.id === 'string' &&
        typeof f.label === 'string' &&
        typeof f.required === 'boolean' &&
        ['placeholder', 'helpText', 'section'].every(
          (key) => f[key] === undefined || typeof f[key] === 'string',
        ) &&
        fieldTypes.some((t) => t.type === f.type) &&
        Array.isArray(f.options) &&
        f.options.every((o) => typeof o === 'string'),
    )
  );
}

export function publishError(form) {
  if (!form.title.trim()) return 'Give your form a title before publishing.';

  if (!form.fields.length) return 'Add at least one question before publishing.';

  if (form.fields.some((f) => !f.label.trim()))
    return 'Give every question a label before publishing.';

  if (
    form.fields.some(
      (f) =>
        choiceTypes.includes(f.type) &&
        (!f.options.length ||
          f.options.some((o) => !o.trim()) ||
          new Set(f.options).size !== f.options.length),
    )
  )
    return 'Choice questions need unique, nonempty options before publishing.';

  if (
    form.fields.some((f) => {
      const v = f.validation || {};

      return (
        (v.min !== undefined && v.max !== undefined && v.min > v.max) ||
        (v.minLength !== undefined && v.maxLength !== undefined && v.minLength > v.maxLength) ||
        ['minLength', 'maxLength'].some(
          (key) => v[key] !== undefined && (!Number.isInteger(v[key]) || v[key] < 0),
        )
      );
    })
  )
    return 'Check the minimum and maximum validation settings before publishing.';

  return '';
}

export function validateAnswer(field, value) {
  const empty =
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    value === null ||
    (Array.isArray(value) && !value.length);

  if (empty) return field.required ? 'Please answer this question to continue.' : '';

  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return 'Please enter a valid email address.';

  if (field.type === 'tel' && !/^[+\d\s().-]{6,25}$/.test(value))
    return 'Please enter a valid phone number.';

  if (field.type === 'number' && !Number.isFinite(Number(value)))
    return 'Please enter a valid number.';

  const rule = field.validation || {};

  if (
    field.type === 'number' &&
    ((rule.min !== undefined && Number(value) < rule.min) ||
      (rule.max !== undefined && Number(value) > rule.max))
  )
    return `Enter a number within the allowed range (${rule.min ?? 'any'}–${rule.max ?? 'any'}).`;

  if (
    typeof value === 'string' &&
    ((rule.minLength !== undefined && value.length < rule.minLength) ||
      (rule.maxLength !== undefined && value.length > rule.maxLength))
  )
    return `Use ${rule.minLength || 0}–${rule.maxLength || 'more'} characters.`;

  if (
    choiceTypes.includes(field.type) &&
    (Array.isArray(value) ? value : [value]).some((v) => !field.options.includes(v))
  )
    return 'Please select an available option.';

  if (field.type === 'date' && Number.isNaN(Date.parse(value)))
    return 'Please choose a valid date.';

  return '';
}
