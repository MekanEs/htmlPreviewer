import { FC, useMemo } from 'react';

import { findImages } from '../../constants';
import { useAppSelector } from '../../store/store';

import styles from './Images.module.scss';

export const Images: FC = () => {
  const source = useAppSelector(state => state.htmlReducer.source);

  const images = useMemo(() => {
    const srcMatches =
      source.match(findImages.regexp)?.map(el => el.replace('src="', '').replaceAll('"', '')) ?? [];
    const contentMatches =
      source
        .match(/itemprop="image"\s+content="([^"]+)/g)
        ?.map((el: string) => el.replace('itemprop="image" content=', '').replaceAll('"', '')) ??
      [];

    const uniqueImages = new Set(
      srcMatches.concat(contentMatches).filter(el => !el.startsWith('https://maxclientstatapi'))
    );
    return Array.from(uniqueImages);
  }, [source]); // Зависимость только от source

  return (
    <div className={styles.ImagesContainer}>
      <ul>
        {images?.map(el => (
          <li
            key={el}
            onClick={() => {
              void navigator.clipboard.writeText(el);
            }}
          >
            <span className={styles.url}>{el}</span>

            <img className={styles.img} src={el} alt="tech" />
          </li>
        ))}
      </ul>
    </div>
  );
};
