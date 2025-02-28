import React, { FC } from "react";
import { FrameSettings, SetSettingType } from "./Frame";
import styles from './Frame.module.scss';

interface FrameSizeControlsProps {
    settings: FrameSettings;
    setSettings: SetSettingType;
}

export const FrameSizeControls: FC<FrameSizeControlsProps> = ({ settings, setSettings }) => {
    const handleSizeChange = (key: 'width' | 'height') => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => ({ ...prev, [key]: e.target.value }));
    };

    if (settings.mode) return null;
    return (
        <div className={styles.inputContainer}>
            <div className={styles.sizeControlsContainer}>
                <label>Width:</label>
                <input type="number" value={settings.width} onChange={handleSizeChange('width')} style={{ width: '80px' }} />
            </div>
            <div className={styles.sizeControlsContainer}>
                <label>Height:</label>
                <input type="number" value={settings.height} onChange={handleSizeChange('height')} style={{ width: '80px' }} />
            </div>
        </div>
    );
};