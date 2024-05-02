import { FC } from 'react';
import styles from './List.module.scss';
import classNames from 'classnames';

interface ListProps {
  className?: string;
  list: Record<string, string[]>;
  name: string;
}

export const List: FC<ListProps> = ({ className, list, name }) => {
  return (
    <div className={classNames(styles.List, {}, [className])}>
      <h2>{name}</h2>
      {Object.keys(list).map((key) => {
        return (
          <div key={key}>
            <h3>{key}</h3>
            <ul>
              {list[key].map((el) => {
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
      })}
    </div>
  );
};
