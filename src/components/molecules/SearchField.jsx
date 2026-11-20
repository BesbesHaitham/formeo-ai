import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';
import styles from './Molecules.module.css';
export default function SearchField({
  content = uiContent.SearchField,
  className,
  placeholder = content.placeholder,
  ...rest
}) {
  return (
    <div className={classNames(styles.search, className)}>
      <Icon name={content.icons.search} size={17} />
      <Input type="search" aria-label={placeholder} placeholder={placeholder} {...rest} />
    </div>
  );
}
