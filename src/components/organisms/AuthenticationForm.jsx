import { uiContent } from '../../content/uiContent';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Checkbox from '../atoms/Checkbox';
import FormField from '../molecules/FormField';
import PasswordField from '../molecules/PasswordField';
import GoogleSignInButton from '../molecules/GoogleSignInButton';
import PasswordStrength from '../molecules/PasswordStrength';
import styles from './Organisms.module.css';
export default function AuthenticationForm({
  content = uiContent.AuthenticationForm,
  signingUp,
  values,
  passwordChecks,
  passwordMinimum,
  change,
  error,
  loading,
  busy,
  googleMock,
  googleLoading,
  onGoogle,
  submit,
  onForgotPassword,
  authState,
  className,
  ...rest
}) {
  return (
    <form
      className={classNames(styles.authForm, className)}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      {...rest}
    >
      <h1>{signingUp ? content.createYourAccount : content.welcomeBack}</h1>
      <p>
        {signingUp
          ? content.getStartedWithFormeoAiInJustA
          : content.logInToContinueBuildingAmazingForms}
      </p>
      <GoogleSignInButton
        onClick={onGoogle}
        loading={googleLoading}
        disabled={busy}
        label={content.continueWithGoogle}
        notice={googleMock && content.googleMockLabel}
      />
      <div className={styles.authDivider}>{content.orContinueWith}</div>
      <div className={styles.authFields}>
        {signingUp && (
          <FormField
            id="name"
            label={content.fullName}
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => change('name', e.target.value)}
          />
        )}
        <FormField
          id="email"
          label={content.emailAddress}
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={(e) => change('email', e.target.value)}
        />
        <FormField
          id="password"
          label={content.password}
          labelAction={
            !signingUp && (
              <Button variant="link" size="sm" onClick={onForgotPassword}>
                {content.forgotPassword}
              </Button>
            )
          }
        >
          <div className={styles.passwordGuide}>
            <PasswordField
              id="password"
              required
              minLength={signingUp ? passwordMinimum : 8}
              autoComplete={signingUp ? 'new-password' : 'current-password'}
              value={values.password}
              aria-describedby={signingUp ? 'password-guidance' : ''}
              onChange={(e) => change('password', e.target.value)}
            />
            {signingUp && (
              <PasswordStrength
                id="password-guidance"
                checks={passwordChecks}
                content={uiContent.PasswordStrength}
              />
            )}
          </div>
        </FormField>
      </div>
      <div className={styles.authMeta}>
        <label>
          <Checkbox
            required={signingUp}
            checked={signingUp ? values.agree : values.remember}
            onChange={(e) => change(signingUp ? 'agree' : 'remember', e.target.checked)}
          />
          {signingUp ? content.storageConsent : content.rememberMe}
        </label>
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <Button type="submit" loading={loading} disabled={busy}>
        {signingUp ? content.createAccount : content.logIn}
        <Icon name={content.icons.arrowright} size={17} />
      </Button>
      <small>
        {signingUp ? content.alreadyHaveAnAccount : content.newToFormeoAi}
        <Link to={signingUp ? content.login : content.signup} state={authState}>
          {signingUp ? content.logIn : content.createAnAccount}
        </Link>
      </small>
    </form>
  );
}
