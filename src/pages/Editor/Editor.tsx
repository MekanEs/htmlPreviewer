import { FC, useEffect, useRef, useState } from 'react';
import styles from './Editor.module.scss';
import { CodeEditor, Frame } from '../../components';
import classNames from 'classnames';

import { editor, IRange } from 'monaco-editor';
import { Stats } from '../../components/Stats/Stats';
import { JSONEditor } from '../../components/JSONEditor/JSONEditor';
import { useAppSelector } from '../../store/store';
import { LS_FONTSIZEKEY } from '../../constants';
interface EditorPageProps {
  className?: string;
}

export const EditorPage: FC<EditorPageProps> = () => {
  const { json, source, selection } = useAppSelector((state) => state.htmlReducer);
  const savedFontSize = Number(localStorage.getItem(LS_FONTSIZEKEY));
  const [fontSize, setFontSize] = useState(savedFontSize || 12);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [editorMode, setEditorMode] = useState(true);
  const [mode, setMode] = useState(false);

  const [ctrlPressed, setctrlPressed] = useState(false);

  const revealLine = (line: number, range: IRange) => {
    editorRef.current?.revealLineInCenter(line);
    editorRef.current?.setSelection(range);
  };
  const onKeyCtrlPressed = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setctrlPressed(true);
    }
    if (ctrlPressed && e.key === 'Alt') {
      setEditorMode((prev) => !prev);
    }
  };
  const onKeyCtrlUp = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setctrlPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onKeyCtrlPressed);
    window.addEventListener('keyup', onKeyCtrlUp);
    return () => {
      window.removeEventListener('keydown', onKeyCtrlPressed);
      window.removeEventListener('keyup', onKeyCtrlUp);
    };
  });

  return (
    <div>
      <div>
        <button title='Ctrl+Alt' onClick={() => setEditorMode(true)}>
          Code
        </button>
        <button title='Ctrl+Alt' onClick={() => setEditorMode(false)}>
          TestData
        </button>
        <input
          style={{ width: '40px' }}
          onChange={(e) => {
            const value = e.target.value;
            localStorage.setItem(LS_FONTSIZEKEY, value);
            setFontSize(Number(value));
          }}
          value={fontSize}
          type='number'
          title={'editor font size'}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.editorContainer}>
          <div className={classNames(styles.CodeEditor)}>
            {editorMode ? (
              <CodeEditor fontSize={fontSize} selection={selection} editorRef={editorRef} />
            ) : (
              // <JSONEditor onChange={onChangeTest} setJSON={setParsedJSON} value={testJSON} />
              <JSONEditor />
            )}

            {/* <CodeMirrorEditor onChange={onChange} selection={selection} value={text} /> */}
          </div>
        </div>

        <div className={styles.frameContainer}>
          <button onClick={() => setMode((prev) => !prev)}>
            {mode ? 'show Stats' : 'show Preview'}
          </button>
          {mode ? <Frame testData={json} /> : <Stats source={source} revealLine={revealLine} />}
        </div>
      </div>
    </div>
  );
};
