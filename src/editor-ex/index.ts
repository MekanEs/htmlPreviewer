import { Monaco } from '@monaco-editor/react';
import {
  CssSuggestInHtml,
} from './html';
import { tryInitMonaco } from './monaco';

export function MonacoEx(monacoInstance: Monaco) {
  if (!tryInitMonaco(monacoInstance)) return;

  CssSuggestInHtml();

}
