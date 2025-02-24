import React, { FC } from "react";
import { frameSettings, setSettingType } from "./Frame";
import styles from './Frame.module.scss'

interface FrameSizeControlsProps {
    settings: frameSettings;
    setSettings: setSettingType;
    frameRef: React.MutableRefObject<HTMLIFrameElement>
}
export const FrameSizeControls: FC<FrameSizeControlsProps> = ({ settings, setSettings, frameRef }) => {
    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => ({ ...prev, width: e.target.value }));
        frameRef.current.style.width = `${e.target.value}px`;
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => ({ ...prev, height: e.target.value }));
        frameRef.current.style.height = `${e.target.value}px`;
    };

    if (settings.mode) return null;

    return (
        <div className={styles.inputContainer}>
            <div className={styles.sizeControlsContainer}>
                <label>Width:</label>
                <input type="number" value={settings.width} onChange={handleWidthChange} style={{ width: '80px' }} />
            </div>
            <div className={styles.sizeControlsContainer}>
                <label>Height:</label>
                <input type="number" value={settings.height} onChange={handleHeightChange} style={{ width: '80px' }} />
            </div>
        </div>
    );
};