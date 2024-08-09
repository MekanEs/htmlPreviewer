import { FC, useCallback, useEffect, useRef, useState } from 'react';
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
const [ctrlPressed,setctrlPressed]=useState(false)
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
const onKeyCtrlPressed = (e:KeyboardEvent)=>{
  if(e.key==='Control'){
    setctrlPressed(true)
  }
if(ctrlPressed && e.key === 'Alt'){
setEditorMode(prev=>!prev)
}
}
const onKeyCtrlUp = (e:KeyboardEvent)=>{
  if(e.key==='Control'){
    setctrlPressed(false)
  }
}
useEffect(()=>{
window.addEventListener('keydown',onKeyCtrlPressed)
window.addEventListener('keyup',onKeyCtrlUp)
return ()=>{
  window.removeEventListener('keydown',onKeyCtrlPressed)
  window.removeEventListener('keyup',onKeyCtrlUp)
}
})

  return (
    <div >
      <div>
        <button title='Ctrl+Alt' onClick={() => setEditorMode(true)}>Code</button>
        <button title='Ctrl+Alt' onClick={() => setEditorMode(false)}>TestData</button>
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
    </div>
  );
};
