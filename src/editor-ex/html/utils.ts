import type ts from 'typescript';
import {
  getLanguageService,
  Position as HtmlPosition,
  TextDocument,
  Range as HtmlRange,
  TextEdit,
} from 'vscode-html-languageservice';

import type { editor, Position, IRange, languages, Uri } from '../monaco';
import { monaco } from '../monaco';

export function getHtmlService() {
  return getLanguageService();
}

export function toLsPosition(position: Position): HtmlPosition {
  return {
    character: position.column - 1,
    line: position.lineNumber - 1,
  };
}

export function toLsRange(range: IRange): HtmlRange {
  return HtmlRange.create(
    range.startLineNumber - 1,
    range.startColumn - 1,
    range.endLineNumber - 1,
    range.endColumn - 1
  );
}

export function toRange(range: HtmlRange): IRange {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1,
  };
}

export function toTextEdit(textEdit: TextEdit): languages.TextEdit {
  return {
    range: toRange(textEdit.range),
    text: textEdit.newText,
  };
}

export function modelToDocument(model: editor.IModel) {
  return TextDocument.create(
    model.uri.toString(),
    model.getLanguageId(),
    model.getVersionId(),
    model.getValue()
  );
}

export function getEmbeddedJavascriptUri(value: editor.IModel | Uri) {
  if ('uri' in value) {
    value = value.uri;
  }
  return monaco.Uri.parse(value.toString() + '.ts');
}

export function textSpanToRange(model: editor.ITextModel, span: ts.TextSpan): IRange {
  const p1 = model.getPositionAt(span.start);
  const p2 = model.getPositionAt(span.start + span.length);
  const { lineNumber: startLineNumber, column: startColumn } = p1;
  const { lineNumber: endLineNumber, column: endColumn } = p2;
  return { startLineNumber, startColumn, endLineNumber, endColumn };
}

export function tagToString(tag: ts.JSDocTagInfo): string {
  let tagLabel = `*@${tag.name}*`;
  if (tag.name === 'param' && tag.text) {
    ``;
    const [paramName, ...rest] = tag.text;
    tagLabel += `\`${paramName.text}\``;
    if (rest.length > 0) tagLabel += ` — ${rest.map(r => r.text).join(' ')}`;
  } else if (Array.isArray(tag.text)) {
    tagLabel += ` — ${tag.text.map(r => r.text).join(' ')}`;
  } else if (tag.text) {
    tagLabel += ` — ${tag.text}`;
  }
  return tagLabel;
}

export class Kind {
  public static unknown = '';
  public static keyword = 'keyword';
  public static script = 'script';
  public static module = 'module';
  public static class = 'class';
  public static interface = 'interface';
  public static type = 'type';
  public static enum = 'enum';
  public static variable = 'var';
  public static localVariable = 'local var';
  public static function = 'function';
  public static localFunction = 'local function';
  public static memberFunction = 'method';
  public static memberGetAccessor = 'getter';
  public static memberSetAccessor = 'setter';
  public static memberVariable = 'property';
  public static constructorImplementation = 'constructor';
  public static callSignature = 'call';
  public static indexSignature = 'index';
  public static constructSignature = 'construct';
  public static parameter = 'parameter';
  public static typeParameter = 'type parameter';
  public static primitiveType = 'primitive type';
  public static label = 'label';
  public static alias = 'alias';
  public static const = 'const';
  public static let = 'let';
  public static warning = 'warning';
}
