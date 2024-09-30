import { EditorSelection } from '../types/types';
import { toggleFrameBorder, toggleImages } from './toggleFrameBorder';

export function loadHandler(
  frame: HTMLIFrameElement,
  setSelection: (selection: EditorSelection) => void,
  bordered: boolean,
  imagesMode: boolean,
) {
  if (!frame.contentDocument) return;
   frame.contentDocument.addEventListener('click', (event: Event) => {
      event.preventDefault();
      const {dataset} = event.target as HTMLElement;
      const from = Number(dataset.startIndex) || 0;
      const to = Number(dataset.endIndex) || 0;
      setSelection({ from, to });
    });

    toggleFrameBorder(bordered, frame);
    toggleImages(imagesMode, frame);
}
