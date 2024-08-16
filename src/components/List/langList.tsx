import { FC } from 'react';
import { RegErrorDesc } from '../../constants';
import styles from './List.module.scss';
import classNames from 'classnames';
interface langListProps {
  className?: string;
  regMatches: Record<string, number>;
  hasDesc?: boolean;
}

export const LangList: FC<langListProps> = ({ regMatches, hasDesc = false ,className}) => {
  return (
    <div className={classNames(styles.List,[className])}>
      <ul>
        {Object.keys(regMatches).map((el, i) => (
          <li
            key={el}
            className={styles.item}
            style={{ color: regMatches[el] > 0 ? '#f33535' : 'inherit' }}
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
