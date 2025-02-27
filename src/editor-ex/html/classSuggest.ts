import { languageNames } from '../constants';
import { Position, editor, languages } from '../monaco';
import { getWordRange } from '../utils';
import { monaco } from '../monaco';



export function parse(model: editor.ITextModel) {
  const selector =
    /([.#])(-?[_a-zA-Z\]+[\\!+_a-zA-Z0-9-]*)(?=[#.,()\s[\]^:*"'>=_a-zA-Z0-9-]*{[^}]*})/g;
  const styles: Style[] = [];
  const text = model.getValue()
  let match

  while ((match = selector.exec(text))) {
    const index = match.index;
    const position = model.getPositionAt(index);
    const line = position.lineNumber || 0;
    const col = position.column + 1 || 0;
    const style: Style = {
      index,
      line,
      col,
      type: match[1] as StyleType,
      selector: match[2].replaceAll("\\", ""),
    }
    styles.push(style);
  }
  return styles;
}
export const enum StyleType {
  ID = "#",
  CLASS = ".",
}

export interface Style {
  index: number;
  line: number;
  col: number;
  type: StyleType;
  selector: string;
}
class CssSuggestAdapter implements languages.CompletionItemProvider {
  private async getStyles(model: editor.ITextModel) {
    const styles = new Map<string, Style[]>();
    styles.set(model.uri.toString(), parse(model));
    return styles;
  }
  private async getCompletionMap(model: editor.ITextModel, type: StyleType, position: Position) {
    const map = new Map<string, languages.CompletionItem>();
    const styles = await this.getStyles(model);
    const wordRange = getWordRange(model, position);
    for (const value of styles.values()) {
      for (const style of value) {

        if (style.type === type) {
          const label = style.selector
          const item: languages.CompletionItem = {
            label: label,
            insertText: style.selector,
            range: wordRange,
            kind: 13,
          };
          map.set(style.selector, item);
        }
      }
    }
    return map;
  }
  private async getCompletionItems(
    model: editor.ITextModel,
    position: Position,
    type: StyleType
  ) {

    const map = await this.getCompletionMap(model, type, position);
    const items = [];
    for (const item of map.values()) {
      items.push(item);
    }
    return items;
  }
  private get canComplete() {
    // return /(id|class|className|[.#])\s*[=:]?\s*(["'])(?:.(?!\2))*$/is;
    return /(?:class=["'])([^"']+)(?:["'])/is
  }
  async provideCompletionItems(model: editor.ITextModel,
    position: Position,): Promise<languages.CompletionList | undefined> {
    // const range = new Range({0,0}, position);
    // const text = model.getValueInRange(range);
    const text = model.getValue()
    const match = this.canComplete.exec(text);
    console.log(match)
    if (!match) return
    const completionList = await this.getCompletionItems(
      model,
      position,
      match[1] === "id" ? StyleType.ID : StyleType.CLASS
    )
    console.log(completionList)
    return {
      suggestions: completionList
    }
  }
}

export function CssClassSuggestInHtml() {
  monaco.languages.registerCompletionItemProvider(languageNames.html, new CssSuggestAdapter());
}
