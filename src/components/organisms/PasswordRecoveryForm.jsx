import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ActionButton from '../molecules/ActionButton';
import IconTile from '../molecules/IconTile';
import FormField from '../molecules/FormField';
import styles from './Organisms.module.css';

export default function PasswordRecoveryForm({
  content,
  email,
  setEmail,
  sent,
  loading,
  error,
  cooldown,
  submit,
  back,
  mock,
  authState,
  className,
  ...rest
}) {
  const title = useRef(null);
  useEffect(() => {
    if (sent) title.current?.focus();
  }, [sent]);

  return (
    <form
      className={classNames(styles.authForm, styles.recoveryForm, className)}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      {...rest}
    >
      <IconTile
        icon={sent ? content.sentIcon : content.requestIcon}
        className={styles.recoveryIcon}
      />
      <h1 ref={title} tabIndex={-1}>
        {sent ? content.sentTitle : content.title}
      </h1>
      <p>
        {sent ? (mock ? content.mockDescription : content.sentDescription) : content.description}
      </p>
      {sent ? (
        <>
          <p className={styles.recoveryHint}>{mock ? content.mockHint : content.inboxHint}</p>
          <div className={styles.recoveryResend}>
            <span>{content.noEmail}</span>
            <ActionButton variant="link" onClick={submit} loading={loading} disabled={cooldown > 0}>
              {cooldown ? `${content.resendIn} ${cooldown}${content.secondsUnit}` : content.resend}
            </ActionButton>
          </div>
        </>
      ) : (
        <FormField
          id="recovery-email"
          type="email"
          required
          autoComplete="email"
          label={content.emailLabel}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      )}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {sent ? (
        <ActionButton variant="secondary" onClick={back} icon="ArrowLeft" iconSize={17}>
          {content.back}
        </ActionButton>
      ) : (
        <ActionButton className={styles.recoverySubmit} type="submit" loading={loading}>
          {content.submit}
        </ActionButton>
      )}
      {!sent && (
        <small>
          <Link to="/login" state={authState}>
            {content.login}
          </Link>{' '}
          {content.or}{' '}
          <Link to="/signup" state={authState}>
            {content.signup}
          </Link>
        </small>
      )}
    </form>
  );
}
