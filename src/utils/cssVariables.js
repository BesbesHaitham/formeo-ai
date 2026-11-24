/** Pass runtime data to stylesheet rules without declaring presentation in JSX. */
export function setCssVariables(element, values) {
  if (!element) return;

  for (const [name, value] of Object.entries(values)) {
    if (!name.startsWith('--')) throw new Error('Expected a CSS custom property');

    if (value === undefined || value === null) element.style.removeProperty(name);
    else element.style.setProperty(name, String(value));
  }
}
