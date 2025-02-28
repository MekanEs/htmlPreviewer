import { FC } from "react";
import { FrameSettings, SetSettingType } from "./Frame";
import styles from './Frame.module.scss';

interface FrameControlsProps {
    settings: FrameSettings;
    setSettings: SetSettingType;
}

export const FrameControls: FC<FrameControlsProps> = ({ settings, setSettings }) => {
    const toggleSetting = (key: keyof FrameSettings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className={styles.buttonGroup}>
            <button onClick={() => toggleSetting('bordered')}>
                {settings.bordered ? 'Hide Border' : 'Show Border'}
            </button>
            <button onClick={() => toggleSetting('imagesMode')}>
                {settings.imagesMode ? 'Show Images' : 'Hide Images'}
            </button>
            <button onClick={() => toggleSetting('mode')}>
                {settings.mode ? 'Responsive' : 'Full'}
            </button>
        </div>
    );
};
