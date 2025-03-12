import { EditorSelection } from '../../types/types';

import { toggleFrameBorder, toggleImages } from './toggleFrameBorder';

export function loadHandler(
  frame: HTMLIFrameElement,
  setSelection: (selection: EditorSelection) => void,
  bordered: boolean,
  imagesMode: boolean,
  scrollY: React.MutableRefObject<number>
) {
  const doc = frame.contentDocument;
  if (!doc) return;
  console.log('scroll', scrollY);

  // const observeScroll = () => {
  //   console.log('now scrolled');
  //   if (frame.contentDocument) {
  //     scrollY.current = frame.contentDocument.scrollingElement?.scrollTop ?? 0;
  //   }
  // };
  // if (frame.contentDocument) {
  //   frame.contentDocument.addEventListener('scroll', observeScroll);
  // }
  // frame.contentDocument.scrollingElement?.scroll(0, scrollY.current);
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
