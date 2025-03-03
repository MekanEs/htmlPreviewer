import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';

import { FrameSettings, SetSettingType } from './Frame';
import styles from './Frame.module.scss';

interface FrameSizeControlsProps {
  settings: FrameSettings;
  setSettings: SetSettingType;
}

export const FrameSizeControls: FC<FrameSizeControlsProps> = ({ settings, setSettings }) => {
  const [isVisible, setIsVisible] = useState(!settings.mode);

  useEffect(() => {
    if (!settings.mode) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 100);
      return () => clearTimeout(timer);
    }
  }, [settings.mode]);

  const handleSizeChange =
    (key: 'width' | 'height') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (
        value === '' ||
        (parseInt(value) >= 200 && parseInt(value) <= (key === 'width' ? 3840 : 2160))
      ) {
        setSettings(prev => ({ ...prev, [key]: value }));
      }
    };

  if (!isVisible && settings.mode) return null;

  return (
    <div
      className={classNames(styles.inputContainer, {
        [styles.hidden]: settings.mode,
      })}
    >
      <div className={styles.sizeControlsContainer}>
        <label>Width:</label>
        <input
          type="number"
          value={settings.width}
          onChange={handleSizeChange('width')}
          min="200"
          max="3840"
        />
      </div>
      <div className={styles.sizeControlsContainer}>
        <label>Height:</label>
        <input
          type="number"
          value={settings.height}
          onChange={handleSizeChange('height')}
          min="200"
          max="2160"
        />
      </div>
    </div>
  );
};
