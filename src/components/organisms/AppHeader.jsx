import { navigation } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import Logo from '../molecules/Logo';
import Badge from '../molecules/Badge';
import IconButton from '../molecules/IconButton';
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
  onPublish,
  onHelp,
  user,
  saved = true,
  className,
  ...rest
}) {
  return (
    <header
      className={classNames(
        styles.header,
        mode === 'editor' && styles.editorHeader,
        mode === 'generator' && styles.generatorHeader,
        className,
      )}
      {...rest}
    >
      <Logo className={styles.headerLogo} />
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
          <span>{form?.title}</span>
          <Badge variant={form?.status === 'published' ? 'success' : undefined}>
            {form?.status === 'published' ? content.published : content.draft}
          </Badge>
        </div>
      )}
      <div className={styles.headerActions}>
        {mode === 'workspace' && (
          <>
            {user ? (
              <Button variant="ghost" className={styles.accountLink} onClick={onHelp}>
                {user.name}
              </Button>
            ) : (
              <Link className={styles.accountLink} to={content.loginRoute}>
                {content.loginLabel}
              </Link>
            )}
            <Button onClick={onCreate} aria-label={content.createForm}>
              <Icon name={content.icons.plus} size={18} />
              <span className={styles.createLabel}>{content.createForm}</span>
            </Button>
            <IconButton
              icon={content.icons.circlehelp}
              label={content.helpAndSettings}
              variant="secondary"
              onClick={onHelp}
            />
          </>
        )}
        {mode === 'generator' && (
          <>
            <span
              style={{
                color: 'var(--muted)',
                fontSize: 14,
              }}
            >
              {content.step1Of2DescribeYourForm}
            </span>
            <Button variant="secondary" onClick={onHelp}>
              <Icon name={content.icons.circlehelp} size={17} />
              {content.help}
            </Button>
          </>
        )}
        {mode === 'editor' && (
          <>
            <span
              style={{
                color: 'var(--muted)',
                fontSize: 14,
              }}
            >
              <Icon name={content.icons.checkcircle} size={15} /> &nbsp;
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
            <span
              style={{
                color: 'var(--muted)',
              }}
            >
              <Icon name={content.icons.monitor} />
              {content.desktop}
            </span>
            <Button variant="secondary" onClick={onPreview}>
              {content.exitPreview}
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
