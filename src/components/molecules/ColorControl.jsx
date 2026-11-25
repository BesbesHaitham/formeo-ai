import Input from '../atoms/Input';
import styles from '../organisms/Organisms.module.css';

export default function ColorControl({ accent, form, onUpdate }) {
  return (
    <div className={styles.colorControl}>
      <Input
        id="accent"
        type="color"
        value={accent}
        onChange={(e) =>
          onUpdate({
            appearance: {
              ...form.appearance,
              color: e.target.value,
            },
          })
        }
      />
      <output htmlFor="accent">{accent.toUpperCase()}</output>
    </div>
  );
}
