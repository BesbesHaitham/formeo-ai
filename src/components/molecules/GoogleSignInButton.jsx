import classNames from 'classnames';
import Button from '../atoms/Button';
import styles from './Molecules.module.css';

export default function GoogleSignInButton({ label, notice, className, ...rest }) {
  return (
    <div className={classNames(styles.googleButton, className)}>
      <Button variant="secondary" {...rest}>
        <img src="/google-g.svg" width="20" height="20" alt="" />
        {label}
      </Button>
      {notice && <small>{notice}</small>}
    </div>
  );
}
