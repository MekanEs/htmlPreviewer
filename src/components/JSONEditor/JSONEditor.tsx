import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './JSONEditor.module.scss';
import classNames from 'classnames';
import { editor } from 'monaco-editor';
import { Editor, Monaco } from '@monaco-editor/react';
type EditorProps = {
  onChange: (val: string) => void;
  value: string;
  setJSON: React.Dispatch<SetStateAction<object>>;
};

export const JSONEditor2: FC<EditorProps> = ({ onChange, value }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const changeHandler = (str: string | undefined) => {
    if (str) {
      console.log(str);
      onChange(str);
    }
  };
  const handleMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  };

  useEffect(() => {
    // editor.setTheme('vs');
  }, [value]);

  return (
    <div className={classNames(styles.JSONEditor)}>
      <div>{error}</div>

      <Editor
        onChange={changeHandler}
        value={value}
        theme={'hc-black'}
        width={'100%'}
        height='100%'
        defaultLanguage='json'
        onMount={handleMount}
        onValidate={(e) => {
          if (e.length) {
            setError('TestData has errors');
          } else {
            setError(null);
          }
        }}
        options={{
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
};
