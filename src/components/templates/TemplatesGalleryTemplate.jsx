import { templateCategories } from '../../content/navigation';
import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import AppHeader from '../organisms/AppHeader';
import Sidebar from '../organisms/Sidebar';
import AccountMenu from '../organisms/AccountMenu';
import TemplateGallery from '../organisms/TemplateGallery';
import SearchField from '../molecules/SearchField';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Templates.module.css';

export default function TemplatesGalleryTemplate({
  content = uiContent.TemplatesGalleryTemplate,
  templates,
  query,
  setQuery,
  category,
  setCategory,
  create,
  navigate,
  theme,
  setTheme,
  logout,
  user,
  className,
}) {
  return (
    <>
      <AppHeader
        user={user}
        onCreate={() => create()}
        theme={theme}
        onTheme={setTheme}
        account={user && <AccountMenu name={user.name || user.email} compact onLogout={logout} />}
        content={uiContent.AppHeader}
      />
      <div className={styles.workspace}>
        <Sidebar
          account={
            user && (
              <AccountMenu name={user.name || user.email} email={user.email} onLogout={logout} />
            )
          }
          content={uiContent.Sidebar}
        />
        <main id="main-content" tabIndex={-1} className={classNames(styles.main, className)}>
          <div className={styles.titleRow}>
            <div>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p className={styles.subtitle}>{content.description}</p>
            </div>
            <Button size="lg" onClick={() => navigate('/generate')}>
              <Icon name="Sparkles" />
              {content.generateWithAi}
            </Button>
          </div>
          <div className={classNames(styles.toolbar, styles.galleryToolbar)}>
            <div className={styles.filters}>
              {templateCategories.map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant="secondary"
                  className={category === item ? styles.selected : ''}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
            <SearchField
              placeholder={content.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              content={uiContent.SearchField}
            />
          </div>
          <TemplateGallery
            templates={templates}
            onUse={create}
            content={uiContent.TemplateGallery}
          />
          {!templates.length && <p className={styles.notice}>{content.empty}</p>}
        </main>
      </div>
    </>
  );
}
