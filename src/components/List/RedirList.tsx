import classNames from 'classnames';
import { FC } from 'react';

import styles from './List.module.scss';
import { ListItem } from './ListItem';
interface langListProps {
  className?: string;
  regMatches?: Record<string, number>;
  hasDesc?: boolean;
  header?: string;
  bordered?: boolean;
}

export const RedirList: FC<langListProps> = ({ regMatches, hasDesc, header, bordered }) => {
  if (!regMatches || Object.keys(regMatches).length === 0) return <></>;
  return (
    <div className={classNames(styles.List, { [styles.List_additional]: bordered })}>
      <h3 className={styles.header}>{header}</h3>
      <ul>
        {Object.keys(regMatches).map((regexMatch, i) => (
          <ListItem
            key={regexMatch}
            index={i}
            el={regexMatch}
            count={regMatches[regexMatch]}
            hasDesc={hasDesc}
          />
        ))}
      </ul>
    </div>
  );
};
