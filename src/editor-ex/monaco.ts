import { Monaco } from '@monaco-editor/react';
export type {
  IDisposable,
  IPosition,
  CancellationToken,
  editor,
  IEvent,
  IMarkdownString,
  IRange,
  languages,
  Position,
  Range,
  Uri,
} from 'monaco-editor/esm/vs/editor/editor.api';

export let monaco: Monaco;

export function tryInitMonaco(monacoInstance: Monaco) {
  if (monaco) return false;
  monaco = monacoInstance;
  return true;
}
