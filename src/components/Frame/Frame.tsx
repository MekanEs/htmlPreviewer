import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Frame.module.scss';
import classNames from 'classnames';
import { loadHandler, toggleFrameBorder, addDataAttribute, compileHbs } from '../../utils';

interface FrameProps {
  className?: string;
  source: string;
  setSelection: (from: number, to: number) => void;
  testData: string;
}

export const Frame: FC<FrameProps> = ({ source, setSelection, testData }) => {
  const newTxt = addDataAttribute(source);
  const [html, setHtml] = useState('');
  const [mode, setMode] = useState(true);
  const [bordered, setBordered] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const ref = useRef() as React.MutableRefObject<HTMLIFrameElement>;

  useEffect(() => {
    try {
      const compiled = compileHbs(newTxt, testData);
      setHtml(compiled);
    } catch (e) {
      console.log(e);
    }
  }, [newTxt, testData]);
  useEffect(() => {
    const frame = ref.current;
    const loadHandlerFunc = () => loadHandler(frame, setSelection, bordered);
    frame.addEventListener('load', loadHandlerFunc);
    return () => frame.removeEventListener('load', loadHandlerFunc);
  }, [setSelection, newTxt, bordered]);

  // useEffect(() => {
  //   const frame = ref.current;
  //   if (frame.contentDocument) {
  //     frame.srcdoc = html;
  //   }
  // }, [source, testData, html]);
  useEffect(() => {
    const frame = ref.current;

    toggleFrameBorder(bordered, frame);
  }, [bordered, testData, newTxt]);

  const updateSize = () => {
    const { width, height } = ref.current.style;
    setWidth(width);
    setHeight(height);
  };
  return (
    <div className={classNames(styles.Frame, { [styles.mobile]: !mode })}>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => {
              setMode((prev) => !prev);
              if (mode) {
                ref.current.style['width'] = '320px';
                ref.current.style['height'] = '800px';
              }
              updateSize();
            }}
          >
            {mode ? 'responsive' : 'full'}
          </button>
          <button onClick={() => setBordered((prev) => !prev)}>
            {bordered ? 'hide border' : 'show border'}
          </button>
        </div>
        <div className={styles.inputContainer}>
          {!mode && (
            <>
              <input style={{ width: '50px' }} type='text' value={width} />
              <input style={{ width: '50px' }} type='text' value={height} />
            </>
          )}
        </div>
      </div>

      <iframe
        onMouseUp={updateSize}
        className={classNames({ [styles.resizable]: !mode, [styles.full]: mode })}
        sandbox='allow-same-origin allow-scripts'
        width={'100%'}
        height={'100%'}
        ref={ref}
        srcDoc={html}
      />

      {/* <iframe  sandbox='allow-same-origin allow-popups allow-scripts' width={'100%'} height={'100%'}>
        {dom}
      </iframe> */}
    </div>
  );
};
