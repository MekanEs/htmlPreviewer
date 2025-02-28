import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { EditorSelection } from '../../types/types';
import { loadHandler, toggleFrameBorder, useDebounce } from '../../utils';
import { toggleImages } from '../../utils/frame/toggleFrameBorder';

import styles from './Frame.module.scss';
import { FrameControls } from './FrameControls';
import { FrameSizeControls } from './FrameSizeControls';

interface FrameProps {
  className?: string;
  testData: string;
}

export interface FrameSettings {
  mode: boolean;
  bordered: boolean;
  imagesMode: boolean;
  width: string;
  height: string;
}
export type SetSettingType = React.Dispatch<React.SetStateAction<FrameSettings>>;

export const Frame: FC<FrameProps> = ({ testData }) => {
  const htmlToRender = useAppSelector(state => state.htmlReducer.htmlToRender);
  const debouncedHtml = useDebounce(htmlToRender, 500);
  const dispatch = useAppDispatch();
  const frameRef = useRef<HTMLIFrameElement>(null);

  const [settings, setSettings] = useState<FrameSettings>({
    mode: true,
    bordered: false,
    imagesMode: false,
    width: '320',
    height: '800',
  });

  const setSelection = useCallback(
    (selection: EditorSelection) => {
      dispatch(htmlActions.setSelection(selection));
    },
    [dispatch]
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const loadHandlerFunc = () =>
      loadHandler(frame, setSelection, settings.bordered, settings.imagesMode);
    frame.addEventListener('load', loadHandlerFunc);

    toggleFrameBorder(settings.bordered, frame);
    toggleImages(settings.imagesMode, frame);

    return () => frame.removeEventListener('load', loadHandlerFunc);
  }, [debouncedHtml, settings, setSelection, testData]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (!settings.mode) {
          setSettings(prev => ({
            ...prev,
            width: String(Math.round(width)),
            height: String(Math.round(height)),
          }));
        }
      }
    });

    resizeObserver.observe(frame);
    return () => resizeObserver.disconnect();
  }, [settings.mode]);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || settings.mode) return;

    frame.style.width = `${settings.width}px`;
    frame.style.height = `${settings.height}px`;
  }, [settings.width, settings.height, settings.mode]);
  return (
    <div className={classNames(styles.Frame)}>
      <div className={styles.buttonContainer}>
        <FrameControls settings={settings} setSettings={setSettings}>
          <FrameSizeControls settings={settings} setSettings={setSettings} />
        </FrameControls>
      </div>
      <iframe
        className={classNames(styles.iframe, {
          [styles.resizable]: !settings.mode,
          [styles.full]: settings.mode,
        })}
        sandbox="allow-same-origin allow-scripts"
        width={settings.width}
        height={settings.height}
        ref={frameRef}
        srcDoc={debouncedHtml}
        onMouseUp={() => {
          /* Можно оставить для будущей логики */
        }}
      />
    </div>
  );
};
