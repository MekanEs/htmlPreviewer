import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Frame.module.scss';
import classNames from 'classnames';
import { loadHandler, toggleFrameBorder, useDebounce } from '../../utils';
import { EditorSelection } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { toggleImages } from '../../utils/toggleFrameBorder';

interface FrameProps {
  className?: string;
  testData: string;
}

export const Frame: FC<FrameProps> = ({ testData }) => {
  const htmlToRender = useAppSelector((state) => state.htmlReducer.htmlToRender);
  const debouncedHtml = useDebounce(htmlToRender, 500);
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState(true);
  const [bordered, setBordered] = useState(false);
  const [imagesMode, setImagesMode] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const ref = useRef() as React.MutableRefObject<HTMLIFrameElement>;
  const setSelection = useCallback(
    (selection: EditorSelection) => {
      dispatch(htmlActions.setSelection(selection));
    },
    [dispatch],
  );
  useEffect(() => {
    const frame = ref.current;
    const loadHandlerFunc = () => loadHandler(frame, setSelection, bordered,imagesMode);
    // loadHandlerFunc()
    frame.addEventListener('load', loadHandlerFunc);
    toggleFrameBorder(bordered, frame);
    
    toggleImages(imagesMode,frame)
    

    return () => frame.removeEventListener('load', loadHandlerFunc);
  }, [debouncedHtml, bordered, setSelection, testData,imagesMode]);

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
          <button onClick={() => setImagesMode((prev) => !prev)}>
            {imagesMode ? 'show img': 'hide img' }
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
        srcDoc={debouncedHtml}
      />

      {/* <iframe  sandbox='allow-same-origin allow-popups allow-scripts' width={'100%'} height={'100%'}>
        {dom}
      </iframe> */}
    </div>
  );
};
