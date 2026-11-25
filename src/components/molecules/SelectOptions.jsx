import Select from '../atoms/Select';

export default function SelectOptions({ options, ...props }) {
  return (
    <Select {...props}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
}
