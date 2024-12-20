import { FC, useEffect, useRef, useState } from 'react';
import styles from './Editor.module.scss';
import { CodeEditor, Frame,JSONEditor,Stats,ThemeSwitcher,Images} from '../../components';
import classNames from 'classnames';

import { useAppSelector } from '../../store/store';
import { editor, IRange, LS_FONTSIZEKEY, LS_SOURCEHTML,  } from '../../constants';
import { Editor } from '@monaco-editor/react';
interface EditorPageProps {
  className?: string;
}
type frameMode = 'iframe'|'stats'|'images'|'source'
export const EditorPage: FC<EditorPageProps> = () => {
  const { json, source, selection, htmlToSource } = useAppSelector((state) => state.htmlReducer);
  const savedFontSize = Number(localStorage.getItem(LS_FONTSIZEKEY));
  const [fontSize, setFontSize] = useState(savedFontSize || 12);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [editorMode, setEditorMode] = useState(true);
  const [mode, setMode] = useState<frameMode>('stats');

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
     if (ctrlPressed && e.code === 'KeyS') {
 
      e.preventDefault()
   

localStorage.setItem(LS_SOURCEHTML,source)
     
      
    }
     if (ctrlPressed && e.code === 'KeyB') {
 
      e.preventDefault()
const selection = editorRef.current?.getSelection()
     console.log(selection)
      
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
        <ThemeSwitcher/>
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
        <button title='Ctrl+S' onClick={() =>  {
        
           
      localStorage.setItem(LS_SOURCEHTML,source)
      }}>
          Save
        </button>
        <button onClick={() =>  {
        
           
      localStorage.removeItem(LS_SOURCEHTML)
      }}>
          Reset
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.editorContainer}>
          <div className={classNames(styles.CodeEditor)}>
            {editorMode ? (
              <CodeEditor fontSize={fontSize} selection={selection} editorRef={editorRef} />
            ) : (
              <JSONEditor fontSize={fontSize} />
            )}

          </div>
        </div>

        <div className={styles.frameContainer}>
          <div>
          <button onClick={() => setMode('stats')}>
           Stats
          </button>
          <button onClick={() => setMode('iframe')}>
           Preview
          </button>
          <button onClick={() => setMode('images')}>
           Images
          </button>
          <button onClick={() => setMode('source')}>
           Source
          </button></div>
          {mode ==="iframe" && <Frame testData={json} /> }
          {mode==='stats' && <Stats source={source} revealLine={revealLine} />}
          {mode==='images' && <Images />}
          {mode==='source' && <Editor
        theme={'vs-dark'}
        width={'100%'}
        height='100%'
        defaultLanguage='html'
        value={htmlToSource}
        language='html'
        
        onValidate={(e) => {
          console.log('validate', e);
        }}
        options={{
          wordWrap: 'on',
          minimap: { enabled: true, size: 'proportional' },
          fontSize: fontSize,
          readOnly:true
          
        }}
      />}
        </div>
      </div>
    </div>
  );
};
