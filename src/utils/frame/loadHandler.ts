import { EditorSelection } from '../../types/types';
import { toggleFrameBorder, toggleImages } from './toggleFrameBorder';

export function loadHandler(
  frame: HTMLIFrameElement,
  setSelection: (selection: EditorSelection) => void,
  bordered: boolean,
  imagesMode: boolean
) {
  const doc = frame.contentDocument;
  if (!doc) return;

  const handleClick = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const from = Number(target.dataset.startIndex) || 0;
    const to = Number(target.dataset.endIndex) || 0;
    setSelection({ from, to });
  };

  doc.removeEventListener('click', handleClick); // Убираем старый обработчик, если есть
  doc.addEventListener('click', handleClick);

  toggleFrameBorder(bordered, frame);
  toggleImages(imagesMode, frame);
}
