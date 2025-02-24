import React, { FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Frame.module.scss';
import classNames from 'classnames';
import { loadHandler, toggleFrameBorder, useDebounce } from '../../utils';
import { EditorSelection } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { toggleImages } from '../../utils';
import { FrameControls } from './FrameControls';
import { FrameSizeControls } from './FrameSizeControls';

interface FrameProps {
  className?: string;
  testData: string;
}
export type frameSettings = {
  mode: boolean;
  bordered: boolean;
  imagesMode: boolean;
  width: string;
  height: string;
}
export type setSettingType = (value: SetStateAction<frameSettings>) => void
export const Frame: FC<FrameProps> = ({ testData }) => {
  const htmlToRender = useAppSelector((state) => state.htmlReducer.htmlToRender);
  const debouncedHtml = useDebounce(htmlToRender, 500);
  const dispatch = useAppDispatch();
  const frameRef = useRef() as React.MutableRefObject<HTMLIFrameElement>;

  const [settings, setSettings] = useState({
    mode: true,
    bordered: false,
    imagesMode: false,
    width: '',
    height: '',
  });

  const setSelection = useCallback(
    (selection: EditorSelection) => {
      dispatch(htmlActions.setSelection(selection));
    },
    [dispatch]
  );

  useEffect(() => {
    const frame = frameRef.current;
    const loadHandlerFunc = () => loadHandler(frame, setSelection, settings.bordered, settings.imagesMode);
    frame.addEventListener('load', loadHandlerFunc);

    toggleFrameBorder(settings.bordered, frame);
    toggleImages(settings.imagesMode, frame);

    return () => frame.removeEventListener('load', loadHandlerFunc);
  }, [debouncedHtml, settings, setSelection, testData]);
  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const newWidth = String(container.offsetWidth);
    const newHeight = String(container.offsetHeight);

    setSettings((prev) => ({ ...prev, width: newWidth, height: newHeight }));
  };
  return (
    <div className={classNames(styles.Frame)}>
      <div className={styles.buttonContainer}>
        <FrameControls settings={settings} setSettings={setSettings} />
        <FrameSizeControls settings={settings} setSettings={setSettings} frameRef={frameRef} />
      </div>
      <iframe
        className={classNames(styles.iframe, { [styles.resizable]: !settings.mode, [styles.full]: settings.mode })}
        sandbox='allow-same-origin allow-scripts'
        width={'100%'}
        height={'100%'}
        ref={frameRef}
        srcDoc={debouncedHtml}
        onMouseUp={handleResize}
        onMouseMove={handleResize}
      />
    </div>
  );
};
