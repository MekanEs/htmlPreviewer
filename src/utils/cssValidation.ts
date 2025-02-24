import { Diagnostic, getCSSLanguageService, newCSSDataProvider, } from 'vscode-css-languageservice';
import { customCssData, editor, } from '../constants';
import { htmlRegionCache } from '../editor-ex/html/htmlRegionCache';
import { languageNames } from '../editor-ex/constants';
import { diagnosticToMarkerSeverity } from '../types/typeTransform';



export const diagnosticsPusher = (diagnostics: Diagnostic[], arrayToPush: editor.IMarkerData[], hasPlus?: boolean) => {
  diagnostics.forEach(diag => {
    // Диагностика возвращает диапазон относительно виртуального документа.
    // Преобразуем его в позиции в исходном HTML.
    arrayToPush.push({
      severity: diagnosticToMarkerSeverity[diag.severity || 1],
      message: diag.message,
      startLineNumber: hasPlus ? diag.range.start.line + 1 : diag.range.start.line,
      startColumn: diag.range.start.character + 1,
      endLineNumber: diag.range.end.line,
      endColumn: diag.range.end.character + 1,
    });
  });
}



const customDataProvider = newCSSDataProvider(customCssData);
const cssService = getCSSLanguageService();
cssService.setDataProviders(true, [customDataProvider]);
const cssLanguageService = cssService

export function validateCSSInStyleAttributes(model: editor.ITextModel) {
  const markers: editor.IMarkerData[] = [];

  // Регулярное выражение для поиска атрибута style с содержимым в двойных кавычках

  const regions = htmlRegionCache.get(model);
  const cssDocument = regions.getEmbeddedDocument(languageNames.css);
  const styleSheet1 = cssLanguageService.parseStylesheet(cssDocument);
  const diagnostics1 = cssLanguageService.doValidation(cssDocument, styleSheet1,);
  diagnosticsPusher(diagnostics1, markers, true)

  // while ((match = regex.exec(htmlContent)) !== null) {
  //   const cssCode = match[2] || match[3];

  //   // Определяем смещение начала CSS-кода внутри модели:
  //   const fullMatch = match[0];
  //   const cssStartOffset = match.index + fullMatch.indexOf(cssCode);
  //   const wrapperPrefix = 'x { ';
  //   const wrappedCssCode = `${wrapperPrefix}${cssCode} }`;
  //   // Создаем "виртуальный" документ для CSS, который отображает диапазон внутри HTML

  //   const virtualCSSDocument: TextDocument = {
  //     version: 1,
  //     lineCount: 1,
  //     languageId: cssId,
  //     getText: () => wrappedCssCode,
  //     uri: model.uri.toString(),
  //     positionAt: (offset) => { return { line: model.getPositionAt(cssStartOffset + offset).lineNumber, character: model.getPositionAt(cssStartOffset + offset).column, } },
  //     offsetAt: (position) => model.getOffsetAt({ lineNumber: position.line, column: position.character }) - cssStartOffset,
  //   };

  //   // Парсим CSS (небольшая оптимизация: можно кэшировать, если требуется)
  //   const stylesheet = cssLanguageService.parseStylesheet(virtualCSSDocument);

  //   // Получаем диагностику для CSS-кода
  //   //{lint:{unknownProperties:'error'}}
  //   const diagnostics = cssLanguageService.doValidation(virtualCSSDocument, stylesheet,);
  //   if (diagnostics.length) {
  //     console.log(diagnostics, markers)

  //   }
  //   // diagnosticsPusher(diagnostics, markers)
  // }

  // Устанавливаем маркеры в редакторе
  editor.setModelMarkers(model, 'css', markers);
}