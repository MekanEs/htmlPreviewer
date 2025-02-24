import { FC, useState } from 'react';
import classNames from 'classnames';
import styles from './List.module.scss';
import { IRange } from '../../constants';
import { useAppSelector } from '../../store/store';
import { reportTypeSeverityToMarker } from '../../types/typeTransform';
import { useFindClasses } from '../../hooks/classFinder';

interface HintListProps {
    className?: string;
    revealLine: (range: IRange) => void;
    source: string;
}

export const HintList: FC<HintListProps> = ({ revealLine, source }) => {

    const markers = useAppSelector((state) => state.htmlReducer.markers)
    const undClasses = useFindClasses(source);
    const owners = ['hmtl', 'css', 'custom']
    const [activeOwner, setActiveOwner] = useState<string>(owners[0] || 'html');
    return (
        <div className={classNames(styles.List)}>
            <div style={{ marginBottom: '10px' }}>
                {undClasses.map((el, i) => {
                    return (
                        <div
                            key={i}
                            title='copyable'
                            onClick={() => {
                                navigator.clipboard.writeText('.' + el);
                            }}
                            className={classNames(styles.item)}
                        >
                            <span className={styles.error}>{el}</span> class is undefined
                        </div>
                    );
                })}
            </div>
            <div className={classNames(styles.List, styles.tabs)}>
                {owners.map(owner => (
                    <button
                        key={owner}
                        className={classNames(styles.tab, { [styles.active]: owner === activeOwner })}
                        onClick={() => setActiveOwner(owner)}
                    >
                        {owner}:{markers[owner]?.length || 0}
                    </button>
                ))}
            </div>
            <ul className={styles.content}>
                {markers[activeOwner]?.map((marker, index) => {
                    const range = {
                        startLineNumber: marker.startLineNumber,
                        startColumn: marker.startColumn,
                        endLineNumber: marker.endLineNumber,
                        endColumn: marker.endColumn,
                    };
                    return (
                        <li
                            key={index}
                            onDoubleClick={() => revealLine(range)}
                            className={classNames(styles.item, styles[reportTypeSeverityToMarker[marker.severity]])}
                        >
                            {marker.message} (Line: {marker.startLineNumber})
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
