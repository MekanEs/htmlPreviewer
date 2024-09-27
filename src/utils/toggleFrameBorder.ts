import { borderStyle } from '../constants';

export function toggleFrameBorder(bordered: boolean, {contentDocument}: HTMLIFrameElement) {
  if (contentDocument) {
    if (bordered) {
      let style = contentDocument.querySelector('#style123');
      if (style === null) {
        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.setAttribute('id', 'style123');
      }

      style.innerHTML = borderStyle;
      contentDocument.querySelector('head')?.prepend(style);
      return
    } 

    const style = contentDocument.querySelector('#style123');
    if (style) {
      style.innerHTML = '';
    }
    
  }
}

export function toggleImages(imgMode: boolean, {contentDocument}: HTMLIFrameElement) {
  if (!contentDocument) {return}
    if (imgMode) {
      const images = contentDocument.querySelectorAll('img');
      images.forEach(el=>{
        if(!el.src.endsWith("1#")){
        el.src +='1#'}
      })
     

    }else{
      const images = contentDocument.querySelectorAll('img');
      images.forEach(el=>{
        if(el.src.endsWith("1#")){
          el.src = el.src.slice(0,-2)
        }
      
      })
    }
  
}
