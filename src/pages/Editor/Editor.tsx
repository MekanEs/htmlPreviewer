import { Editor } from '@monaco-editor/react';
import classNames from 'classnames';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { CodeEditor, Frame, JSONEditor, Stats, ThemeSwitcher, Images } from '../../components';
import { MultiReplacerContainer } from '../../components/MultiReplacer.tsx/MultiReplacerContainer';
import { TextPlain } from '../../components/TextPlain/TextPlain';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { TabContainer } from '../../components/common/TabContainer';
import { editor, IRange } from '../../constants';
import { LS_FONTSIZEKEY, LS_MONACOTHEME, LS_SOURCEHTML, LS_SOURCEJSON } from '../../constants';
import { optionsActions } from '../../store/editorOptions/editorOptions';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { EditorSelection } from '../../types/types';
import { compileHandlebars } from '../../utils';

import styles from './Editor.module.scss';

interface EditorPageProps {
  className?: string;
}

const tabs = [
  { key: 'stats', label: 'Stats' },
  { key: 'iframe', label: 'Preview' },
  { key: 'images', label: 'Images' },
  { key: 'source', label: 'Source' },
  { key: 'replacer', label: 'Replace' },
  { key: 'textPlain', label: 'Plain Text' },
];

const codeTabs = [
  { key: 'html', label: 'Code' },
  { key: 'json', label: 'TestData' },
];
export const EditorPage: FC<EditorPageProps> = () => {
  const { json, source, selection, langs, activeLang } = useAppSelector(state => state.htmlReducer);
  const options = useAppSelector(state => state.optionsReducer);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const dispatch = useAppDispatch();
  const [ctrlPressed, setctrlPressed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const revealLine = (range: IRange) => {
    editorRef.current?.revealRangeInCenter(range);
    editorRef.current?.setSelection(range);
  };
  const setSelection = useCallback(
    (selection: EditorSelection) => {
      dispatch(htmlActions.setSelection(selection));
    },
    [dispatch]
  );
  const onKeyCtrlPressed = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setctrlPressed(true);
    }
    if (ctrlPressed && e.key === 'Alt') {
      if (options.editors.mode === 'html') {
        dispatch(optionsActions.setEditorMode('json'));
      } else {
        dispatch(optionsActions.setEditorMode('html'));
      }
    }
    if (ctrlPressed && e.code === 'KeyS') {
      e.preventDefault();

      localStorage.setItem(LS_SOURCEHTML, source);
      localStorage.setItem(LS_SOURCEJSON, JSON.stringify(JSON.parse(json), null, 2));
    }
    if (ctrlPressed && e.code === 'KeyB') {
      e.preventDefault();
      // const selection = editorRef.current?.getSelection();
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
    <div className={styles.EditorPage}>
      <div className={styles.buttonGroup}>
        <TabContainer
          activeTab={options.editors.mode}
          callBack={tabKey => dispatch(optionsActions.setEditorMode(tabKey))}
          tabs={codeTabs}
          className={classNames([styles.tabContainer, styles.codeTab])}
        />

        <div className={styles.buttonContainer}>
          <Button
            style={{ padding: '8px 5px' }}
            onClick={() => {
              setShowSettings(prev => !prev);
            }}
          >
            settings
          </Button>
          {showSettings && (
            <>
              <ThemeSwitcher />
              <Input
                type="number"
                value={options.fontSize}
                onChange={e => {
                  const value = e.target.value;
                  localStorage.setItem(LS_FONTSIZEKEY, value);
                  dispatch(optionsActions.setFontSize(Number(value)));
                }}
                title="editor font size"
                className={classNames(styles.fontSizeInput, styles.input)}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch(optionsActions.setMiniMapEnabled(!options.miniMap.enabled));
                }}
              >
                {options.miniMap.enabled ? 'off' : 'on'}
              </Button>
            </>
          )}
          <select
            onChange={e => {
              dispatch(htmlActions.setActiveLang(e.target.value));
              dispatch(htmlActions.seNewLangToJSON(null));
            }}
            value={activeLang}
          >
            {Array.from(new Set(langs.concat(activeLang))).map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="primary"
            title="Ctrl+S"
            onClick={() => {
              localStorage.setItem(LS_SOURCEHTML, source);
              localStorage.setItem(LS_SOURCEJSON, JSON.stringify(JSON.parse(json), null, 2));
            }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              localStorage.removeItem(LS_SOURCEHTML);
              localStorage.removeItem(LS_SOURCEJSON);
            }}
          >
            Reset
          </Button>
        </div>
        <div>
          <Button
            title="undo"
            onClick={() => {
              if (editorRef.current) {
                editorRef.current.trigger('keyboard', 'undo', null);
              }
            }}
          >
            ←
          </Button>
          <Button
            title="redo"
            onClick={() => {
              if (editorRef.current) {
                editorRef.current.trigger('keyboard', 'redo', null);
              }
            }}
          >
            →
          </Button>
        </div>
      </div>
      <PanelGroup autoSaveId="persistence" direction="horizontal">
        <div className={styles.container}>
          <Panel defaultSize={60} minSize={20} className={styles.editorContainer}>
            <div className={classNames(styles.CodeEditor)}>
              {options.editors.mode === 'html' ? (
                <CodeEditor selection={selection} editorRef={editorRef} />
              ) : (
                <JSONEditor />
              )}
            </div>
          </Panel>
          <PanelResizeHandle className={styles.resizeHandle}>
            <p className={styles.resizeinner}></p>
          </PanelResizeHandle>
          <Panel defaultSize={40} minSize={20} className={styles.frameContainer}>
            <TabContainer
              tabs={tabs}
              activeTab={options.frameMode}
              callBack={tabKey => dispatch(optionsActions.setFrameMode(tabKey))}
              className={styles.tabContainer}
            />

            {options.frameMode === 'iframe' && (
              <Frame testData={json} setSelection={setSelection} source={source} />
            )}
            {options.frameMode === 'stats' && <Stats source={source} revealLine={revealLine} />}
            {options.frameMode === 'images' && <Images />}
            {options.frameMode === 'textPlain' && <TextPlain />}
            {options.frameMode === 'source' && (
              <Editor
                theme={localStorage.getItem(LS_MONACOTHEME) ?? 'vs-dark'}
                width={'100%'}
                height="100%"
                defaultLanguage="html"
                value={compileHandlebars(source, json, false)}
                language="html"
                options={{
                  wordWrap: 'on',
                  minimap: { enabled: false, size: 'proportional' },
                  fontSize: options.fontSize,
                  readOnly: true,
                }}
              />
            )}
            {options.frameMode === 'replacer' && <MultiReplacerContainer editorRef={editorRef} />}
          </Panel>
        </div>
      </PanelGroup>
    </div>
  );
};
