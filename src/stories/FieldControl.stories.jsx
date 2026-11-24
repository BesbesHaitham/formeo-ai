import { fn } from 'storybook/test';
import { useState } from 'react';
import { createField } from '../utils/formSchema';
import FieldControl from '../components/molecules/FieldControl';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Molecules/FieldControl',
  component: FieldControl,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  args: { field: studentForm.fields[3] },
};

export const Rating = {
  args: {
    field: createField('rating', {
      id: 'story-rating',
      label: 'Overall satisfaction',
      required: true,
    }),
    value: '',
  },
  render: function RatingStory(args) {
    const [value, setValue] = useState(args.value);

    return (
      <FieldControl
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange(next);
        }}
      />
    );
  },
};

export const CustomRating = {
  ...Rating,
  args: {
    ...Rating.args,
    field: createField('rating', {
      id: 'story-custom-rating',
      label: 'Your experience',
      options: ['Poor', 'Average', 'Excellent'],
    }),
  },
};

export const DisabledRating = { ...Rating, args: { ...Rating.args, disabled: true, value: '3' } };
