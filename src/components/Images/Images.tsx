import { FC } from 'react';
import { findImages } from '../../constants';
import {  useAppSelector } from '../../store/store';





export const Images: FC = () => {
    const source = useAppSelector(state=>state.htmlReducer.source)
    const src = [...new Set(source.match(findImages.regexp)?.map(el=>el.replace('src="','').replaceAll('"','')))].filter(el=>!el.startsWith('https://maxclientstatapi'))
    const content = [...new Set(source.match(/itemprop="image"\s+content="([^"]+)/g)?.map((el:string)=>el.replace('itemprop="image" content=','').replaceAll('"','')))]
    const images = [...src,...content]

  return (
    <div style={{height:'100%',overflowY:'scroll',}}>
        <ul style={{width:"90%"}}>
        {images?.map(el=><li key={el} style={{marginTop:"10px",border:'1px solid white'}}>
            <div><a href={el}>{el}</a></div>
         
            <img style={{maxWidth:'70%'}} src={el} alt="tech" />
        </li>)}
        </ul>
    </div>
  );
};
