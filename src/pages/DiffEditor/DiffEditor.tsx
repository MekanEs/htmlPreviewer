import { DiffEditor } from '@monaco-editor/react';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/common/Button';
import { LS_MONACOTHEME } from '../../constants';
import { useAppSelector } from '../../store/store';
import { changeLocaleInJSON, compileHandlebars, themeSwitcher } from '../../utils';

import styles from './DiffEditor.module.scss';

export const DiffEditorComponent: FC = () => {
  const { source, json, langs } = useAppSelector(state => state.htmlReducer);
  const [languages, setLanguages] = useState({ first: 'ru', second: 'en' });
  const [sources, setSources] = useState({ first: '', second: '' });
  const nav = useNavigate();
  useEffect(() => {
    const firstSource = compileHandlebars(source, changeLocaleInJSON(json, languages.first), false);
    const secondSource = compileHandlebars(
      source,
      changeLocaleInJSON(json, languages.second),
      false
    );
    setSources({ first: firstSource, second: secondSource });
  }, [languages, json, source]);
  const handleMount = () => {
    const savedTheme = localStorage.getItem(LS_MONACOTHEME);
    if (savedTheme) {
      themeSwitcher(savedTheme);
    } else {
      localStorage.setItem(LS_MONACOTHEME, 'all-hallows-eve');
      themeSwitcher('all-hallows-eve');
    }
  };
  return (
    <div className={styles.editorContainer}>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            nav('/');
          }}
        >
          editor
        </Button>

        <div className={styles.selectContainer}>
          <select
            onChange={e => {
              setLanguages({ ...languages, first: e.target.value });
            }}
            name="lang1"
            id=""
            value={languages.first}
          >
            {langs.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>

          <select
            onChange={e => {
              setLanguages({ ...languages, second: e.target.value });
            }}
            name="lang2"
            id=""
            value={languages.second}
          >
            {langs.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.editor}>
        <DiffEditor
          onMount={handleMount}
          // className={styles.editor}
          original={sources.first}
          modified={sources.second}
          language="html"
        />
      </div>
    </div>
  );
};
