import { languageNames } from '../constants';
import { getCssService, toMarkedStringArray, toRange } from '../css/utils';
import type { CancellationToken, Position, editor, languages } from '../monaco';
import { monaco } from '../monaco';

import { htmlRegionCache } from './htmlRegionCache';
import { toLsPosition } from './utils';

class CssHoverAdapter implements languages.HoverProvider {
  async provideHover(
    model: editor.IReadOnlyModel,
    position: Position,
    _token: CancellationToken
  ): Promise<languages.Hover | undefined> {
    const regions = htmlRegionCache.get(model);
    if (regions.getLanguageAtPosition(position) != languageNames.css) return;
    const cssDocument = regions.getEmbeddedDocument(languageNames.css);
    const cssService = getCssService();
    const style = cssService.parseStylesheet(cssDocument);
    const info = cssService.doHover(cssDocument, toLsPosition(position), style);
    if (!info) return;
    return {
      range: toRange(info.range),
      contents: toMarkedStringArray(info.contents),
    } as languages.Hover;
  }
}

export function CssHoverInHtml() {
  monaco.languages.registerHoverProvider(languageNames.html, new CssHoverAdapter());
}
