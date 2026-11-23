import { navigation } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import Logo from '../molecules/Logo';
import Badge from '../molecules/Badge';
import ThemeSwitch from '../molecules/ThemeSwitch';
import PreviewDeviceSwitch from '../molecules/PreviewDeviceSwitch';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Organisms.module.css';

export default function AppHeader({
  items = navigation,
  content = uiContent.AppHeader,
  mode = 'workspace',
  form,
  onCreate,
  onPreview,
  previewDevice,
  onPreviewDevice,
  onPublish,
  user,
  account,
  theme,
  onTheme,
  saved = true,
  className,
  ...rest
}) {
  return (
    <header
      className={classNames(
        styles.header,
        mode === 'editor' && styles.editorHeader,
        mode === 'preview' && styles.previewHeader,
        mode === 'generator' && styles.generatorHeader,
        className,
      )}
      {...rest}
    >
      <Logo className={styles.headerLogo} />
      {mode === 'preview' && onPreviewDevice && (
        <PreviewDeviceSwitch
          value={previewDevice}
          onChange={onPreviewDevice}
          className={styles.previewDevices}
        />
      )}
      {mode === 'workspace' && (
        <nav className={styles.workspaceNav} aria-label={content.mainNavigation}>
          {items.map(({ to, label, end }) => (
            <NavLink
              end={end}
              key={to}
              to={to}
              className={({ isActive }) => classNames(styles.navLink, isActive && styles.active)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
      {mode === 'generator' && (
        <Link to="/" className={styles.headerTitle}>
          <Icon name={content.icons.arrowleft} />
          {content.backToForms}
        </Link>
      )}
      {mode === 'editor' && (
        <div className={styles.headerTitle}>
          <Link to="/" aria-label={content.backToForms} className={styles.editorBack}>
            <Icon name={content.icons.arrowleft} />
          </Link>
          <Icon name={content.icons.filetext} />
          <h1>{form?.title}</h1>
          <Badge variant={form?.status === 'published' ? 'success' : 'neutral'}>
            {form?.status === 'published' ? content.published : content.draft}
          </Badge>
        </div>
      )}
      <div className={styles.headerActions}>
        {onTheme && <ThemeSwitch theme={theme} onChange={onTheme} />}
        {mode === 'workspace' && (
          <>
            {user ? (
              <div className={styles.mobileAccount}>{account}</div>
            ) : (
              <Link className={styles.accountLink} to={content.loginRoute}>
                {content.loginLabel}
              </Link>
            )}
            <Button onClick={onCreate} aria-label={content.createForm}>
              <Icon name={content.icons.plus} size={18} />
              <span className={styles.createLabel}>{content.createForm}</span>
            </Button>
          </>
        )}
        {mode === 'generator' && (
          <span style={{ color: 'var(--muted)', fontSize: 14 }}>
            {content.step1Of2DescribeYourForm}
          </span>
        )}
        {mode === 'editor' && (
          <>
            <span className={styles.saveStatus}>
              <Icon name={saved ? content.icons.checkcircle : 'CircleAlert'} size={16} />
              <span role="status">
                {saved ? content.allChangesSaved : content.savingUnavailable}
              </span>
            </span>
            <Button variant="secondary" onClick={onPreview}>
              <Icon name={content.icons.eye} size={18} />
              {content.preview}
            </Button>
            <Button onClick={onPublish}>
              <Icon name={content.icons.send} size={18} />
              {form?.status === 'published' ? content.published : content.publish}
            </Button>
          </>
        )}
        {mode === 'preview' && (
          <>
            <Badge>{content.previewMode}</Badge>

            <Button variant="secondary" onClick={onPreview}>
              {content.exitPreview}
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
