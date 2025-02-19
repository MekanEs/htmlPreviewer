import { Monaco } from '@monaco-editor/react';
import {
  CssHighlightInHtml,
  CssSuggestInHtml,
  CssHoverInHtml,
  CssSymbolInHtml,
} from './html';
import { tryInitMonaco } from './monaco';

export function MonacoEx(monacoInstance: Monaco) {
  if (!tryInitMonaco(monacoInstance)) return;

  CssSuggestInHtml();
CssHighlightInHtml()
CssHoverInHtml()
CssSymbolInHtml()
}
