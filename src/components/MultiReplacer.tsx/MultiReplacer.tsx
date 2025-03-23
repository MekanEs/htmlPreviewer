import React, { FC, useEffect, useState } from 'react';

import { editor } from '../../constants';
import { useAppSelector } from '../../store/store';
import { Button } from '../common/Button';
interface ReplaceValue {
  search: string;
  replace: string;
  isRegexp: boolean;
}
export const MultiReplacer: FC<{
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  id: number;
}> = ({ editorRef, id }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const saved = JSON.parse(localStorage?.getItem(`LS_REP_${id}`) ?? 'null');
  const [values, setValues] = useState<ReplaceValue>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    saved === null ? { search: '', replace: '' } : saved
  );
  const [error, setError] = useState('');
  const source = useAppSelector(state => state.htmlReducer.source);
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  useEffect(() => {
    setError('');
    if (values.search !== '') {
      try {
        if (values.isRegexp) {
          const foundMatches = source.match(new RegExp(values.search, 'gi'));
          setMatches(foundMatches);
        } else {
          setMatches(source.match(new RegExp(values.search, 'gi')));
        }
      } catch (e) {
        if (e !== undefined && e !== null) {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          setError(e.toString());
        }
      }
    }
    localStorage.setItem(`LS_REP_${id}`, JSON.stringify(values));
  }, [values, source, id]);
  return (
    <div>
      <div style={{ padding: '6px 12px', border: '1px solid white' }}>
        <input
          onChange={e => {
            setValues({ ...values, search: e.target.value });
          }}
          type="text"
          value={values.search}
        />
        <input
          onChange={e => {
            setValues({ ...values, replace: e.target.value });
          }}
          type="text"
          value={values.replace}
        />
        <input
          type="checkbox"
          checked={values.isRegexp}
          onChange={e => {
            setValues({ ...values, isRegexp: e.target.checked });
          }}
        />
        <Button
          onClick={() => {
            if (editorRef.current) {
              console.log(editorRef.current.getSupportedActions());
              editorRef.current.trigger('keyboard', 'editor.actions.findWithArgs', {
                searchString: values.search,
                replaceString: values.replace,
                isRegex: values.isRegexp,
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
            });
          }}
        >
          Clear
        </Button>
        <div>match count: {matches?.length ?? 0}</div>
        <span>{error}</span>
      </div>
    </div>
  );
};
