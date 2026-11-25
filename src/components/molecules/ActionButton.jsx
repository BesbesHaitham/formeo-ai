import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

/** A button label with optional leading and trailing icons, without an extra wrapper. */
export default function ActionButton({
  icon,
  iconSize,
  endIcon,
  endIconSize,
  prefix,
  children,
  ...props
}) {
  return (
    <Button {...props}>
      {prefix}
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
      {endIcon && <Icon name={endIcon} size={endIconSize} />}
    </Button>
  );
}
