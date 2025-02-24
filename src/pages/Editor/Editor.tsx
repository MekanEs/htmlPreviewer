import { FC, useEffect, useRef, useState } from 'react';
import styles from './Editor.module.scss';
import { CodeEditor, Frame, JSONEditor, Stats, ThemeSwitcher, Images } from '../../components';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { editor, IRange, } from '../../constants';
import { Editor } from '@monaco-editor/react';
import { optionsActions } from '../../store/editorOptions/editorOptions';
import { LS_FONTSIZEKEY, LS_MONACOTHEME, LS_SOURCEHTML } from '../../constants/localStorage';

interface EditorPageProps {
  className?: string;
}


const tabs = [
  { key: 'stats', label: 'Stats' },
  { key: 'iframe', label: 'Preview' },
  { key: 'images', label: 'Images' },
  { key: 'source', label: 'Source' },
];


const codeTabs = [
  { key: 'html', label: 'Code' },
  { key: 'json', label: 'TestData' }]
export const EditorPage: FC<EditorPageProps> = () => {
  const { json, source, selection, htmlToSource } = useAppSelector((state) => state.htmlReducer);
  const options = useAppSelector((state) => state.optionsReducer);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const dispatch = useAppDispatch()
  const [ctrlPressed, setctrlPressed] = useState(false);
  const revealLine = (range: IRange) => {
    editorRef.current?.revealRangeInCenter(range);
    editorRef.current?.setSelection(range);
  };
  const onKeyCtrlPressed = (e: KeyboardEvent) => {

    if (e.key === 'Control') {
      setctrlPressed(true);
    }
    if (ctrlPressed && e.key === 'Alt') {
      if (options.editors.mode === 'html') {
        dispatch(optionsActions.setEditorMode('json'))
      } else {
        dispatch(optionsActions.setEditorMode('html'))
      }
    }
    if (ctrlPressed && e.code === 'KeyS') {

      e.preventDefault()


      localStorage.setItem(LS_SOURCEHTML, source)


    }
    if (ctrlPressed && e.code === 'KeyB') {

      e.preventDefault()
      const selection = editorRef.current?.getSelection()
      console.log(selection)

    }
  };
  const onKeyCtrlUp = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setctrlPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onKeyCtrlPressed);
    window.addEventListener('keyup', onKeyCtrlUp);
    return () => {
      window.removeEventListener('keydown', onKeyCtrlPressed);
      window.removeEventListener('keyup', onKeyCtrlUp);
    };
  });

  return (
    <div>
      <div className={styles.buttonGroup}>
        <div className={classNames([styles.tabContainer, styles.codeTab])}>
          {codeTabs.map((tab) => (
            <button
              key={tab.key}
              className={classNames(styles.tab, { [styles.tabActive]: options.frameMode === tab.key })}
              onClick={() => dispatch(optionsActions.setEditorMode(tab.key))}
            >
              {tab.label}
            </button>
          ))}
          <div
            className={styles.tabIndicator}
            style={{
              width: `${100 / codeTabs.length}%`,
              transform: `translateX(${(codeTabs.findIndex(t => t.key === options.editors.mode)) * 100}%)`,
            }}
          />
        </div>




        <div className={styles.buttonContainer}>
          <ThemeSwitcher />
          <input
            style={{ width: '40px' }}
            onChange={(e) => {
              const value = e.target.value;
              localStorage.setItem(LS_FONTSIZEKEY, value);
              dispatch(optionsActions.setFontSize(Number(value)))
            }}
            value={options.fontSize}
            type='number'
            title={'editor font size'}
          />

          <button onClick={() => { dispatch(optionsActions.setMiniMapEnabled(!options.miniMap.enabled)) }}>{options.miniMap.enabled ? 'off' : 'on'}</button>
        </div>
        <div className={styles.buttonContainer}>
          <button title='Ctrl+S' onClick={() => {
            localStorage.setItem(LS_SOURCEHTML, source)
          }}>
            Save
          </button>
          <button onClick={() => {


            localStorage.removeItem(LS_SOURCEHTML)
          }}>
            Reset
          </button></div>
      </div>
      <div className={styles.container}>
        <div className={styles.editorContainer}>

          <div className={classNames(styles.CodeEditor)}>
            {options.editors.mode === 'html' ? (

              <CodeEditor selection={selection} editorRef={editorRef} />

            ) : (
              <JSONEditor />
            )}


          </div>
        </div>

        <div className={styles.frameContainer}>
          <div className={styles.tabContainer}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={classNames(styles.tab, { [styles.tabActive]: options.frameMode === tab.key })}
                onClick={() => dispatch(optionsActions.setFrameMode(tab.key))}
              >
                {tab.label}
              </button>
            ))}
            <div
              className={styles.tabIndicator}
              style={{
                width: `${100 / tabs.length}%`,
                transform: `translateX(${(tabs.findIndex(t => t.key === options.frameMode)) * 100}%)`,
              }}
            />
          </div>

          {options.frameMode === "iframe" && <Frame testData={json} />}
          {options.frameMode === 'stats' && <Stats source={source} revealLine={revealLine} />}
          {options.frameMode === 'images' && <Images />}
          {options.frameMode === 'source' && <Editor
            theme={localStorage.getItem(LS_MONACOTHEME) || 'vs-dark'}
            width={'100%'}
            height='100%'
            defaultLanguage='html'
            value={htmlToSource}
            language='html'
            options={{
              wordWrap: 'on',
              minimap: { enabled: false, size: 'proportional' },
              fontSize: options.fontSize,
              readOnly: true

            }}
          />}
        </div>
      </div>
    </div>
  );
};
