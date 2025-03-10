import { Editor, OnChange, OnMount, OnValidate } from '@monaco-editor/react';
import classNames from 'classnames';
import { FC, useCallback, useEffect, useRef } from 'react';

import '../../App.scss';
import { editor as editorNS, LS_MONACOTHEME } from '../../constants';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { EditorSelection } from '../../types/types';
import { themeSwitcher } from '../../utils';
import { HTMLOptionsSetter, createRange, validateCSSInStyleAttributes, verify } from '../../utils';
import { CustomValidation } from '../../utils';

import styles from './CodeEditor.module.scss';

interface CodeEditorProps {
  selection: EditorSelection;
  editorRef: React.MutableRefObject<editorNS.IStandaloneCodeEditor | null>;
}
const runValidation = (model: editorNS.ITextModel) => {
  validateCSSInStyleAttributes(model);
  CustomValidation(model);
  verify(model);
};
export const CodeEditor: FC<CodeEditorProps> = ({ selection, editorRef }) => {
  const value = useAppSelector(state => state.htmlReducer.source);
  const { fontSize, miniMap } = useAppSelector(state => state.optionsReducer);
  const dispatch = useAppDispatch();
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  const changeHandler: OnChange = useCallback(
    string => {
      if (string !== undefined) {
        // Clear any existing timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        // Set a new timer
        debounceTimerRef.current = setTimeout(() => {
          dispatch(htmlActions.setSourceHtml(string));

          if (editorRef.current) {
            const ed = editorRef.current;
            const model = ed.getModel();

            if (!model) return;
            runValidation(model);
          }
        }, 200); // 300ms debounce delay
      }
    },
    [dispatch, editorRef]
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
    if (!model) return;
    runValidation(model);
  };
  const handleValidate: OnValidate = markers => {
    const newMarkers: Omit<editorNS.IMarker, 'resource'>[] = markers.map(marker => {
      const newEl: Omit<editorNS.IMarker, 'resource'> & { resource?: object } =
        structuredClone(marker);
      delete newEl.resource;
      return newEl;
    });
    dispatch(htmlActions.setMarkers(newMarkers));
  };

  return (
    <div className={classNames(styles.CodeEditor)}>
      <Editor
        theme={'vs-dark'}
        width={'100%'}
        height="100%"
        defaultLanguage="html"
        defaultValue={value}
        onChange={changeHandler}
        language="html"
        onMount={handleMount}
        onValidate={handleValidate}
        options={{
          wordWrap: 'on',
          minimap: { enabled: miniMap.enabled, size: 'proportional' as const },
          fontSize,
        }}
      />
    </div>
  );
};
