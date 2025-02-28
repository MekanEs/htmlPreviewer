import classNames from 'classnames';
import React, { FC } from 'react';

import styles from './TabContainer.module.scss';

export interface Tab {
  key: string;
  label: string | React.ReactNode;
}

interface TabContainerProps {
  tabs: Tab[];
  activeTab: string;
  callBack: (key: string) => void;
  className?: string;
}

export const TabContainer: FC<TabContainerProps> = ({ tabs, activeTab, callBack, className }) => {
  return (
    <div className={classNames(styles.tabContainer, className)}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={classNames(styles.tab, {
            [styles.active]: tab.key === activeTab,
          })}
          onClick={() => callBack(tab.key)}
        >
          {tab.label}
        </button>
      ))}
      <div
        className={styles.tabIndicator}
        style={{
          width: `${100 / tabs.length}%`,
          transform: `translateX(${tabs.findIndex(t => t.key === activeTab) * 100}%)`,
        }}
      />
    </div>
  );
};
