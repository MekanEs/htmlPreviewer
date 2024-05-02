import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Frame.module.scss';
import classNames from 'classnames';
import { compileHbs } from '../../utils/newFile';
import { addDataAttribute } from '../../utils/DataAttributeAdder';
import { borderStyle } from '../../constants';
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
  // const [dom, setDom] = useState<Document | null>(null);
  const ref = useRef() as React.MutableRefObject<HTMLIFrameElement>;
  // const handleFrameLoad: React.ReactEventHandler<HTMLIFrameElement> = (e) => {
  //   iframe.current = e.target;

  // };

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
    function loadHandler() {
      if (frame.contentDocument) {
        // frame.contentDocument.body.style['transform'] = 'scale(0.9)';
        frame.contentDocument.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const el = e.target as HTMLElement;
          const from = Number(el.dataset.startIndex) || 0;
          const to = Number(el.dataset.endIndex) || 0;
          setSelection(from, to);
        });

        if (bordered) {
          let style = frame.contentDocument.querySelector('#style123');
          if (style === null) {
            style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('id', 'style123');
          }

          style.innerHTML = borderStyle;
          frame.contentDocument.querySelector('head')?.prepend(style);
        } else {
          const style = frame.contentDocument.querySelector('#style123');
          if (style) {
            style.innerHTML = '';
          }
        }
      }
    }
    frame.addEventListener('load', loadHandler);
    return () => frame.removeEventListener('load', loadHandler);
  }, [setSelection, newTxt, bordered]);
  useEffect(() => {
    const frame = ref.current;
    if (frame.contentDocument) {
      if (bordered) {
        let style = frame.contentDocument.querySelector('#style123');
        if (style === null) {
          style = document.createElement('style');
          style.setAttribute('type', 'text/css');
          style.setAttribute('id', 'style123');
        }

        style.innerHTML = borderStyle;
        frame.contentDocument.querySelector('head')?.prepend(style);
      } else {
        const style = frame.contentDocument.querySelector('#style123');
        if (style) {
          style.innerHTML = '';
        }
      }
    }
  }, [bordered, source, testData]);
  return (
    <div className={classNames(styles.Frame, { [styles.mobile]: !mode })}>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonGroup}>
          <button onClick={() => setMode(true)}>full</button>
          <button onClick={() => setMode(false)}>mobile</button>
          <button onClick={() => setBordered((prev) => !prev)}>
            {bordered ? 'hide border' : 'show border'}
          </button>
        </div>
      </div>

      <iframe sandbox='allow-same-origin' width={'100%'} height={'100%'} ref={ref} srcDoc={html} />
      {/* <iframe  sandbox='allow-same-origin allow-popups allow-scripts' width={'100%'} height={'100%'}>
        {dom}
      </iframe> */}
    </div>
  );
};
