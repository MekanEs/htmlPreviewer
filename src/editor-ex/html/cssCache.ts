import { Stylesheet } from 'vscode-css-languageservice';

import { languageNames } from '../../constants';
import { Cache } from '../cache';
import { getCssService } from '../css/utils';
import { editor } from '../monaco';

import { htmlRegionCache } from './htmlRegionCache';

export class StylesheetCache extends Cache<Stylesheet> {
  _getCache(model: editor.ITextModel) {
    const regions = htmlRegionCache.get(model);
    const cssDocument = regions.getEmbeddedDocument(languageNames.css);
    const cssService = getCssService();
    return cssService.parseStylesheet(cssDocument);
  }
}

export const stylesheetCache = new StylesheetCache('HtmlStylesheet');
