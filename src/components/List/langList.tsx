import { FC, useState } from 'react';
import { RegErrorDesc } from '../../constants';
import styles from './List.module.scss';
import classNames from 'classnames';
interface langListProps {
  className?: string;
  regMatches: Record<string, number>;
  hasDesc?: boolean;
}

export const LangList: FC<langListProps> = ({ regMatches, hasDesc = false, className }) => {
  const savedValue:{mode:boolean} = JSON.parse(localStorage.getItem('regErrorMode')||JSON.stringify({ mode: false }));
  const [showMode, setShowMode] = useState(savedValue );
  return (
    <div className={classNames(styles.List, [className])}>
      {hasDesc && (
        <button
          style={{ width: '100%' }}
          onClick={() => {
            setShowMode((prev) => {
              localStorage.setItem('regErrorMode', JSON.stringify({ mode: !prev.mode }));
              return { mode: !prev.mode };
            });
          }}
        >
          {showMode.mode ? 'show regexp' : 'show description'}
        </button>
      )}
      <ul>
        {Object.keys(regMatches).map((el, i) => (
          <li
            key={el}
            className={styles.item}
            style={{ color: regMatches[el] > 0 ? '#f33535' : 'inherit' }}
            onClick={() => {
              navigator.clipboard.writeText(el.split('/')[1] || el);
            }}
            title={hasDesc ? RegErrorDesc[i] : undefined}
          >
            {(hasDesc && showMode.mode ? RegErrorDesc[i] : el.split('/')[1] || el) +
              ':' +
              regMatches[el]}
          </li>
        ))}
      </ul>
    </div>
  );
};
