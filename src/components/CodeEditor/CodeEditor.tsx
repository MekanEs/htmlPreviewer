import { FC,  useCallback,  useEffect, useMemo, useRef } from 'react';
import styles from './CodeEditor.module.scss';
import classNames from 'classnames';
import { Editor, Monaco, OnChange } from '@monaco-editor/react';
import '../../App.css';
import { HTMLOptionsSetter, createRange, verify } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { EditorSelection } from '../../types/types';
import {  themeSwitcher } from '../../utils';
import { editor as editorNS, LS_MONACOTHEME } from '../../constants';
import { validateCSSInStyleAttributes } from '../../utils/cssValidation';



interface CodeEditorProps {
  selection: EditorSelection;
  editorRef: React.MutableRefObject<editorNS.IStandaloneCodeEditor | null>;
  fontSize?: number;
}

export const CodeEditor: FC<CodeEditorProps> = ({ selection, editorRef, fontSize = 12 }) => {
  const value = useAppSelector((state) => state.htmlReducer.source);

  const dispatch = useAppDispatch();
  const decorations = useRef<string[] | undefined>([]);
  

 const changeHandler: OnChange = useCallback((string) => {
  if (string !== undefined) {
    dispatch(htmlActions.setSourceHtml(string));
    dispatch(htmlActions.setCompiledHTMl(string));
  }

 if (editorRef.current) {
      const ed = editorRef.current;
const model = ed.getModel();
if(!model){
  return
}
validateCSSInStyleAttributes(model)
}





}, [dispatch,editorRef]);


  useEffect(() => {
    if (editorRef.current) {
      const ed = editorRef.current;

      decorations.current = ed
        .getModel()
        ?.deltaDecorations(decorations.current||[] , verify(value));
    }
    return () => {
      // editorRef.current?.getModel()?.deltaDecorations(decorations.current || [], verify(value));
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
const handleMount = useCallback((editor: editorNS.IStandaloneCodeEditor, monaco: Monaco) => {
  editorRef.current = editor;
  HTMLOptionsSetter(monaco);

  const savedTheme = localStorage.getItem(LS_MONACOTHEME) ?? 'all-hallows-eve';
  localStorage.setItem(LS_MONACOTHEME, savedTheme);
  themeSwitcher(savedTheme);



   
const model = editor.getModel();
if(!model){
  return
}
    validateCSSInStyleAttributes(model)

    model.deltaDecorations(decorations.current||[] , verify(value));
  
}, [editorRef,value]);
const editorOptions = useMemo(() => ({
  wordWrap: 'on' as const,
  minimap: { enabled: true, size: 'proportional'as const },
  verify:true,
  fontSize
}), [fontSize]);
  return (
    <div className={classNames(styles.CodeEditor)}>
    
      <Editor
        theme={'vs-dark'}
        width={'100%'}
        height='100%'
        defaultLanguage='html'
        defaultValue={value}
        onChange={changeHandler}
        language='html'
        onMount={handleMount}
        onValidate={(e) => {
          console.log('validate', e);
        }}
        options={editorOptions}
      />
    </div>
  );
};
