export const passwordMinimum = 10;
const rules = [
  ['lowercase', (value) => /[a-z]/.test(value)],
  ['uppercase', (value) => /[A-Z]/.test(value)],
  ['number', (value) => /[0-9]/.test(value)],
  ['length', (value) => value.length >= passwordMinimum],
];

export const checkPassword = (value) => rules.map(([id, test]) => ({ id, met: test(value) }));

export const validPassword = (value) => checkPassword(value).every(({ met }) => met);
