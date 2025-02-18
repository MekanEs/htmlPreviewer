import { FC, useEffect, useRef, useState } from 'react';
import styles from './JSONEditor.module.scss';
import classNames from 'classnames';
import { Editor, Monaco } from '@monaco-editor/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { editor, LS_MONACOTHEME } from '../../constants';
import { themeSwitcher } from '../../utils';

export const JSONEditor: FC<{fontSize:number}> = ({ fontSize = 12 }) => {
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
     const savedTheme= localStorage.getItem(LS_MONACOTHEME)
    if(savedTheme){
themeSwitcher(savedTheme)
    }else{
      localStorage.setItem(LS_MONACOTHEME,'all-hallows-eve')
      themeSwitcher("all-hallows-eve")
    }
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
          console.log(e)
          if (e.length) {
            setError('TestData has errors');
          } else {
            setError(null);
          }
        }}
        options={{
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
              fontSize: fontSize,
        }}
      />
    </div>
  );
};
