import { getCSSLanguageService, newCSSDataProvider, TextDocument, } from 'vscode-css-languageservice';
import { customCssData, editor, monaco } from '../constants';
import { htmlRegionCache } from '../editor-ex/html/htmlRegionCache';
import { languageNames } from '../editor-ex/constants';
import { diagnosticsPusher } from './cssValidation';







const customDataProvider = newCSSDataProvider(customCssData);
const cssService = getCSSLanguageService();
cssService.setDataProviders(true, [customDataProvider]);
const cssId = monaco.languages.css.cssDefaults.languageId
const cssLanguageService = cssService

export function validateCSS(model: editor.ITextModel) {
  const htmlContent = model.getValue();
  const markers: editor.IMarkerData[] = [];

  // Регулярное выражение для поиска атрибута style с содержимым в двойных кавычках
  const regex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

  let match;
  const regions = htmlRegionCache.get(model);
  const cssDocument = regions.getEmbeddedDocument(languageNames.css);
  const styleSheet1 = cssLanguageService.parseStylesheet(cssDocument);
  const diagnostics1 = cssLanguageService.doValidation(cssDocument, styleSheet1,);
  diagnosticsPusher(diagnostics1, markers, true)

  while ((match = regex.exec(htmlContent)) !== null) {
    const cssCode = match[1]
    // Определяем смещение начала CSS-кода внутри модели:
    const fullMatch = match[0];
    const cssStartOffset = match.index + fullMatch.indexOf(cssCode);

    // Создаем "виртуальный" документ для CSS, который отображает диапазон внутри HTML

    const virtualCSSDocument: TextDocument = {
      version: 1,
      lineCount: 2,
      languageId: cssId,
      getText: () => cssCode,
      uri: model.uri.toString(),
      positionAt: (offset) => { return { line: model.getPositionAt(cssStartOffset + offset).lineNumber, character: model.getPositionAt(cssStartOffset + offset).column, } },
      offsetAt: (position) => model.getOffsetAt({ lineNumber: position.line, column: position.character }) - cssStartOffset,
    };

    // Парсим CSS (небольшая оптимизация: можно кэшировать, если требуется)
    const stylesheet = cssLanguageService.parseStylesheet(virtualCSSDocument);

    // Получаем диагностику для CSS-кода
    //{lint:{unknownProperties:'error'}}
    const diagnostics = cssLanguageService.doValidation(virtualCSSDocument, stylesheet,);

    diagnosticsPusher(diagnostics, markers)
  }
  console.log(markers)
  // Устанавливаем маркеры в редакторе
  editor.setModelMarkers(model, 'css', markers);
}