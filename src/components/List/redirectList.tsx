import { FC } from 'react';
import styles from './List.module.scss';
import classNames from 'classnames';

interface RedirectListProps {
  className?: string;
  list: string[];
}

export const RedirectList: FC<RedirectListProps> = ({ className, list }) => {
  return (
    <div className={classNames(styles.List, {}, [className])}>
      <h3>Redirect List</h3>
      <ul>
        {list.map((el) => {
          return (
            <li
              key={el}
              className={styles.item}
              onClick={() => {
                navigator.clipboard.writeText(el);
              }}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
