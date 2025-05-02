import { Editor, Monaco } from '@monaco-editor/react';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { editor } from '../../constants';
import { LS_MONACOTHEME } from '../../constants';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getLocalesFromJSONString, themeSwitcher } from '../../utils';

import styles from './JSONEditor.module.scss';

export const JSONEditor: FC = () => {
  const initialJson = useAppSelector(state => state.htmlReducer.json);
  const { fontSize, miniMap } = useAppSelector(state => state.optionsReducer);
  const dispatch = useAppDispatch();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localJson, setLocalJson] = useState(initialJson); // Локальное состояние для немедленного отображения
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLocalJson(initialJson);
  }, [initialJson]);

  const changeHandler = (str: string | undefined) => {
    if (str !== undefined) {
      setLocalJson(str); // Обновляем локальное состояние немедленно

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        try {
          // Валидация перед отправкой в стор (опционально, но полезно)
          JSON.parse(str);
          dispatch(htmlActions.setJson(str));
          const locale = getLocalesFromJSONString(str);
          dispatch(htmlActions.setActiveLang(locale));
          setError(null); // Сбрасываем ошибку, если JSON валиден
        } catch (e) {
          setError('Invalid JSON format'); // Показываем ошибку парсинга
          console.error('Invalid JSON:', e);
        }
      }, 300); // Задержка 500ms
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
    const savedTheme = localStorage.getItem(LS_MONACOTHEME);
    if (savedTheme) {
      themeSwitcher(savedTheme);
    } else {
      localStorage.setItem(LS_MONACOTHEME, 'all-hallows-eve');
      themeSwitcher('all-hallows-eve');
    }
  };

  return (
    <div className={classNames(styles.JSONEditor)}>
      <div>{error}</div>

      <Editor
        onChange={changeHandler}
        value={localJson}
        theme={'vs-dark'}
        width={'100%'}
        height="100%"
        defaultLanguage="json"
        onMount={handleMount}
        onValidate={e => {
          console.log(e);
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
