import { FC, useEffect } from 'react';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { MonacoEx } from '../../editor-ex';
import { monaco } from '../../constants';
interface LayoutProps { }

export const Layout: FC<LayoutProps> = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Вы обновляете страницу, прогресс не сохранён!";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  MonacoEx(monaco);
  return (
    <div className={classNames(styles.Layout)}>
      <Outlet />
    </div>
  );
};
