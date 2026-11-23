import { uiContent } from '../../content/uiContent';
import { useState } from 'react';
import classNames from 'classnames';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';

export default function PasswordField({ content = uiContent.PasswordField, className, ...rest }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={classNames(styles.password, className)}>
      <Input type={visible ? 'text' : 'password'} {...rest} />
      <Button
        variant="ghost"
        aria-label={visible ? content.hidePassword : content.showPassword}
        aria-pressed={visible}
        size="sm"
        onClick={() => setVisible(!visible)}
      >
        <Icon name={visible ? content.icons.eyeoff : content.icons.eye} size={18} />
      </Button>
    </div>
  );
}
