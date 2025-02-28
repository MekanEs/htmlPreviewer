import { FC, useRef, useState } from 'react';
import styles from './JSONEditor.module.scss';
import classNames from 'classnames';
import { Editor, Monaco } from '@monaco-editor/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { editor, } from '../../constants';
import { themeSwitcher } from '../../utils';
import { LS_MONACOTHEME } from '../../constants';

export const JSONEditor: FC = () => {
  const json = useAppSelector((state) => state.htmlReducer.json);
  const { fontSize, miniMap } = useAppSelector((state) => state.optionsReducer);
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
    const savedTheme = localStorage.getItem(LS_MONACOTHEME)
    if (savedTheme) {
      themeSwitcher(savedTheme)
    } else {
      localStorage.setItem(LS_MONACOTHEME, 'all-hallows-eve')
      themeSwitcher("all-hallows-eve")
    }
  };



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
          console.log(e)
          if (e.length) {
            setError('TestData has errors');
          } else {
            setError(null);
          }
        }}
        options={{
          wordWrap: 'on',
          minimap: { enabled: miniMap.enabled, size: 'proportional' as const },
          bracketPairColorization: { enabled: true },
          fontSize: fontSize,
        }}
      />
    </div>
  );
};
