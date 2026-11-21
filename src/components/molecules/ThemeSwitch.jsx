import { uiContent } from '../../content/uiContent';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export default function ThemeSwitch({ theme, onChange, ...rest }) {
  const dark = theme === 'dark';
  return (
    <Button
      variant="ghost"
      role="switch"
      aria-checked={dark}
      aria-label={uiContent.ThemeSwitch.label}
      title={dark ? uiContent.ThemeSwitch.light : uiContent.ThemeSwitch.dark}
      onClick={() => onChange(dark ? 'light' : 'dark')}
      {...rest}
    >
      <Icon name={dark ? 'Moon' : 'Sun'} />
    </Button>
  );
}
