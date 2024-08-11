import { FC } from 'react';
import { ListItem } from './ListItem';
import styles from './List.module.scss';
interface langListProps {
  className?: string;
  regMatches: Record<string, number>;
  hasDesc?: boolean;
  header?: string;
}

export const RedirList: FC<langListProps> = ({ regMatches, hasDesc, header }) => {
  return (
    <div className={styles.List}>
      <h3>{header}</h3>
      <ul>
        {Object.keys(regMatches).map((el, i) => (
          <ListItem key={el} index={i} el={el} count={regMatches[el]} hasDesc={hasDesc} />
        ))}
      </ul>
    </div>
  );
};
