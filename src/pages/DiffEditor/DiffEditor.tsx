import { DiffEditor } from '@monaco-editor/react';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Frame } from '../../components';
import { Button } from '../../components/common/Button';
import { WindowPortal } from '../../components/windowPortal/WindowPortal';
import { editor as editorNS, LS_MONACOTHEME } from '../../constants';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { EditorSelection } from '../../types/types';
import { changeLocaleInJSON, compileHandlebars, themeSwitcher } from '../../utils';
import { createRangeDiff } from '../../utils/dom/createRange';

import styles from './DiffEditor.module.scss';

export const DiffEditorComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { source, json, langs, selection } = useAppSelector(state => state.htmlReducer);
  const [languages, setLanguages] = useState({ first: 'ru', second: 'en' });
  const [sources, setSources] = useState({ first: '', second: '' });
  const [mode, setMode] = useState(false);
  const [showWindowPortal, setShowWindowPortal] = useState(false);
  const editorRef = useRef<editorNS.IStandaloneDiffEditor | null>(null);
  const nav = useNavigate();
  useEffect(() => {
    const firstSource = compileHandlebars(source, changeLocaleInJSON(json, languages.first), false);
    const secondSource = compileHandlebars(
      source,
      changeLocaleInJSON(json, languages.second),
      false
    );
    setSources({ first: firstSource, second: secondSource });
  }, [languages, json, source]);
  const handleMount = (editor: editorNS.IStandaloneDiffEditor) => {
    editorRef.current = editor;
    const savedTheme = localStorage.getItem(LS_MONACOTHEME);
    if (savedTheme) {
      themeSwitcher(savedTheme);
    } else {
      localStorage.setItem(LS_MONACOTHEME, 'all-hallows-eve');
      themeSwitcher('all-hallows-eve');
    }
  };
  const setSelection = useCallback(
    (selection: EditorSelection) => {
      dispatch(htmlActions.setSelection(selection));
    },
    [dispatch]
  );
  useEffect(() => {
    if (editorRef.current) {
      const range = createRangeDiff(selection, editorRef.current);
      if (range) {
        editorRef.current.getModifiedEditor()?.setSelection(range);
        editorRef.current
          .getModifiedEditor()
          ?.revealRangeInCenter(range, editorNS.ScrollType.Smooth);
      }
    }
  }, [selection, editorRef]);
  return (
    <div className={styles.editorContainer}>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            nav('/');
          }}
        >
          editor
        </Button>
        <Button
          onClick={() => {
            setMode(prev => !prev);
          }}
        >
          mode
        </Button>
        <Button
          onClick={() => {
            setShowWindowPortal(prev => !prev);
          }}
        >
          {showWindowPortal ? 'Close Portal' : 'Show in Portal'}
        </Button>
        <div className={styles.selectContainer}>
          <select
            onChange={e => {
              setLanguages({ ...languages, first: e.target.value });
            }}
            name="lang1"
            id=""
            value={languages.first}
          >
            {langs.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>

          <select
            onChange={e => {
              setLanguages({ ...languages, second: e.target.value });
            }}
            name="lang2"
            id=""
            value={languages.second}
          >
            {langs.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.editor}>
        <DiffEditor
          onMount={handleMount}
          // className={styles.editor}
          original={sources.first}
          modified={sources.second}
          language="html"
          keepCurrentOriginalModel={true}
          options={{
            inDiffEditor: true,
            diffWordWrap: mode ? 'on' : 'off',
          }}
        />
        {showWindowPortal && (
          <WindowPortal>
            <Frame
              source={sources.second}
              testData={changeLocaleInJSON(json, languages.second)}
              setSelection={setSelection}
            />
          </WindowPortal>
        )}
      </div>
    </div>
  );
};
