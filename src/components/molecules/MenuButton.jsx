import { useId, useRef, useState } from 'react';
import classNames from 'classnames';
import { useMenuPosition } from '../../hooks/useMenuPosition';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';

export default function MenuButton({ label, icon, children, items, onAction, className, ...rest }) {
  const id = useId();
  const trigger = useRef(null);
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  useMenuPosition(open, trigger, menu);

  function focusItem(index) {
    const buttons = menu.current.querySelectorAll('[role="menuitem"]');
    buttons[(index + buttons.length) % buttons.length]?.focus();
  }

  return (
    <>
      <Button
        ref={trigger}
        variant="ghost"
        className={classNames(!children && styles.menuTrigger, className)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        popoverTarget={id}
        onKeyDown={(event) => {
          if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
            event.preventDefault();
            menu.current.showPopover();
            requestAnimationFrame(() => focusItem(event.key === 'ArrowUp' ? -1 : 0));
          }
        }}
        {...rest}
      >
        {icon && <Icon name={icon} />}
        {children}
      </Button>
      <div
        id={id}
        ref={menu}
        popover="auto"
        role="menu"
        aria-label={label}
        className={styles.actionMenu}
        onToggle={(event) => {
          const expanded = event.newState === 'open';
          setOpen(expanded);

          if (expanded) focusItem(0);
        }}
        onKeyDown={(event) => {
          const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];

          if (keys.includes(event.key)) {
            event.preventDefault();
            const buttons = [...menu.current.querySelectorAll('[role="menuitem"]')];
            const index = buttons.indexOf(document.activeElement);
            focusItem(
              event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? -1
                  : index + (event.key === 'ArrowDown' ? 1 : -1),
            );
          }

          if (event.key === 'Tab') menu.current.hidePopover();
        }}
      >
        {items.map(({ name, label, icon, variant }) => (
          <Button
            key={name}
            role="menuitem"
            variant="ghost"
            className={classNames(styles.menuItem, variant === 'danger' && styles.destructiveItem)}
            onClick={() => {
              menu.current.hidePopover();
              trigger.current.focus();
              onAction(name);
            }}
          >
            <Icon name={icon} size={17} />
            {label}
          </Button>
        ))}
      </div>
    </>
  );
}
