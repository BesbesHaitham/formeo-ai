import { uiContent } from '../../content/uiContent';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Checkbox from '../atoms/Checkbox';
import FormField from '../molecules/FormField';
import PasswordField from '../molecules/PasswordField';
import styles from './Organisms.module.css';
export default function AuthenticationForm({
  content = uiContent.AuthenticationForm,
  signingUp,
  values,
  change,
  error,
  loading,
  submit,
  onForgotPassword,
  onGoogle,
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
      <div className={styles.authFields}>
        {signingUp && (
          <FormField
            id="name"
            label={content.fullName}
            required
            autoComplete="name"
            value={values.name}
            placeholder={content.enterYourFullName}
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
          placeholder={content.youExampleCom}
          onChange={(e) => change('email', e.target.value)}
        />
        <FormField id="password" label={content.password}>
          <PasswordField
            id="password"
            required
            minLength={8}
            autoComplete={signingUp ? 'new-password' : 'current-password'}
            value={values.password}
            placeholder={content.enterYourPassword}
            onChange={(e) => change('password', e.target.value)}
          />
        </FormField>
        {signingUp && (
          <FormField id="confirm" label={content.confirmPassword}>
            <PasswordField
              id="confirm"
              required
              minLength={8}
              autoComplete="new-password"
              value={values.confirm}
              placeholder={content.confirmYourPassword}
              onChange={(e) => change('confirm', e.target.value)}
            />
          </FormField>
        )}
      </div>
      <div className={styles.authMeta}>
        <label>
          <Checkbox
            required={signingUp}
            checked={signingUp ? values.agree : values.remember}
            onChange={(e) => change(signingUp ? 'agree' : 'remember', e.target.checked)}
          />
          {signingUp ? content.iAgreeToTheLocalDemoTermsAnd : content.rememberMe}
        </label>
        {!signingUp && (
          <Button variant="link" size="sm" onClick={onForgotPassword}>
            {content.forgotPassword}
          </Button>
        )}
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <Button type="submit" loading={loading}>
        {signingUp ? content.createAccount : content.logIn}
        <Icon name={content.icons.arrowright} size={17} />
      </Button>
      <div className={styles.or}>{content.orContinueWith}</div>
      <Button variant="secondary" onClick={onGoogle}>
        <strong
          style={{
            color: '#4285f4',
            fontSize: 21,
          }}
        >
          {content.g}
        </strong>
        {content.continueWithGoogle}
      </Button>
      <small>
        {signingUp ? content.alreadyHaveAnAccount : content.newToFormeoAi}
        <Link to={signingUp ? content.login : content.signup}>
          {signingUp ? content.logIn : content.createAnAccount}
        </Link>
      </small>
      <small
        style={{
          fontSize: 11,
        }}
      >
        {content.localDemoAuthenticationNoSecureAccountOrEmail}
      </small>
    </form>
  );
}
