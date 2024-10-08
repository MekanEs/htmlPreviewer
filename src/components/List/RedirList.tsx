import { FC } from 'react';
import { ListItem } from './ListItem';
import styles from './List.module.scss';
import classNames from 'classnames';
interface langListProps {
  className?: string;
  regMatches: Record<string, number>;
  hasDesc?: boolean;
  header?: string;
  bordered?: boolean;
}

export const RedirList: FC<langListProps> = ({ regMatches, hasDesc, header, bordered }) => {
  return (
    <div className={classNames(styles.List, { [styles.List_additional]: bordered })}>
      <h3 className={styles.header}>{header}</h3>
      <ul>
        {Object.keys(regMatches).map((el, i) => (
          <ListItem key={el} index={i} el={el} count={regMatches[el]} hasDesc={hasDesc} />
        ))}
      </ul>
    </div>
  );
};
