import { FC,  useEffect, useRef, useState } from 'react';
import styles from './CodeEditor.module.scss';
import classNames from 'classnames';
import { Editor, Monaco, OnChange } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import '../../App.css';
import { HTMLOptionsSetter, createRange, verify } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { EditorSelection } from '../../types/types';
import {  themeSwitcher } from '../../utils/themeLoader';



interface CodeEditorProps {
  selection: EditorSelection;
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  fontSize?: number;
}

export const CodeEditor: FC<CodeEditorProps> = ({ selection, editorRef, fontSize = 12 }) => {
  const value = useAppSelector((state) => state.htmlReducer.source);
  const [localSource,setLocalSource]=useState(value)

  const dispatch = useAppDispatch();
  const decorations = useRef<string[] | undefined>([]);
  

  const changeHandler: OnChange = (string) => {
   
    if (string) {
      setLocalSource(string)
     dispatch(htmlActions.setSourceHtml(string));
      dispatch(htmlActions.setCompiledHTMl(string));
     
    }
    
  };
  useEffect(() => {
    if (editorRef.current) {
      const ed = editorRef.current;
      const newDecorations = verify(value);

      decorations.current = ed
        .getModel()
        ?.deltaDecorations(decorations.current || [], newDecorations);
    }
    return () => {
      // editorRef.current?.getModel()?.deltaDecorations(decorations.current || [], newDecorations);
      editorRef.current?.getModel()?.deltaDecorations([], []);
    };
  }, [editorRef, value]);
  useEffect(() => {
    if (editorRef.current) {
      const range = createRange(selection, editorRef.current);
      if (range) {
        editorRef.current.setSelection(range);
        editorRef.current.revealLineInCenter(range.startLineNumber);
      }
    }
  }, [selection, editorRef]);
  const handleMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    HTMLOptionsSetter(monaco);
    themeSwitcher('twilight')
    // MonacoEx(monaco);
  };
  return (
    <div className={classNames(styles.CodeEditor)}>
      <Editor
        theme={'vs-dark'}
        width={'100%'}
        height='100%'
        defaultLanguage='html'
        defaultValue={localSource}
        onChange={changeHandler}
        language='html'
        onMount={handleMount}
        onValidate={(e) => {
          console.log('validate', e);
        }}
        options={{
          wordWrap: 'on',
          minimap: { enabled: true, size: 'proportional' },
          fontSize: fontSize,
        }}
      />
    </div>
  );
};
