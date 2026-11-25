import SaveStatus from '../molecules/SaveStatus';
import EditorFormTitle from '../molecules/EditorFormTitle';
import BackToFormsLink from '../molecules/BackToFormsLink';
import { navigation } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import Logo from '../molecules/Logo';
import Badge from '../molecules/Badge';
import ThemeSwitch from '../molecules/ThemeSwitch';
import PreviewDeviceSwitch from '../molecules/PreviewDeviceSwitch';
import ActionButton from '../molecules/ActionButton';
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
      {mode === 'generator' && <BackToFormsLink content={content} />}
      {mode === 'editor' && (
        <div className={styles.headerTitle}>
          <EditorFormTitle content={content} form={form} />
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
            <ActionButton
              onClick={onCreate}
              aria-label={content.createForm}
              icon={content.icons.plus}
              iconSize={18}
            >
              <span className={styles.createLabel}>{content.createForm}</span>
            </ActionButton>
          </>
        )}
        {mode === 'generator' && (
          <span className={styles.generationStep}>{content.step1Of2DescribeYourForm}</span>
        )}
        {mode === 'editor' && (
          <>
            <SaveStatus content={content} saved={saved} />
            <ActionButton
              variant="secondary"
              onClick={onPreview}
              icon={content.icons.eye}
              iconSize={18}
            >
              {content.preview}
            </ActionButton>
            <ActionButton onClick={onPublish} icon={content.icons.send} iconSize={18}>
              {form?.status === 'published' ? content.published : content.publish}
            </ActionButton>
          </>
        )}
        {mode === 'preview' && (
          <>
            <Badge>{content.previewMode}</Badge>

            <ActionButton variant="secondary" onClick={onPreview}>
              {content.exitPreview}
            </ActionButton>
          </>
        )}
      </div>
    </header>
  );
}
