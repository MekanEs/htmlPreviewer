import {getCSSLanguageService,  newCSSDataProvider,  TextDocument, } from 'vscode-css-languageservice';
import { customCssData, editor, monaco } from '../constants';
import { htmlRegionCache } from '../editor-ex/html/htmlRegionCache';
import { languageNames } from '../editor-ex/constants';

export function getCssService() {
  return getCSSLanguageService();
}
const customDataProvider = newCSSDataProvider(customCssData);
const cssService = getCSSLanguageService();
cssService.setDataProviders(true, [customDataProvider]);
const cssId = monaco.languages.css.cssDefaults.languageId
const cssLanguageService = cssService

export function validateCSSInStyleAttributes(model:editor.ITextModel) {
  const htmlContent = model.getValue();
  const markers: editor.IMarkerData[] = [];

  // Регулярное выражение для поиска атрибута style с содержимым в двойных кавычках
  const regex = /style\s*=\s*("([^"]*)"|'([^']*)')/gi;
  let match;
  const regions = htmlRegionCache.get(model);
        const cssDocument = regions.getEmbeddedDocument(languageNames.css);
         const styleSheet1 =cssLanguageService.parseStylesheet(cssDocument);
         const diagnostics1 = cssLanguageService.doValidation(cssDocument, styleSheet1,);
         diagnostics1.forEach(diag => {
      // Диагностика возвращает диапазон относительно виртуального документа.
      // Преобразуем его в позиции в исходном HTML.
      console.log(diag)
      
   
      markers.push({
        severity: monaco.MarkerSeverity.Error, // можно мапить severity в зависимости от diag.severity
        message: diag.message,
        startLineNumber: diag.range.start.line+1,
        startColumn: diag.range.start.character,
        endLineNumber: diag.range.end.line,
        endColumn: diag.range.end.character,
      });
    });
  while ((match = regex.exec(htmlContent)) !== null) {
  const cssCode = match[2] || match[3];
   
    // Определяем смещение начала CSS-кода внутри модели:
    const fullMatch = match[0];
    const cssStartOffset = match.index + fullMatch.indexOf(cssCode);
 const wrapperPrefix = 'x { ';
    const wrappedCssCode = `${wrapperPrefix}${cssCode} }`;
    // Создаем "виртуальный" документ для CSS, который отображает диапазон внутри HTML
    
    const virtualCSSDocument:TextDocument = {
        version:1,
        lineCount:1,
        languageId:cssId,
      getText: () => wrappedCssCode,
      uri: model.uri.toString(),
      positionAt: (offset) => { return {line:model.getPositionAt(cssStartOffset + offset).lineNumber, character:model.getPositionAt(cssStartOffset + offset).column,}},
      offsetAt: (position) => model.getOffsetAt({lineNumber:position.line,column:position.character}) - cssStartOffset,
    };

    // Парсим CSS (небольшая оптимизация: можно кэшировать, если требуется)
    const stylesheet = cssLanguageService.parseStylesheet(virtualCSSDocument);

    // Получаем диагностику для CSS-кода
    //{lint:{unknownProperties:'error'}}
    const diagnostics = cssLanguageService.doValidation(virtualCSSDocument, stylesheet,);

    diagnostics.forEach(diag => {
      // Диагностика возвращает диапазон относительно виртуального документа.
      // Преобразуем его в позиции в исходном HTML.
      console.log(diag)
      const startPos = {lineNumber:diag.range.start.line,column:diag.range.start.character};
      const endPos = {lineNumber:diag.range.end.line,column:diag.range.end.character- cssStartOffset};
   
      markers.push({
        severity: monaco.MarkerSeverity.Error, // можно мапить severity в зависимости от diag.severity
        message: diag.message,
        startLineNumber: startPos.lineNumber,
        startColumn: startPos.column,
        endLineNumber: endPos.lineNumber,
        endColumn: endPos.column,
      });
    });
  }

  // Устанавливаем маркеры в редакторе
  editor.setModelMarkers(model, 'css', markers);
}