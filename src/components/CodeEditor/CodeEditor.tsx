import { FC, useCallback, useEffect, useMemo, } from 'react';
import styles from './CodeEditor.module.scss';
import classNames from 'classnames';
import { Editor, OnChange, OnMount, OnValidate } from '@monaco-editor/react';
import '../../App.scss';
import { HTMLOptionsSetter, createRange, validateCSSInStyleAttributes, verify } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { EditorSelection } from '../../types/types';
import { themeSwitcher } from '../../utils';
import { editor as editorNS, } from '../../constants';
import { CustomValidation } from '../../utils';
import { LS_MONACOTHEME } from '../../constants/localStorage';



interface CodeEditorProps {
  selection: EditorSelection;
  editorRef: React.MutableRefObject<editorNS.IStandaloneCodeEditor | null>;
}

export const CodeEditor: FC<CodeEditorProps> = ({ selection, editorRef, }) => {
  const value = useAppSelector((state) => state.htmlReducer.source);
  const { fontSize, miniMap } = useAppSelector((state) => state.optionsReducer);
  const dispatch = useAppDispatch();

  const changeHandler: OnChange = useCallback((string,) => {
    if (string !== undefined) {
      dispatch(htmlActions.setSourceHtml(string));
      dispatch(htmlActions.setCompiledHTMl(string));
    }
    if (editorRef.current) {
      const ed = editorRef.current;
      const model = ed.getModel();

      if (!model) return
      validateCSSInStyleAttributes(model)
      CustomValidation(model)
      verify(model)
    }
  }, [dispatch, editorRef]);


  useEffect(() => {
    if (editorRef.current) {
      const range = createRange(selection, editorRef.current);
      if (range) {
        editorRef.current.setSelection(range);
        editorRef.current?.revealRangeInCenter(range, editorNS.ScrollType.Smooth);
      }
    }
  }, [selection, editorRef]);
  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    HTMLOptionsSetter(monaco);
    const savedTheme = localStorage.getItem(LS_MONACOTHEME) ?? 'all-hallows-eve';
    localStorage.setItem(LS_MONACOTHEME, savedTheme);
    themeSwitcher(savedTheme);
    const model = editor.getModel();
    if (!model) return
    validateCSSInStyleAttributes(model)
    CustomValidation(model)
    verify(model)
  }
  const handleValidate: OnValidate = (markers) => {
    const newMarkers: Omit<editorNS.IMarker, 'resource'>[] = markers.map((marker) => {
      const newEl: Omit<editorNS.IMarker, 'resource'> & { resource?: object } = structuredClone(marker)
      delete newEl.resource
      return newEl
    })
    dispatch(htmlActions.setMarkers(newMarkers))
  }
  const editorOptions: editorNS.IStandaloneEditorConstructionOptions = useMemo(() => ({
    wordWrap: 'on',
    minimap: { enabled: miniMap.enabled, size: 'proportional' as const },
    verify: true,
    fontSize
  }), [fontSize, miniMap]);
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
        onValidate={handleValidate}
        options={editorOptions}
      />
    </div>
  );
};
