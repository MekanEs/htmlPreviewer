import { languageNames } from '../constants';
import { getCssService, toFoldingRangeKind } from '../css/utils';
import type { IEvent, editor, languages } from '../monaco';
import { monaco } from '../monaco';

import { htmlRegionCache } from './htmlRegionCache';

class CssFoldingRangeAdapter implements languages.FoldingRangeProvider {
  onDidChange?: IEvent<this> | undefined;
  async provideFoldingRanges(
    model: editor.ITextModel
  ): Promise<languages.FoldingRange[] | undefined> {
    const regions = htmlRegionCache.get(model);
    const cssDocument = regions.getEmbeddedDocument(languageNames.css);
    const cssService = getCssService();
    const ranges = cssService.getFoldingRanges(cssDocument);
    return ranges.map(range => {
      const result: languages.FoldingRange = {
        start: range.startLine + 1,
        end: range.endLine + 1,
      };
      if (typeof range.kind !== 'undefined') {
        result.kind = toFoldingRangeKind(range.kind);
      }

      return result;
    });
  }
}

export function CssFoldingRangeInHtml() {
  monaco.languages.registerFoldingRangeProvider(languageNames.html, new CssFoldingRangeAdapter());
}
