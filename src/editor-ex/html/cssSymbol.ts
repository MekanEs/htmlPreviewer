import { languageNames } from '../constants';
import { getCssService, toRange, toSymbolKind } from '../css/utils';
import { editor, languages } from '../monaco';
import { htmlRegionCache } from './htmlRegionCache';
import { monaco } from '../monaco';

class CssDocumentSymbolAdapter implements languages.DocumentSymbolProvider {
  async provideDocumentSymbols(
    model: editor.ITextModel,
  ): Promise<languages.DocumentSymbol[] | undefined> {
    const regions = htmlRegionCache.get(model);
    const cssDocument = regions.getEmbeddedDocument(languageNames.css);
    const cssService = getCssService();
    const style = cssService.parseStylesheet(cssDocument);
    const items = cssService.findDocumentSymbols(cssDocument, style);
    if (!items) return;

    return items.map<languages.DocumentSymbol>((item) => ({
      name: item.name,
      detail: '',
      containerName: item.containerName,
      kind: toSymbolKind(item.kind),
      range: toRange(item.location.range)!,
      selectionRange: toRange(item.location.range)!,
      tags: [],
    }));
  }
}

export function CssSymbolInHtml() {
  monaco.languages.registerDocumentSymbolProvider(
    languageNames.html,
    new CssDocumentSymbolAdapter(),
  );
}
