import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { monaco } from '../../constants';
import { MonacoEx } from '../../editor-ex';

import styles from './Layout.module.scss';

export const Layout: FC = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'Вы обновляете страницу, прогресс не сохранён!';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  MonacoEx(monaco);
  return (
    <div className={classNames(styles.Layout)}>
      <Outlet />
    </div>
  );
};
