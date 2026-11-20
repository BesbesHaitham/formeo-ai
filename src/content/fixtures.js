import { createField, createForm } from '../utils/formSchema.js';
const field = (type, label, patch = {}) => createField(type, { label, required: true, ...patch });
export const studentForm = createForm({
  id: 'student-registration',
  title: 'Student Registration',
  description: 'Complete this short form to register for our program.',
  fields: [
    field('text', 'Full name', { id: 'name', placeholder: 'Enter your full name' }),
    field('email', 'Email address', {
      id: 'email',
      helpText: 'We’ll use it to send you registration updates.',
    }),
    field('select', 'Education level', {
      options: ['High school', 'Undergraduate', 'Postgraduate'],
      placeholder: 'Choose your education level',
    }),
    field('radio', 'Preferred program', { options: ['Engineering', 'Business', 'Design'] }),
    field('file', 'Upload a supporting document', {
      required: false,
      helpText: 'File metadata is saved locally. The file itself is not uploaded.',
    }),
    field('checkbox', 'Consent', { options: ['I agree to be contacted about this program.'] }),
  ],
});
const definitions = [
  [
    'contact',
    'Contact form',
    'Simple way to hear from people',
    'Mail',
    'Business',
    [
      field('text', 'Full name'),
      field('email', 'Email address'),
      field('textarea', 'How can we help?'),
    ],
  ],
  [
    'event',
    'Event registration',
    'Collect registrations for your next event',
    'Calendar',
    'Registration',
    [
      field('text', 'Full name', { id: 'name' }),
      field('email', 'Email address', { id: 'email' }),
      field('select', 'Ticket type', { options: ['General admission', 'VIP', 'Student'] }),
      field('textarea', 'Dietary requirements', { required: false }),
    ],
  ],
  [
    'feedback',
    'Customer feedback',
    'Hear what your customers think',
    'MessageSquare',
    'Feedback',
    [
      field('email', 'Email address'),
      field('rating', 'How was your experience?'),
      field('textarea', 'What could we improve?'),
    ],
  ],
  [
    'job',
    'Job application',
    'Find the right people for your team',
    'Users',
    'Business',
    [
      field('text', 'Full name'),
      field('email', 'Email address'),
      field('tel', 'Phone number'),
      field('file', 'Your CV'),
      field('textarea', 'Tell us about yourself'),
    ],
  ],
  [
    'survey',
    'Product survey',
    'Understand your audience',
    'ChartNoAxesColumn',
    'Feedback',
    [
      field('rating', 'How likely are you to recommend us?'),
      field('radio', 'How often do you use our product?', {
        options: ['Daily', 'Weekly', 'Monthly'],
      }),
      field('textarea', 'Anything else?', { required: false }),
    ],
  ],
  [
    'workshop',
    'Workshop signup',
    'Collect your participant details',
    'SquareCheck',
    'Registration',
    [
      field('text', 'Full name'),
      field('email', 'Email address'),
      field('select', 'Preferred session', { options: ['Morning', 'Afternoon'] }),
    ],
  ],
  [
    'appointment',
    'Appointment request',
    'Schedule meetings with ease',
    'Clock',
    'Business',
    [
      field('text', 'Full name'),
      field('email', 'Email address'),
      field('date', 'Preferred date'),
      field('textarea', 'What would you like to discuss?'),
    ],
  ],
  [
    'course',
    'Course evaluation',
    'Understand the learning experience',
    'Star',
    'Feedback',
    [
      field('text', 'Course name'),
      field('rating', 'Overall course rating'),
      field('textarea', 'What did you enjoy most?'),
      field('textarea', 'Suggestions for improvement', { required: false }),
    ],
  ],
];
export const templates = definitions.map(([id, title, description, icon, category, fields]) =>
  createForm({ id, title, description, icon, category, fields }),
);
export const initialForms = ['event', 'feedback', 'job', 'course', 'contact', 'survey'].map(
  (id, i) => ({
    ...templates.find((f) => f.id === id),
    title:
      id === 'contact'
        ? 'Contact us'
        : id === 'survey'
          ? 'New survey'
          : templates.find((f) => f.id === id).title,
    status: [2, 5].includes(i) ? 'draft' : 'published',
  }),
);
export const initialResponses = Array.from({ length: 124 }, (_, index) => {
  const names = [
    'Amira Ben Salem',
    'Yassine Trabelsi',
    'Mariem Gharbi',
    'Daniel Okafor',
    'Sofia Martins',
  ];
  const date = new Date('2026-11-19T12:00:00Z');
  date.setUTCDate(date.getUTCDate() - (index % 7));
  return {
    id: `sample-${index}`,
    formId: 'event',
    answers: {
      name: names[index % names.length],
      email: `${names[index % names.length].split(' ')[0].toLowerCase()}@example.com`,
    },
    submittedAt: date.toISOString(),
    duration: 65 + (index % 40),
    fixture: true,
  };
});
export const initialVisits = Array.from({ length: 135 }, (_, i) => ({
  id: `visit-${i}`,
  formId: 'event',
  startedAt: initialResponses[i % 124].submittedAt,
  completed: i < 124,
  fixture: true,
}));
export const examples = [
  {
    label: 'Event registration',
    icon: 'Calendar',
    prompt:
      'Create an event registration form with full name, email, ticket type and dietary requirements.',
  },
  {
    label: 'Feedback',
    icon: 'MessageSquare',
    prompt:
      'Create a customer feedback form with email, satisfaction rating and suggestions for improvement.',
  },
  {
    label: 'Job application',
    icon: 'Users',
    prompt:
      'Create a job application form with full name, email, phone number, work experience and CV upload.',
  },
  {
    label: 'Survey',
    icon: 'ChartNoAxesColumn',
    prompt:
      'Create a product survey asking about usage frequency, satisfaction and feature suggestions.',
  },
];
