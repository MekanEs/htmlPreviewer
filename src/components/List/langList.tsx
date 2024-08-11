import { FC } from 'react';
import { RegErrorDesc } from '../../constants';
import styles from './List.module.scss';
interface langListProps {
  className?: string;
  regMatches: Record<string, number>;
  hasDesc?: boolean;
}

export const LangList: FC<langListProps> = ({ regMatches, hasDesc = false }) => {
  return (
    <div className={styles.List}>
      <ul>
        {Object.keys(regMatches).map((el, i) => (
          <li
            key={el}
            className={styles.item}
            style={{ color: regMatches[el] > 0 ? '#760f0f' : 'inherit' }}
            onClick={() => {
              navigator.clipboard.writeText(el.split('/')[1]);
            }}
            title={hasDesc ? RegErrorDesc[i] : undefined}
          >
            {el.split('/')[1] + ':' + regMatches[el]}
          </li>
        ))}
      </ul>
    </div>
  );
};
