/* eslint-disable no-useless-escape */
import React, { FC, useEffect, useState } from 'react';

import { editor } from '../../constants';
import { useAppSelector } from '../../store/store';
import { loadJSONFromLocalStorage } from '../../utils/localStorageUtils';
import { Button } from '../common/Button';

interface ReplaceValue {
  // Определить интерфейс явно
  search: string;
  replace: string;
  isRegexp: boolean;
  isCaseSensitive: boolean;
}
const defaultReplaceValue: ReplaceValue = {
  search: '',
  replace: '',
  isRegexp: false,
  isCaseSensitive: false,
};

export const MultiReplacer: FC<{
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  id: number;
}> = ({ editorRef, id }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const saved = loadJSONFromLocalStorage<ReplaceValue>(`LS_REP_${id}`, defaultReplaceValue);
  const [values, setValues] = useState<ReplaceValue>(saved);
  const [error, setError] = useState('');
  const source = useAppSelector(state => state.htmlReducer.source);
  const [matches, setMatches] = useState<number>(0);
  useEffect(() => {
    setError('');
    if (!values.search) {
      setMatches(0);
      return;
    }

    const flags = values.isCaseSensitive ? 'g' : 'gi';
    if (values.isRegexp) {
      try {
        const regex = new RegExp(values.search, flags);

        const foundMatches = [...source.matchAll(regex)];
        setMatches(foundMatches.length);
      } catch (e) {
        if (e !== undefined && e !== null) {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          setError(e.toString());
        }
      }
    } else {
      const regex = new RegExp(values.search.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&'), flags);
      const matchArray = [...source.matchAll(regex)];
      setMatches(matchArray.length);
    }

    localStorage.setItem(`LS_REP_${id}`, JSON.stringify(values));
  }, [values, source, id]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: '6px 12px', border: '1px solid white', width: '100%' }}>
        <div>
          <label>
            Поиск:
            <input
              type="text"
              onChange={e => {
                setValues({ ...values, search: e.target.value });
              }}
              value={values.search}
            />
          </label>

          <label>
            Замена:
            <input
              onChange={e => {
                setValues({ ...values, replace: e.target.value });
              }}
              type="text"
              value={values.replace}
            />
          </label>
        </div>
        <div>
          <label style={{ padding: '6px' }}>
            _*:
            <input
              type="checkbox"
              checked={values.isRegexp}
              onChange={e => {
                setValues({ ...values, isRegexp: e.target.checked });
              }}
            />
          </label>

          <label style={{ padding: '6px' }}>
            Aa:
            <input
              type="checkbox"
              checked={values.isCaseSensitive}
              onChange={e => setValues({ ...values, isCaseSensitive: e.target.checked })}
            />
          </label>
        </div>
        <Button
          onClick={() => {
            if (editorRef.current) {
              console.log(editorRef.current.getSupportedActions());
              editorRef.current.trigger('keyboard', 'editor.actions.findWithArgs', {
                searchString: values.search,
                replaceString: values.replace,
                isRegex: values.isRegexp,
                isCaseSensitive: values.isCaseSensitive,
              });
            }
          }}
        >
          Trigger
        </Button>
        <Button
          onClick={() => {
            setValues({
              search: '',
              replace: '',
              isRegexp: false,
              isCaseSensitive: false,
            });
            localStorage.setItem(
              `LS_REP_${id}`,
              JSON.stringify({
                search: '',
                replace: '',
                isRegexp: false,
                isCaseSensitive: false,
              })
            );
          }}
        >
          Clear
        </Button>
        <div>
          match count: <b style={{ color: 'red' }}>{matches}</b>
        </div>
        <span>{error}</span>
      </div>
    </div>
  );
};
