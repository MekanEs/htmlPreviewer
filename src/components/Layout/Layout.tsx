import { FC } from 'react';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { MonacoEx } from '../../editor-ex';
import * as monaco from 'monaco-editor';
interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
  MonacoEx(monaco);
  return (
    <div className={classNames(styles.Layout)}>
      <Outlet />
    </div>
  );
};
