import { FC } from 'react';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
  return (
    <div className={classNames(styles.Layout)}>
      <Outlet />
    </div>
  );
};
