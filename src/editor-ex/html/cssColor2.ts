import { languageNames } from '../constants';
import { fromRange, getCssService, toRange } from '../css/utils';
import type { editor, languages } from '../monaco';
import { htmlRegionCache } from './htmlRegionCache';
import { monaco } from '../monaco';
import { getCSSLanguageService, newCSSDataProvider, TextDocument } from 'vscode-css-languageservice';
import { customCssData, monaco as monaco2 } from '../../constants';



const customDataProvider = newCSSDataProvider(customCssData);
const cssService = getCSSLanguageService();
cssService.setDataProviders(true, [customDataProvider]);
const cssId = monaco2.languages.css.cssDefaults.languageId
const cssLanguageService = cssService

class CssDocumentColorAdapter implements languages.DocumentColorProvider {
    async provideDocumentColors(
        model: editor.IReadOnlyModel,

    ): Promise<languages.IColorInformation[] | undefined> {
        const regions = htmlRegionCache.get(model);
        const cssDocument = regions.getEmbeddedDocument(languageNames.css);
        const cssService = getCssService();
        const style = cssService.parseStylesheet(cssDocument);
        const infos = cssService.findDocumentColors(cssDocument, style);
        if (!infos) return;

        return infos.map((item) => ({
            color: item.color,
            range: toRange(item.range)!,
        }));
    }

    async provideColorPresentations(
        model: editor.IReadOnlyModel,
        info: languages.IColorInformation,

    ): Promise<languages.IColorPresentation[] | undefined> {
        const htmlContent = model.getValue();

        // Регулярное выражение для поиска атрибута style с содержимым в двойных кавычках
        const regex = /style\s*=\s*("([^"]*)"|'([^']*)')/gi;
        let match;



        while ((match = regex.exec(htmlContent)) !== null) {
            const cssCode = match[2] || match[3];

            // Определяем смещение начала CSS-кода внутри модели:
            const fullMatch = match[0];
            const cssStartOffset = match.index + fullMatch.indexOf(cssCode);

            // Создаем "виртуальный" документ для CSS, который отображает диапазон внутри HTML

            const virtualCSSDocument: TextDocument = {
                version: 1,
                lineCount: 1,
                languageId: cssId,
                getText: () => cssCode,
                uri: model.uri.toString(),
                positionAt: (offset) => { return { line: model.getPositionAt(cssStartOffset + offset).lineNumber, character: model.getPositionAt(cssStartOffset + offset).column, } },
                offsetAt: (position) => model.getOffsetAt({ lineNumber: position.line, column: position.character }) - cssStartOffset,
            };

            // Парсим CSS (небольшая оптимизация: можно кэшировать, если требуется)
            const stylesheet = cssLanguageService.parseStylesheet(virtualCSSDocument);


            const presentations = cssService.getColorPresentations(
                virtualCSSDocument,
                stylesheet,
                info.color,
                fromRange(info.range)!,
            );
            if (!presentations) return;
        }
    }

}

export function CssColorInHtml2() {
    monaco.languages.registerColorProvider(languageNames.html, new CssDocumentColorAdapter());
}
