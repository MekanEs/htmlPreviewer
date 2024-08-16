import { FC, useEffect, useRef, useState } from 'react';
import styles from './JSONEditor.module.scss';
import classNames from 'classnames';
import { editor } from 'monaco-editor';
import { Editor, Monaco } from '@monaco-editor/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';

export const JSONEditor: FC = () => {
  const json = useAppSelector((state) => state.htmlReducer.json);
  const dispatch = useAppDispatch();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const changeHandler = (str: string | undefined) => {
    if (str) {
      dispatch(htmlActions.setJson(str));
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
  }, [json]);

  return (
    <div className={classNames(styles.JSONEditor)}>
      <div>{error}</div>

      <Editor
        onChange={changeHandler}
        value={json}
        theme={'vs-dark'}
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
