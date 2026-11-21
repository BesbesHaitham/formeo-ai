import classNames from 'classnames';
import { uiContent } from '../../content/uiContent';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';

export default function PreviewDeviceSwitch({
  value = 'desktop',
  onChange,
  content = uiContent.PreviewDeviceSwitch,
  className,
  ...rest
}) {
  return (
    <div
      role="group"
      aria-label={content.label}
      className={classNames(styles.deviceSwitch, className)}
      {...rest}
    >
      {content.devices.map(({ value: device, icon, label }) => (
        <Button
          key={device}
          variant="ghost"
          aria-label={label}
          title={label}
          aria-pressed={value === device}
          onClick={() => onChange(device)}
        >
          <Icon name={icon} size={19} />
        </Button>
      ))}
    </div>
  );
}
