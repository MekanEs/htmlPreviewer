import { FC, useCallback, useRef, useState } from 'react';
import styles from './Editor.module.scss';
import { CodeEditor, Frame } from '../../components';
import classNames from 'classnames';

import { str } from '../../constants';

import { editor,IRange } from 'monaco-editor';
import { Stats } from '../../components/Stats/Stats';
import { SelectRange, useDebounce } from '../../utils';
import { JSONEditor2 } from '../../components/JSONEditor/JSONEditor';
interface EditorPageProps {
  className?: string;
}

export const EditorPage: FC<EditorPageProps> = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [text, setText] = useState(str);
  const [testJSON, setTestJSON] = useState(`{
    "locales":{"ru":true}
  }
  `);
  const value = useDebounce(text, 500);
  const [editorMode, setEditorMode] = useState(true);
  const [mode, setMode] = useState(false);
  const [, setParsedJSON] = useState({});
  const [selection, setSelection] = useState({ from: 0, to: 0 });

  const onChangeTest = useCallback((val: string) => {
    setTestJSON(val);
  }, []);
  const changeHandler = (str: string | undefined) => {
    if (str) {
      setText(str);
    }
  };

  const setSel = SelectRange(setSelection);
const revealLine =(line:number,range:IRange)=>{
  editorRef.current?.revealLineInCenter(line)
  editorRef.current?.setSelection(range)
}
  return (
    <>
      <div>
        <button onClick={() => setEditorMode(true)}>Code</button>
        <button onClick={() => setEditorMode(false)}>TestData</button>
      </div>
      <div className={styles.container}>
        <div className={styles.editorContainer}>
          <div className={classNames(styles.CodeEditor)}>
            {editorMode ? (
              <CodeEditor
                onChange={changeHandler}
                selection={selection}
                value={text}
                editorRef={editorRef}
              />
            ) : (
              // <JSONEditor onChange={onChangeTest} setJSON={setParsedJSON} value={testJSON} />
              <JSONEditor2 onChange={onChangeTest} setJSON={setParsedJSON} value={testJSON} />
            )}

            {/* <CodeMirrorEditor onChange={onChange} selection={selection} value={text} /> */}
          </div>
        </div>

        <div className={styles.frameContainer}>
          <button onClick={() => setMode((prev) => !prev)}>
            {mode ? 'show Stats' : 'show Preview'}
          </button>
          {mode ? (
            <Frame source={value} setSelection={setSel} testData={testJSON} />
          ) : (
            <Stats source={text} revealLine={revealLine} />
          )}
        </div>
      </div>
    </>
  );
};
