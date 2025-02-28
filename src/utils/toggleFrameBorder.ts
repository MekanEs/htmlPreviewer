import { borderStyle } from '../constants';

export function toggleFrameBorder(bordered: boolean, frame: HTMLIFrameElement) {
  const doc = frame.contentDocument;
  if (!doc) return;

  let style = doc.querySelector<HTMLStyleElement>('#style123');

  if (bordered) {
    if (!style) {
      style = document.createElement('style');
      style.id = 'style123';
      doc.head?.prepend(style);
    }
    if (style.textContent !== borderStyle) {
      style.textContent = borderStyle;
    }
  } else {
    style?.remove();
  }
}

export function toggleImages(imgMode: boolean, frame: HTMLIFrameElement) {
  const doc = frame.contentDocument;
  if (!doc) return;

  doc.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    const hasMarker = img.src.endsWith('1#');

    if (imgMode && !hasMarker) {
      img.src += '1#';
    } else if (!imgMode && hasMarker) {
      img.src = img.src.slice(0, -2);
    }
  });
}

