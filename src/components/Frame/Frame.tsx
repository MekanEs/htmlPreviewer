import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';

import { EditorSelection } from '../../types/types';
import { loadHandler, toggleFrameBorder, compileHandlebars, toggleImages } from '../../utils';

import styles from './Frame.module.scss';
import { FrameControls } from './FrameControls';
import { FrameSizeControls } from './FrameSizeControls';
interface FrameProps {
  testData: string;
  setSelection: (selection: EditorSelection) => void;
  source: string;
}
export interface FrameSettings {
  mode: boolean;
  bordered: boolean;
  imagesMode: boolean;
  width: string;
  height: string;
}
export type SetSettingType = React.Dispatch<React.SetStateAction<FrameSettings>>;
const initialFrameSettings = {
  mode: true,
  bordered: false,
  imagesMode: false,
  width: '320',
  height: '800',
};
export const Frame: FC<FrameProps> = ({ testData, setSelection, source }) => {
  const htmlToRender = compileHandlebars(source, testData);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [settings, setSettings] = useState<FrameSettings>(initialFrameSettings);
  const scrollY = useRef<number>(0);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const loadHandlerFunc = () =>
      loadHandler(frame, setSelection, settings.bordered, settings.imagesMode, scrollY);
    frame.addEventListener('load', loadHandlerFunc);

    return () => frame.removeEventListener('load', loadHandlerFunc);
  }, [settings.bordered, setSelection, testData, settings.imagesMode]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    toggleFrameBorder(settings.bordered, frame);
    toggleImages(settings.imagesMode, frame);
  }, [frameRef, settings.bordered, settings.imagesMode]);

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!frame || settings.mode) return;
    timeoutRef.current = setTimeout(() => {
      frame.style.width = `${settings.width}px`;
      frame.style.height = `${settings.height}px`;
    }, 100);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [settings.width, settings.height, settings.mode]);
  return (
    <div className={classNames(styles.Frame)}>
      <div className={styles.buttonContainer}>
        <FrameControls settings={settings} setSettings={setSettings}>
          <FrameSizeControls settings={settings} setSettings={setSettings} />
        </FrameControls>
      </div>
      <iframe
        className={classNames(styles.iframe, settings.mode ? styles.full : styles.resizable)}
        sandbox="allow-same-origin allow-scripts"
        width={settings.width}
        height={settings.height}
        ref={frameRef}
        srcDoc={htmlToRender}
      />
    </div>
  );
};
