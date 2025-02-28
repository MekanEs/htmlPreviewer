import { FC, ReactNode,  } from "react";
import { FrameSettings, SetSettingType } from "./Frame";
import styles from './Frame.module.scss';
import classNames from "classnames";
import { Button } from '../common/Button';

interface FrameControlsProps {
    settings: FrameSettings;
    setSettings: SetSettingType;
    children: ReactNode;
}

export const FrameControls: FC<FrameControlsProps> = ({ settings, setSettings, children }) => {
    const toggleSetting = (key: keyof FrameSettings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className={styles.buttonGroup}>
            <Button
                variant="secondary"
                onClick={() => toggleSetting('bordered')}
                className={classNames(styles.button, {
                    [styles.active]: settings.bordered
                })}
            >
                {settings.bordered ? 'Hide Border' : 'Show Border'}
            </Button>
            <Button
                variant="secondary"
                onClick={() => toggleSetting('imagesMode')}
                className={classNames(styles.button, {
                    [styles.active]: settings.imagesMode
                })}
            >
                {settings.imagesMode ? 'Show Images' : 'Hide Images'}
            </Button>
            <Button
                variant="primary"
                onClick={() => toggleSetting('mode')}
                className={styles.button}
            >
                {settings.mode ? 'Responsive' : 'Full'}
            </Button>
            {children}
        </div>
    );
};
