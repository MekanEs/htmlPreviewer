import { FC, useEffect, useRef } from 'react';
import styles from './CodeEditor.module.scss';
import classNames from 'classnames';
import { Editor, Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import '../../App.css';
import { HTMLOptionsSetter, createRange, verify } from '../../utils';

interface CodeEditorProps {
  onChange: (str: string) => void;
  value: string;
  selection: {
    from: number;
    to: number;
  };
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

// languages.html.htmlDefaults.setOptions({
//   format: {
//     contentUnformatted: 'pre,code,textarea,style',
//     endWithNewline: false,
//     extraLiners: 'head, body, /html',
//     indentHandlebars: false,
//     indentInnerHtml: false,
//     insertSpaces: false,
//     maxPreserveNewLines: undefined,
//     preserveNewLines: false,
//     tabSize: 4,
//     unformatted: 'pre,code,textarea,style',
//     wrapAttributes: 'auto',
//     wrapLineLength: 120,
//   },
// });

export const CodeEditor: FC<CodeEditorProps> = ({ onChange, value, selection, editorRef }) => {
  const decorations = useRef<string[] | undefined>([]);
  const changeHandler = (str: string | undefined) => {
    if (str) onChange(str);
  };

  useEffect(() => {
    const newDecorations = verify(value);
    if (editorRef.current) {
      const ed = editorRef.current;
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
  };
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
        options={{
          wordWrap: 'on',
          minimap: { enabled: true, size: 'proportional' },
        }}
      />
    </div>
  );
};
