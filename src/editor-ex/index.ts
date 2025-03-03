import { Monaco } from '@monaco-editor/react';

import {
  CssHighlightInHtml,
  CssSuggestInHtml,
  CssHoverInHtml,
  CssSymbolInHtml,
  CssColorInHtml,
  CssFoldingRangeInHtml,
} from './html';
import { CssClassSuggestInHtml } from './html/classSuggest';
import { tryInitMonaco } from './monaco';

export function MonacoEx(monacoInstance: Monaco) {
  if (!tryInitMonaco(monacoInstance)) return;
  CssSuggestInHtml();
  CssHighlightInHtml();
  CssHoverInHtml();
  CssSymbolInHtml();
  CssColorInHtml();
  CssFoldingRangeInHtml();
  CssClassSuggestInHtml();
}
