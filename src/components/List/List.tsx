import { FC } from 'react';
import styles from './List.module.scss';
import classNames from 'classnames';

interface ListProps {
  className?: string;
  list: Record<string, string[]>;
}

export const List: FC<ListProps> = ({ className, list }) => {
  return (
    <div className={classNames(styles.List, {}, [className])}>
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
                    {el.toString()}
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
