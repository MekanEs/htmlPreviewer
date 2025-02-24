import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Frame.module.scss';
import classNames from 'classnames';
import { loadHandler, toggleFrameBorder, useDebounce } from '../../utils';
import { EditorSelection } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { toggleImages } from '../../utils';

interface FrameProps {
  className?: string;
  testData: string;
}

export const Frame: FC<FrameProps> = ({ testData }) => {
  const htmlToRender = useAppSelector((state) => state.htmlReducer.htmlToRender);
  const debouncedHtml = useDebounce(htmlToRender, 500);
  const dispatch = useAppDispatch();

  // Состояния компонента, объединенные в один объект
  const [settings, setSettings] = useState({
    mode: true,
    bordered: false,
    imagesMode: false,
    width: '',
    height: '',
  });

  const ref = useRef() as React.MutableRefObject<HTMLIFrameElement>;

  const setSelection = useCallback(
    (selection: EditorSelection) => {
      dispatch(htmlActions.setSelection(selection));
    },
    [dispatch],
  );

  const handleModeToggle = () => {
    setSettings((prev) => ({ ...prev, mode: !prev.mode }))

    if (settings.mode) {
      ref.current.style['width'] = '320px';
      ref.current.style['height'] = '800px';
    }
    updateSize()
  };

  const handleBorderToggle = () => {
    setSettings((prev) => ({ ...prev, bordered: !prev.bordered }));
  };

  const handleImagesToggle = () => {
    setSettings((prev) => ({ ...prev, imagesMode: !prev.imagesMode }));
  };

  const updateSize = () => {
    const { width, height } = ref.current.style;
    setSettings((prev) => ({ ...prev, width, height }));
  };
  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const newWidth = String(container.offsetWidth);
    const newHeight = String(container.offsetHeight);

    setSettings((prev) => ({ ...prev, width: newWidth, height: newHeight }));
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, width: e.target.value, }));
    ref.current.style['width'] = `${e.target.value}px`;
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, height: e.target.value, }));
    ref.current.style['height'] = `${e.target.value}px`;
  };
  useEffect(() => {
    const frame = ref.current;

    const loadHandlerFunc = () => loadHandler(frame, setSelection, settings.bordered, settings.imagesMode);
    frame.addEventListener('load', loadHandlerFunc);

    toggleFrameBorder(settings.bordered, frame);
    toggleImages(settings.imagesMode, frame);

    return () => frame.removeEventListener('load', loadHandlerFunc);
  }, [debouncedHtml, settings, setSelection, testData]);

  return (
    <div className={classNames(styles.Frame,)}>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonGroup}>
          <button onClick={handleModeToggle}>
            {settings.mode ? 'responsive' : 'full'}
          </button>
          <button onClick={handleBorderToggle}>
            {settings.bordered ? 'hide border' : 'show border'}
          </button>
          <button onClick={handleImagesToggle}>
            {settings.imagesMode ? 'show img' : 'hide img'}
          </button>
        </div>
        <div className={styles.inputContainer}>
          {!settings.mode && (
            <>

              <div style={{ display: 'flex', flexDirection: "column" }}>
                <label >Width:</label>
                <input
                  type="number"
                  value={settings.width}
                  onChange={handleWidthChange}
                  style={{ marginLeft: '10px', width: '80px', }}
                /></div>
              <div style={{ display: 'flex', flexDirection: "column" }}>
                <label style={{ marginLeft: '20px' }}>Height:</label>
                <input
                  type="number"
                  value={settings.height}
                  onChange={handleHeightChange}
                  style={{ marginLeft: '10px', width: '80px' }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <iframe
        onMouseUp={handleResize}
        onMouseMove={handleResize}
        className={classNames(styles.iframe, { [styles.resizable]: !settings.mode, [styles.full]: settings.mode })}
        sandbox='allow-same-origin allow-scripts'
        width={'100%'}
        height={'100%'}
        ref={ref}
        srcDoc={debouncedHtml}
      />


    </div>
  );
};
