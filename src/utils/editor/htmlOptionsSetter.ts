import { Monaco } from '@monaco-editor/react';

export const HTMLOptionsSetter = (monaco: Monaco) => {
  // Настройка форматирования HTML
  monaco.languages.html.htmlDefaults.setOptions({
    format: {
      contentUnformatted: 'pre,code,textarea,style',
      endWithNewline: false,
      extraLiners: ' /html',
      indentHandlebars: false,
      indentInnerHtml: false,
      insertSpaces: false,
      maxPreserveNewLines: undefined,
      preserveNewLines: true,
      tabSize: 4,
      unformatted: 'pre,code,textarea,style,font',
      wrapAttributes: 'auto',
      wrapLineLength: 10000,
    },
  });
};
