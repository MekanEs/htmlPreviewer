import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { regExpsToFind } from '../../constants';
import { htmlActions } from '../../store/sourceHtml/sourceHtml';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { FindInText } from '../../utils';

import styles from './Layout.module.scss';

export const Layout: FC = () => {
  const { source } = useAppSelector(state => state.htmlReducer);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    //find languages used in html
    const langsMatches = FindInText(source, regExpsToFind.langs);
    const langsMatches2 = FindInText(source, regExpsToFind.langs2);
    const langs = Object.keys(langsMatches).map(el => el.split('=')[1]);
    const langs2 = Object.keys(langsMatches2).map(el => el.split('%3D')[1]);
    const newLangs = Array.from(new Set(langs.concat(langs2)));
    dispatch(htmlActions.setLangs(newLangs));
  }, [source, dispatch]);
  return (
    <div className={classNames(styles.Layout)}>
      <Outlet />
    </div>
  );
};
