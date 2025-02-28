import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import { RegErrorDesc } from '../../constants';

import styles from './List.module.scss';
interface LangListProps {
  className?: string;
  regMatches?: Record<string, number>;
  hasDesc?: boolean;
}

export const LangList: FC<LangListProps> = ({ regMatches, hasDesc = false, className }) => {
  const [showMode, setShowMode] = useState<{ mode: boolean }>(
    () =>
      JSON.parse(localStorage.getItem('regErrorMode') ?? JSON.stringify({ mode: false })) as {
        mode: boolean;
      }
  );

  useEffect(() => {
    localStorage.setItem('regErrorMode', JSON.stringify(showMode));
  }, [showMode]);

  const toggleShowMode = () => {
    setShowMode(prev => ({ mode: !prev.mode }));
  };
  if (!regMatches) return <></>;
  return (
    <div className={classNames(styles.List, className)}>
      {hasDesc && (
        <button
          className="btn"
          style={{ width: '100%', display: hasDesc ? 'inherit' : 'none' }}
          onClick={toggleShowMode}
        >
          {showMode.mode ? 'show regexp' : 'show description'}
        </button>
      )}
      <ul>
        {Object.keys(regMatches).map((regexMatch, i) => {
          const splittedRegEx = regexMatch.split('/')[1] || regexMatch;
          const displayText = hasDesc && showMode.mode ? RegErrorDesc[i] : splittedRegEx;
          return (
            <li
              key={regexMatch}
              className={classNames(styles.item, { [styles.count]: regMatches[regexMatch] > 0 })}
              onClick={() => {
                navigator.clipboard.writeText(splittedRegEx);
              }}
              title={hasDesc ? RegErrorDesc[i] : undefined}
            >
              {`${displayText}: ${regMatches[regexMatch]}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
