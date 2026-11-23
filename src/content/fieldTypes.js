export const fieldTypes = [
  { type: 'text', label: 'Short text', icon: 'AlignLeft', placeholder: 'Type your answer...' },
  { type: 'email', label: 'Email', icon: 'Mail', placeholder: 'you@example.com' },
  { type: 'select', label: 'Dropdown', icon: 'ChevronDown', options: ['Option 1', 'Option 2'] },
  {
    type: 'radio',
    label: 'Multiple choice',
    icon: 'CircleCheck',
    options: ['Option 1', 'Option 2'],
  },
  { type: 'checkbox', label: 'Checkbox', icon: 'SquareCheck', options: ['I agree'] },
  { type: 'date', label: 'Date', icon: 'Calendar' },
  { type: 'file', label: 'File upload', icon: 'Upload' },
  { type: 'textarea', label: 'Long text', icon: 'Text', placeholder: 'Tell us more...' },
  { type: 'number', label: 'Number', icon: 'Hash' },
  { type: 'tel', label: 'Phone', icon: 'Phone', placeholder: '+234...' },
  { type: 'rating', label: 'Rating', icon: 'Star', options: ['1', '2', '3', '4', '5'] },
];

export const choiceTypes = ['select', 'radio', 'checkbox', 'rating'];
