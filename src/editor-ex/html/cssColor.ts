import { languageNames } from '../constants';
import { fromRange, getCssService, toRange, toTextEdit } from '../css/utils';
import type { editor, languages } from '../monaco';
import { monaco } from '../monaco';

import { htmlRegionCache } from './htmlRegionCache';

class CssDocumentColorAdapter implements languages.DocumentColorProvider {
  async provideDocumentColors(
    model: editor.IReadOnlyModel
  ): Promise<languages.IColorInformation[] | undefined> {
    const regions = htmlRegionCache.get(model);
    const cssDocument = regions.getEmbeddedDocument(languageNames.css);

    const cssService = getCssService();
    const style = cssService.parseStylesheet(cssDocument);
    const infos = cssService.findDocumentColors(cssDocument, style);
    if (!infos) return;

    return infos.map(item => ({
      color: item.color,
      range: toRange(item.range)!,
    }));
  }

  async provideColorPresentations(
    model: editor.IReadOnlyModel,
    info: languages.IColorInformation
  ): Promise<languages.IColorPresentation[] | undefined> {
    console.log('provideColorPresentations');
    const regions = htmlRegionCache.get(model);
    const cssDocument = regions.getEmbeddedDocument(languageNames.css);
    const cssService = getCssService();
    const style = cssService.parseStylesheet(cssDocument);
    const presentations = cssService.getColorPresentations(
      cssDocument,
      style,
      info.color,
      fromRange(info.range)!
    );
    if (!presentations) return;

    return presentations.map(presentation => {
      const item: languages.IColorPresentation = {
        label: presentation.label,
      };
      if (presentation.textEdit) {
        item.textEdit = toTextEdit(presentation.textEdit);
      }
      if (presentation.additionalTextEdits) {
        const newValue = presentation.additionalTextEdits.map(toTextEdit);
        if (newValue.every(el => el !== undefined)) {
          item.additionalTextEdits = newValue as languages.TextEdit[] | undefined;
        }
      }
      return item;
    });
  }
}

export function CssColorInHtml() {
  monaco.languages.registerColorProvider(languageNames.html, new CssDocumentColorAdapter());
}
