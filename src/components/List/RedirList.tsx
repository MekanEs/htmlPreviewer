import { FC } from 'react';
import styles from './List.module.scss';
interface langListProps {
  className?: string;
  regMatches: Record<string, number>;
  hasDesc?: boolean;
}

export const RedirList: FC<langListProps> = ({ regMatches }) => {
  return (
    <div>
      <ul>
        {Object.keys(regMatches).map((el) => (
          <li
            key={el}
            className={styles.item}
            onClick={() => {
              navigator.clipboard.writeText(el);
            }}>
            {el + ': ' + regMatches[el]}
          </li>
        ))}
      </ul>
    </div>
  );
};
