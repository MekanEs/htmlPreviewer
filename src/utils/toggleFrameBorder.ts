import { borderStyle } from '../constants';

export function toggleFrameBorder(bordered: boolean, frame: HTMLIFrameElement) {
  if (frame.contentDocument) {
    if (bordered) {
      let style = frame.contentDocument.querySelector('#style123');
      if (style === null) {
        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.setAttribute('id', 'style123');
      }

      style.innerHTML = borderStyle;
      frame.contentDocument.querySelector('head')?.prepend(style);
    } else {
      const style = frame.contentDocument.querySelector('#style123');
      if (style) {
        style.innerHTML = '';
      }
    }
  }
}
