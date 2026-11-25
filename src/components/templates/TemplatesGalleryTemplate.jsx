import TemplatesHeading from '../organisms/TemplatesHeading';
import TemplatesToolbar from '../organisms/TemplatesToolbar';
import WorkspaceLayout from './WorkspaceLayout';
import { uiContent } from '../../content/uiContent';
import TemplateGallery from '../organisms/TemplateGallery';
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
      <WorkspaceLayout
        user={user}
        theme={theme}
        setTheme={setTheme}
        logout={logout}
        onCreate={() => create()}
        className={className}
      >
        <TemplatesHeading content={content} navigate={navigate} />
        <TemplatesToolbar
          content={content}
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
        />
        <TemplateGallery templates={templates} onUse={create} content={uiContent.TemplateGallery} />
        {!templates.length && <p className={styles.notice}>{content.empty}</p>}
      </WorkspaceLayout>
    </>
  );
}
