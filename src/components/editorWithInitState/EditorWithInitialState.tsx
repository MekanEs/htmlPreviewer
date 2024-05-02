import { EditorSelection, useCodeMirror, EditorView, keymap } from '@uiw/react-codemirror';
import { copilot } from '@uiw/codemirror-theme-copilot';
import { htmlLanguage } from '@codemirror/lang-html';
import { FC, useEffect, useRef } from 'react';
import { historyField } from '@codemirror/commands';
import { lintKeymap, lintGutter } from '@codemirror/lint';
type EditorProps = {
  onChange: (val: string) => void;
  value: string;
  selection: {
    from: number;
    to: number;
  };
};

const stateFields = { history: historyField };
const CodeMirrorEditor: FC<EditorProps> = ({ onChange, value, selection }) => {
  const serializedState = localStorage.getItem('myEditorState');
  const parsed = JSON.parse(serializedState || '');
  const editor = useRef(null);
  const initState = serializedState
    ? {
        json: parsed,
        fields: stateFields,
      }
    : undefined;

  const { setContainer, view, state } = useCodeMirror({
    initialState: initState,
    value: value,

    height: '100%',
    width: '100%',
    extensions: [
      copilot,
      EditorView.lineWrapping,
      htmlLanguage,

      keymap.of([...lintKeymap]),
      lintGutter(),
    ],
    theme: 'dark',
    basicSetup: {
      foldGutter: true,
      dropCursor: true,
      allowMultipleSelections: true,
      indentOnInput: false,
      drawSelection: true,
      tabSize: 2,
      lineNumbers: true,
      autocompletion: true,
      closeBracketsKeymap: true,
      searchKeymap: true,
      highlightSelectionMatches: true,
      syntaxHighlighting: true,
      bracketMatching: true,
      crosshairCursor: true,
      lintKeymap: true,
      highlightSpecialChars: true,
      closeBrackets: true,
      highlightActiveLine: true,
      rectangularSelection: true,
    },

    onChange: (value) => {
      onChange(value);
    },
  });
  useEffect(() => {
    view?.dispatch({
      selection: EditorSelection.create(
        [EditorSelection.range(selection.from, selection.to), EditorSelection.cursor(selection.to)],
        0,
      ),
      scrollIntoView: true,
    });
  }, [selection.to, selection.from, view, state]);
  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);
  useEffect(() => {});
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
      <div style={{ width: '100%', height: '100vh' }} ref={editor} />
    </div>
  );
};
export default CodeMirrorEditor;
