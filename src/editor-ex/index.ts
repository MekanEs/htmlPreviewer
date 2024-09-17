import { Monaco } from '@monaco-editor/react';
import {
  AutoCloseTag,
  CssSuggestInHtml,
  CssFoldingRangeInHtml,
  CssHighlightInHtml,
  CssSymbolInHtml,
} from './html';
import { tryInitMonaco } from './monaco';

export function MonacoEx(monacoInstance: Monaco) {
  if (!tryInitMonaco(monacoInstance)) return;
  CssSymbolInHtml();
  CssSuggestInHtml();
  CssFoldingRangeInHtml();
  CssHighlightInHtml();
  AutoCloseTag();
}
