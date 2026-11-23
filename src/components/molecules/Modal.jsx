import { uiContent } from '../../content/uiContent';
import { useEffect, useId, useRef } from 'react';
import classNames from 'classnames';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';

export default function Modal({
  content = uiContent.Modal,
  title,
  onClose,
  children,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();

    return () => dialog.close();
  }, []);

  return (
    <dialog
      ref={ref}
      className={classNames(styles.modal, className)}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) {
          const rect = ref.current.getBoundingClientRect();

          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
      {...rest}
    >
      <header>
        <Heading id={titleId}>{title}</Heading>
        <Button variant="ghost" size="sm" aria-label={content.closeDialog} onClick={onClose}>
          <Icon name={content.icons.x} />
        </Button>
      </header>
      {children}
    </dialog>
  );
}
