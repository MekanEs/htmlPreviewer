import React, { FC, useEffect, useState } from 'react';

import { editor } from '../../constants';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { useAppDispatch, useAppSelector } from '../../store/store';
interface ReplaceValue {
  search: string;
  replace: string;
}
export const MultiReplacer: FC<{
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  id: number;
}> = ({ editorRef, id }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const saved = JSON.parse(localStorage?.getItem(`LS_REP_${id}`) ?? 'null');
  console.log(saved);
  const [values, setValues] = useState<ReplaceValue>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    saved === null ? { search: '', replace: '' } : saved
  );
  const source = useAppSelector(state => state.htmlReducer.source);
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (values.search !== '') {
      const foundMatches = source.match(new RegExp(values.search, 'g'));
      setMatches(foundMatches);
    }
    localStorage.setItem(`LS_REP_${id}`, JSON.stringify(values));
  }, [values, source, id]);
  return (
    <div>
      <div>
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
        <button
          onClick={() => {
            console.log('click');
            const newSource = matches?.reduce((acc, el) => {
              acc = acc.replace(el, values.replace);
              return acc;
            }, source);
            console.log(newSource);
            dispatch(htmlActions.setSourceHtml(newSource));
            if (editorRef.current) {
              editorRef.current.getModel()?.setValue(newSource ?? source);
            }
          }}
        >
          Replace
        </button>
        <button
          onClick={() => {
            setValues({
              search: '',
              replace: '',
            });
          }}
        >
          Clear
        </button>
        <div>match count: {matches?.length ?? 0}</div>
      </div>
    </div>
  );
};
