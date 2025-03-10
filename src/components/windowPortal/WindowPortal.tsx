import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface WindowPortalProps {
  className?: string;
  children: ReactNode;
}

export const WindowPortal: FC<WindowPortalProps> = ({ children }) => {
  const containerEl = document.createElement('div');
  containerEl.style.height = '400px';
  containerEl.style.padding = '20px';
  containerEl.style.margin = '0 auto';
  let externalWindow: Window | null = null;
  useEffect(() => {
    externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');

    if (externalWindow) externalWindow.document.body.appendChild(containerEl);
    return () => {
      if (externalWindow) externalWindow.close();
    };
  });
  return createPortal(children, containerEl);
};
