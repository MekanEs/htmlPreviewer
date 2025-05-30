import { FC } from 'react';

import { RegErrorDesc } from '../../constants';

import styles from './List.module.scss';

interface ListItemProps {
  className?: string;
  el: string;
  count: number;
  hasDesc?: boolean;
  index: number;
}

export const ListItem: FC<ListItemProps> = ({ index, el, count, hasDesc }) => {
  return (
    <li
      key={el}
      className={styles.item}
      onClick={() => {
        navigator.clipboard.writeText(el);
      }}
      title={hasDesc ? RegErrorDesc[index] : undefined}
    >
      <span>{el}: </span>
      <span className={styles.count}>{count}</span>
    </li>
  );
};
