import type { editor } from '../monaco';
import { languageNames } from '../constants';
import { getHtmlService, modelToDocument, toLsPosition } from './utils';
import { monaco } from '../monaco';
export function AutoCloseTag() {
  monaco.editor.onDidCreateEditor((ed: editor.ICodeEditor) => {
    ed.onDidChangeModelContent((e) => {
      const model = ed.getModel();
      if (model?.getLanguageId() != languageNames.html) return;
      if (e.isRedoing || e.isUndoing || e.changes.length != 1) return;
      if (model?.uri.query.indexOf('disable_auto_close_tag') > -1) return;

      const change = e.changes[0];
      if (change.text == '>') {
        const document = modelToDocument(model);
        const position = new monaco.Position(
          change.range.endLineNumber,
          change.range.endColumn + 1,
        );
        const htmlService = getHtmlService();
        const close = htmlService.doTagComplete(
          document,
          toLsPosition(position),
          htmlService.parseHTMLDocument(document),
        );
        if (!close?.startsWith('$0')) return;

        ed.executeEdits(
          null,
          [
            {
              text: close.substring(2)!,
              range: new monaco.Range(
                change.range.endLineNumber,
                change.range.endColumn + 1,
                change.range.endLineNumber,
                change.range.endColumn + 1,
              ),
            },
          ],
          [
            new monaco.Selection(
              change.range.endLineNumber,
              change.range.endColumn + 1,
              change.range.endLineNumber,
              change.range.endColumn + 1,
            ),
          ],
        );
      }
    });
  });
}
