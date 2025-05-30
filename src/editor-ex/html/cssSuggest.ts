import { InsertTextFormat } from 'vscode-css-languageservice';

import { languageNames } from '../constants';
import { getCssService, toCommand, toCompletionItemKind, toRange, toTextEdit } from '../css/utils';
import { Position, Uri, editor, languages } from '../monaco';
import { monaco } from '../monaco';
import { getWordRange } from '../utils';

import { stylesheetCache } from './cssCache';
import { htmlRegionCache } from './htmlRegionCache';
import { toLsPosition } from './utils';
class CssSuggestAdapter implements languages.CompletionItemProvider {
  triggerCharacters = ['/', '-', ':'];
  async provideCompletionItems(
    model: editor.ITextModel,
    position: Position
  ): Promise<languages.CompletionList | undefined> {
    const regions = htmlRegionCache.get(model);
    if (regions.getLanguageAtPosition(position) != languageNames.css) return;
    const wordRange = getWordRange(model, position);

    const cssDocument = regions.getEmbeddedDocument(languageNames.css);
    if (!cssDocument) return;
    const cssService = getCssService();
    const style = stylesheetCache.get(model);
    const info = cssService.doComplete(cssDocument, toLsPosition(position), style);

    if (!info || model.isDisposed()) return;

    const items: languages.CompletionItem[] = info.items.map(entry => {
      const item: languages.CompletionItem & { uri: Uri; position: Position } = {
        uri: model.uri,
        position: position,
        label: entry.label,
        insertText: entry.insertText ?? entry.label,
        sortText: entry.sortText,
        filterText: entry.filterText,
        documentation: entry.documentation,
        detail: entry.detail,
        command: toCommand(entry.command),
        range: wordRange,
        kind: toCompletionItemKind(entry.kind),
      };

      if (entry.textEdit) {
        if ('range' in entry.textEdit) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item.range as any) = toRange(entry.textEdit.range);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item.range as any) = {
            insert: toRange(entry.textEdit.insert),
            replace: toRange(entry.textEdit.replace),
          };
        }
        item.insertText = entry.textEdit.newText;
      }

      if (entry.additionalTextEdits) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        const newValue = entry.additionalTextEdits.map<languages.TextEdit>(toTextEdit as any);
        if (newValue.every(el => el !== undefined)) item.additionalTextEdits = newValue;
      }

      if (entry.insertTextFormat === InsertTextFormat.Snippet) {
        item.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      }

      return item;
    });
    return {
      incomplete: info.isIncomplete,
      suggestions: items,
    };
  }
}

export function CssSuggestInHtml() {
  monaco.languages.registerCompletionItemProvider(languageNames.html, new CssSuggestAdapter());
}
