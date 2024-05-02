import { EditorView, useCodeMirror } from '@uiw/react-codemirror';
import { copilot } from '@uiw/codemirror-theme-copilot';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { Diagnostic } from '@codemirror/lint';
type EditorProps = {
  onChange: (val: string) => void;
  value: string;
  setJSON: React.Dispatch<SetStateAction<object>>;
};
// const stateFields = { history: historyField };
const JSONEditor: FC<EditorProps> = ({ onChange, value }) => {
  const editor = useRef(null);
  const [error, setError] = useState<string | null>(null);
  const { setContainer, state, view } = useCodeMirror({
    value: value,
    height: '90vh',
    width: '100%',
    extensions: [copilot, json()],
    theme: 'dark',
    basicSetup: {
      foldGutter: false,
      dropCursor: false,
      allowMultipleSelections: false,
      indentOnInput: false,
      drawSelection: true,
      tabSize: 2,
      lineNumbers: true,
      autocompletion: true,
      closeBracketsKeymap: true,
      searchKeymap: true,
      highlightSelectionMatches: true,
      syntaxHighlighting: true,
      crosshairCursor: true,
    },
    onChange: (value, viewUpdate) => {
      onChange(value);
      const lint: (view: EditorView) => Diagnostic[] = jsonParseLinter();

      if (view) {
        const diag = lint(view);
        if (diag.length > 0) {
          setError('error');
        } else [setError(null)];
      }
      console.log(state, viewUpdate);
      // localStorage.setItem('myValue', value);
      // const state = viewUpdate.state.toJSON(stateFields);
      // localStorage.setItem('myEditorState', JSON.stringify(state));
    },
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  return (
    <div style={{ position: 'relative', minWidth: '600px' }}>
      <div
        style={{
          position: 'absolute',
          top: '0',
          background: 'red',
          opacity: '0.7',
          zIndex: '1000',
        }}
      >
        {error}
      </div>
      <div style={{ width: '100%', height: '100%' }} ref={editor} />
    </div>
  );
};
export default JSONEditor;
