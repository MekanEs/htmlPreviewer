import { EditorSelection } from '../types/types';
import { toggleFrameBorder, toggleImages } from './toggleFrameBorder';

export function loadHandler(
  frame: HTMLIFrameElement,
  setSelection: (selection: EditorSelection) => void,
  bordered: boolean,
  imagesMode: boolean,
) {
  if (frame.contentDocument) {
    frame.contentDocument.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const el = e.target as HTMLElement;
      const from = Number(el.dataset.startIndex) || 0;
      const to = Number(el.dataset.endIndex) || 0;
      setSelection({ from, to });
    });

    toggleFrameBorder(bordered, frame);
    toggleImages(imagesMode, frame);
  }
}
