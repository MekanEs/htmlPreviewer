import { FC } from 'react';
import { findImages } from '../../constants';
import { useAppSelector } from '../../store/store';
import styles from './Images.module.scss'




export const Images: FC = () => {
  const source = useAppSelector(state => state.htmlReducer.source)
  const src = [...new Set(source.match(findImages.regexp)?.map(el => el.replace('src="', '').replaceAll('"', '')))].filter(el => !el.startsWith('https://maxclientstatapi'))
  const content = [...new Set(source.match(/itemprop="image"\s+content="([^"]+)/g)?.map((el: string) => el.replace('itemprop="image" content=', '').replaceAll('"', '')))]
  const images = [...src, ...content]

  return (
    <div className={styles.ImagesContainer}>
      <ul >
        {images?.map(el =>
          <li key={el} onClick={() => navigator.clipboard.writeText(el)}>
            <span className={styles.url}  >{el}</span>

            <img className={styles.img} src={el} alt="tech" />
          </li>)}
      </ul>
    </div>
  );
};
