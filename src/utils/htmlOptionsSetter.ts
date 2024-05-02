import { Monaco } from '@monaco-editor/react';

export const HTMLOptionsSetter = (monaco: Monaco) => {
  monaco.languages.html.htmlDefaults.setOptions({
    format: {
      contentUnformatted: 'pre,code,textarea,style',
      endWithNewline: false,
      extraLiners: 'head, body, /html',
      indentHandlebars: false,
      indentInnerHtml: false,
      insertSpaces: false,
      maxPreserveNewLines: undefined,
      preserveNewLines: false,
      tabSize: 4,
      unformatted: 'pre,code,textarea,style',
      wrapAttributes: 'auto',
      wrapLineLength: 10000,
    },
  });
};
