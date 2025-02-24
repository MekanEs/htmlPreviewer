import { FC, } from "react";
import { frameSettings, setSettingType } from "./Frame";
import styles from './Frame.module.scss'
interface FrameControlsProps { settings: frameSettings; setSettings: setSettingType }
export const FrameControls: FC<FrameControlsProps> = ({ settings, setSettings }) => {

    const handleModeToggle = () => {
        setSettings((prev) => ({ ...prev, mode: !prev.mode }));
    };

    const handleBorderToggle = () => {
        setSettings((prev) => ({ ...prev, bordered: !prev.bordered }));
    };

    const handleImagesToggle = () => {
        setSettings((prev) => ({ ...prev, imagesMode: !prev.imagesMode }));
    };

    return (
        <div className={styles.buttonGroup}>
            <button onClick={handleBorderToggle}>{settings.bordered ? 'hide border' : 'show border'}</button>
            <button onClick={handleImagesToggle}>{settings.imagesMode ? 'show img' : 'hide img'}</button>
            <button onClick={handleModeToggle}>{settings.mode ? 'responsive' : 'full'}</button>

        </div>
    );
};